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
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>New contact request from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New contact request</Heading>
          <Text style={muted}>{source} · {language} · {when}</Text>
          <Hr style={hr} />
          <Section>
            <Row label="Name" value={name} />
            <Row label="Email" value={email} />
            <Row label="Company" value={company} />
          </Section>
          <Hr style={hr} />
          <Heading as="h2" style={h2}>Message</Heading>
          <Text style={body}>{message}</Text>
        </Container>
      </Body>
    </Html>
  )
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <Text style={row}>
    <strong style={rowLabel}>{label}:</strong> {value}
  </Text>
)

export const template = {
  component: Email,
  subject: (data: Props) => `New flight request — ${data?.name ?? 'Website'}`,
  displayName: 'Fly page notification',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    company: 'Acme SRL',
    message: 'Phone: +39 123 456 7890\nWhatsApp: +55 11 91234 5678\n\nItinerario: ...',
    source: 'Fly page',
    language: 'it',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', color: '#0f172a' }
const container = { padding: '24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 700, margin: '0 0 4px' }
const h2 = { fontSize: '16px', fontWeight: 600, margin: '8px 0' }
const muted = { color: '#64748b', fontSize: '12px', margin: 0 }
const hr = { borderColor: '#e2e8f0', margin: '16px 0' }
const row = { fontSize: '14px', margin: '4px 0' }
const rowLabel = { color: '#475569' }
const body = { fontSize: '14px', lineHeight: '22px', whiteSpace: 'pre-wrap' as const }