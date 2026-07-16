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
  firstName?: string
  lastName?: string
  email?: string
  language?: string
  source?: string
  confirmedAt?: string
  ipAddress?: string
}

const Email = ({
  firstName = '—',
  lastName = '—',
  email = '—',
  language = '—',
  source = 'Newsletter popup',
  confirmedAt,
  ipAddress = '—',
}: Props) => {
  const when = confirmedAt || new Date().toISOString()
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>New confirmed newsletter subscriber: {email}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New confirmed newsletter subscriber</Heading>
          <Text style={muted}>{source} · {language} · {when}</Text>
          <Hr style={hr} />
          <Section>
            <Row label="First name" value={firstName} />
            <Row label="Last name" value={lastName} />
            <Row label="Email" value={email} />
            <Row label="Language" value={language} />
            <Row label="Confirmed at" value={when} />
            <Row label="IP address" value={ipAddress} />
          </Section>
          <Hr style={hr} />
          <Text style={muted}>
            Double opt-in confirmed via email link. Consent stored in newsletter_subscribers.
          </Text>
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
  subject: (data: Props) => `Newsletter — new confirmed subscriber (${data?.email ?? '—'})`,
  displayName: 'Newsletter — owner notification',
  to: 'info@businessmatching.global',
  previewData: {
    firstName: 'Mario',
    lastName: 'Rossi',
    email: 'mario.rossi@example.com',
    language: 'it',
    source: 'Newsletter popup',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', color: '#0f172a' }
const container = { padding: '24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '20px', fontWeight: 700, margin: '0 0 4px' }
const muted = { color: '#64748b', fontSize: '12px', margin: 0 }
const hr = { borderColor: '#e2e8f0', margin: '16px 0' }
const row = { fontSize: '14px', margin: '4px 0' }
const rowLabel = { color: '#475569' }