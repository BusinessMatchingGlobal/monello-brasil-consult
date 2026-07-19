import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  company?: string
  message?: string
  source?: string
  language?: string
  submittedAt?: string
}

const Email = ({
  name = '—',
  email = '—',
  company = '—',
  message = '—',
  source = 'Website',
  language = '—',
  submittedAt,
}: Props) => {
  const when = submittedAt || new Date().toISOString()
  // Split the free-form message into logical sections (double newline separated).
  // The first block is contact/phones; subsequent blocks are itinerary, passengers,
  // notes, services, documents, agency — each with an optional heading line.
  const blocks = String(message)
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean)
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>New contact request from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>✈️ Nuova richiesta volo</Heading>
            <Text style={muted}>
              {source} · {String(language).toUpperCase()} · {when}
            </Text>
          </Section>

          <Section style={contactCard}>
            <Heading as="h2" style={h2}>Contatto</Heading>
            <Row label="Organizzazione" value={name} />
            <Row label="Email" value={email} isLink linkHref={`mailto:${email}`} />
            {company && company !== '—' ? <Row label="Azienda" value={company} /> : null}
          </Section>

          {blocks.map((block, idx) => (
            <Block key={idx} raw={block} />
          ))}

          <Hr style={hr} />
          <Text style={footer}>
            Business Matching Global · notifica automatica
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const Row = ({
  label,
  value,
  isLink,
  linkHref,
}: {
  label: string
  value: string
  isLink?: boolean
  linkHref?: string
}) => (
  <table style={rowTable}>
    <tbody>
      <tr>
        <td style={rowLabelCell}>{label}</td>
        <td style={rowValueCell}>
          {isLink && linkHref ? (
            <a href={linkHref} style={linkStyle}>{value}</a>
          ) : (
            value
          )}
        </td>
      </tr>
    </tbody>
  </table>
)

// Renders one section block. If the first line looks like a heading (ends with ":"),
// it's shown as a colored heading and the rest becomes the body.
const Block = ({ raw }: { raw: string }) => {
  const lines = raw.split('\n')
  let heading: string | null = null
  let bodyLines = lines
  if (lines.length > 0 && /:\s*$/.test(lines[0])) {
    heading = lines[0].replace(/:\s*$/, '')
    bodyLines = lines.slice(1)
  }
  // Detect key:value lines (label before first ": ")
  const kvRows: Array<{ k: string; v: string } | { free: string }> = bodyLines.map((ln) => {
    const m = ln.match(/^\s*([^:]{1,40})\s*:\s*(.+)$/)
    if (m && !ln.startsWith('  ')) return { k: m[1].trim(), v: m[2].trim() }
    return { free: ln }
  })
  const allKv = kvRows.every((r) => 'k' in r)
  return (
    <Section style={block}>
      {heading ? <Heading as="h3" style={h3}>{heading}</Heading> : null}
      {allKv && kvRows.length > 0 ? (
        kvRows.map((r, i) => 'k' in r ? <Row key={i} label={r.k} value={r.v} /> : null)
      ) : (
        <Text style={bodyText}>{bodyLines.join('\n')}</Text>
      )}
    </Section>
  )
}

export const template = {
  component: Email,
  subject: (data: Props) => `New flight request — ${data?.name ?? 'Website'}`,
  displayName: 'Fly page notification',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    company: 'Acme SRL',
    message:
      'Phone: +39 123 456 7890\nWhatsApp: +55 11 91234 5678\n\nItinerario voli:\nGRU → MXP | 2026-08-01 | Data fissa\nMXP → GRU | 2026-08-20 | Flessibile (−1/+2 giorni)\n\nPasseggeri:\nDoe Jane | Data di nascita: 1985-04-12 | Cittadinanza: IT | Classe: Economy',
    source: 'Fly page',
    language: 'it',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', color: '#0f172a' }
const container = { padding: '24px', maxWidth: '620px', margin: '0 auto' }
const header = {
  backgroundColor: '#0f172a',
  color: '#ffffff',
  padding: '20px 24px',
  borderRadius: '10px 10px 0 0',
}
const h1 = { fontSize: '22px', fontWeight: 700, margin: '0 0 6px', color: '#ffffff' }
const h2 = { fontSize: '15px', fontWeight: 700, margin: '0 0 10px', color: '#0f172a', textTransform: 'uppercase' as const, letterSpacing: '0.04em' }
const h3 = { fontSize: '14px', fontWeight: 700, margin: '0 0 10px', color: '#1e40af', textTransform: 'uppercase' as const, letterSpacing: '0.04em' }
const muted = { color: '#cbd5e1', fontSize: '12px', margin: 0 }
const hr = { borderColor: '#e2e8f0', margin: '20px 0 10px' }
const contactCard = {
  backgroundColor: '#f1f5f9',
  border: '1px solid #e2e8f0',
  padding: '16px 18px',
  borderRadius: '0 0 10px 10px',
  marginBottom: '14px',
}
const block = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderLeft: '4px solid #1e40af',
  padding: '14px 18px',
  borderRadius: '8px',
  marginBottom: '10px',
}
const rowTable = { width: '100%', borderCollapse: 'collapse' as const, margin: '2px 0' }
const rowLabelCell = {
  width: '38%',
  padding: '6px 10px',
  fontSize: '12px',
  color: '#475569',
  fontWeight: 600,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.03em',
  verticalAlign: 'top' as const,
  backgroundColor: '#f8fafc',
  borderBottom: '1px solid #e2e8f0',
}
const rowValueCell = {
  padding: '6px 10px',
  fontSize: '14px',
  color: '#0f172a',
  verticalAlign: 'top' as const,
  borderBottom: '1px solid #e2e8f0',
  wordBreak: 'break-word' as const,
}
const bodyText = { fontSize: '14px', lineHeight: '22px', whiteSpace: 'pre-wrap' as const, margin: 0, color: '#0f172a' }
const linkStyle = { color: '#1e40af', textDecoration: 'underline' }
const footer = { fontSize: '11px', color: '#94a3b8', textAlign: 'center' as const, margin: '10px 0 0' }