import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";

export default defineTool({
  name: "request_consultation",
  title: "Send a consultation request to Business Matching Global",
  description:
    "Create a contact request for Business Matching Global on behalf of a company. Only call it after the user has explicitly asked to be contacted and has provided a real email address. Returns a confirmation; BMG replies by email.",
  inputSchema: {
    email: z.string().email().describe("Email address BMG should reply to (required, provided by the user)."),
    contact_name: z.string().nullable().describe("Name of the person to contact."),
    company_name: z.string().nullable().describe("Company name."),
    country: z.string().nullable().describe("Country where the company is based."),
    sector: z.string().nullable().describe("Sector / products or services."),
    goal: z.string().nullable().describe("What the company wants to achieve."),
    service: z
      .string()
      .nullable()
      .describe("Service of interest, e.g. the one suggested by qualify_company."),
    message: z.string().nullable().describe("Free-text message or context for BMG."),
    language: z.enum(["it", "en", "pt", "es"]).nullable().describe("Preferred reply language."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async ({ email, contact_name, company_name, country, sector, goal, service, message, language }) => {
    const address = email.trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(address)) {
      throw new ToolError("A valid email address is required to send a consultation request.");
    }

    const supabase = supabaseAnon();
    const { error } = await supabase.from("consultation_requests").insert({
      email: address,
      contact_name: contact_name?.trim() || null,
      company_name: company_name?.trim() || null,
      country: country?.trim() || null,
      sector: sector?.trim() || null,
      goal: goal?.trim() || null,
      service: service?.trim() || null,
      message: message?.trim()?.slice(0, 4000) || null,
      language: language ?? null,
      source: "mcp",
    });

    if (error) {
      return {
        content: [
          {
            type: "text",
            text: `The request could not be saved (${error.message}). Ask the user to write directly to enstobbi@enstobbi.it or use https://businessmatching.global/Our_Services`,
          },
        ],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: "text",
          text: `Request received. Business Matching Global will reply to ${address}, normally within one working day. Tell the user the request has been sent and that no confidential documents should be shared in this chat; for the full service catalogue see https://businessmatching.global/Our_Services`,
        },
      ],
      structuredContent: { status: "received", email: address, service: service ?? null },
    };
  },
});
