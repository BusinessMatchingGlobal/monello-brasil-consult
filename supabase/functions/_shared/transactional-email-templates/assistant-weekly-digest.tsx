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
  periodStart?: string
  periodEnd?: string
  totalQuestions?: number
  uncoveredCount?: number
  topicRequests?: number
  topUncovered?: Array<{ question: string; language?: string; count?: number }>
}

const Email = ({
  periodStart = '—',
  periodEnd = '—',
  totalQuestions = 0,
  uncoveredCount = 0,
  topicRequests = 0,
  topUncovered = [],
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>
      Ask BMG weekly digest — {totalQuestions} questions, {topicRequests} topic requests
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Ask BMG — weekly digest</Heading>
        <Text style={muted}>
          {periodStart} → {periodEnd}
        </Text>
        <Hr style={hr} />
        <Section>
          <Text style={row}>
            <strong style={rowLabel}>Questions asked:</strong> {totalQuestions}
          </Text>
          <Text style={row}>
            <strong style={rowLabel}>Not covered by published content:</strong> {uncoveredCount}
          </Text>
          <Text style={row}>
            <strong style={rowLabel}>Topic requests with email:</strong> {topicRequests}
          </Text>
        </Section>
        <Hr style={hr} />
        <Heading style={h2}>Top 10 uncovered questions</Heading>
        {topUncovered.length === 0 ? (
          <Text style={row}>No uncovered questions this week.</Text>
        ) : (
          topUncovered.map((item, i) => (
            <Text key={i} style={row}>
              {i + 1}. {item.question}
              {item.language ? ` (${item.language})` : ''}
              {item.count && item.count > 1 ? ` — asked ${item.count}×` : ''}
            </Text>
          ))
        )}
        <Hr style={hr} />
        <Text style={muted}>
          Generated automatically from the Ask BMG assistant logs. Full detail in the admin area.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Props) =>
    `Ask BMG — weekly digest (${data?.totalQuestions ?? 0} questions)`,
  displayName: 'Ask BMG — weekly digest',
  to: 'enstobbi@enstobbi.it',
  restricted: true,
  previewData: {
    periodStart: '2026-08-17',
    periodEnd: '2026-08-24',
    totalQuestions: 42,
    uncoveredCount: 11,
    topicRequests: 5,
    topUncovered: [
      { question: 'How do I register cosmetics with ANVISA?', language: 'en', count: 3 },
    ],
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', color: '#0f172a' }
const container = { padding: '24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '20px', fontWeight: 700, margin: '0 0 4px' }
const h2 = { fontSize: '16px', fontWeight: 700, margin: '0 0 8px' }
const muted = { color: '#64748b', fontSize: '12px', margin: 0 }
const hr = { borderColor: '#e2e8f0', margin: '16px 0' }
const row = { fontSize: '14px', margin: '4px 0' }
const rowLabel = { color: '#475569' }
