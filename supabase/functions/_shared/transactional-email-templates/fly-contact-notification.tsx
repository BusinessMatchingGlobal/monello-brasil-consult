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
  phone?: string
  whatsapp?: string
  tripLabel?: string
  itinerary?: Array<{ label: string; from: string; to: string; date: string; flex: string }>
  passengers?: Array<{
    n: number
    lastName: string
    firstName: string
    dob: string
    cit1: string
    cit2: string
    permit: string
    travelClass: string
    bags: string
    weight: string
  }>
  documents?: Array<{
    n: number
    passportUrl?: string
    residenceUrls?: string[]
    ackNoDocs?: boolean
  }>
  notes?: string
  services?: string
  agencyText?: string
  agencyAuthLabel?: string
}

const Email = ({
  name = '—',
  email = '—',
  company = '—',
  message = '—',
  source = 'Website',
  language = '—',
  submittedAt,
  phone,
  whatsapp,
  tripLabel,
  itinerary,
  passengers,
  documents,
  notes,
  services,
  agencyText,
  agencyAuthLabel,
}: Props) => {
  const when = submittedAt || new Date().toISOString()
  const hasStructured =
    (itinerary && itinerary.length > 0) || (passengers && passengers.length > 0)
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
            {phone ? <Row label="Telefono" value={phone} /> : null}
            {whatsapp ? <Row label="WhatsApp" value={whatsapp} /> : null}
          </Section>

          {hasStructured ? (
            <>
              {itinerary && itinerary.length > 0 ? (
                <Section style={block}>
                  <Heading as="h3" style={h3}>
                    Itinerario voli{tripLabel ? ` — ${tripLabel}` : ''}
                  </Heading>
                  <table style={dataTable}>
                    <thead>
                      <tr>
                        <th style={th}>Tratta</th>
                        <th style={th}>Da</th>
                        <th style={th}>A</th>
                        <th style={th}>Data</th>
                        <th style={th}>Flessibilità</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itinerary.map((l, i) => (
                        <tr key={i} style={i % 2 ? trAlt : trBase}>
                          <td style={td}><strong>{l.label}</strong></td>
                          <td style={td}>{l.from}</td>
                          <td style={td}>{l.to}</td>
                          <td style={td}>{l.date}</td>
                          <td style={td}>{l.flex}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Section>
              ) : null}

              {passengers && passengers.length > 0 ? (
                <Section style={block}>
                  <Heading as="h3" style={h3}>Passeggeri</Heading>
                  <table style={dataTable}>
                    <thead>
                      <tr>
                        <th style={th}>#</th>
                        <th style={th}>Cognome</th>
                        <th style={th}>Nome</th>
                        <th style={th}>Nascita</th>
                        <th style={th}>Cittadinanza</th>
                        <th style={th}>2ª cittad.</th>
                        <th style={th}>Residenza</th>
                        <th style={th}>Classe</th>
                        <th style={th}>Bag.</th>
                        <th style={th}>Peso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {passengers.map((p, i) => (
                        <tr key={i} style={i % 2 ? trAlt : trBase}>
                          <td style={td}>{p.n}</td>
                          <td style={td}><strong>{p.lastName}</strong></td>
                          <td style={td}>{p.firstName}</td>
                          <td style={td}>{p.dob}</td>
                          <td style={td}>{p.cit1}</td>
                          <td style={td}>{p.cit2}</td>
                          <td style={td}>{p.permit}</td>
                          <td style={td}>{p.travelClass}</td>
                          <td style={td}>{p.bags}</td>
                          <td style={td}>{p.weight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Section>
              ) : null}

              {notes ? (
                <Section style={block}>
                  <Heading as="h3" style={h3}>Note</Heading>
                  <Text style={bodyText}>{notes}</Text>
                </Section>
              ) : null}

              {services ? (
                <Section style={block}>
                  <Heading as="h3" style={h3}>Altri servizi richiesti</Heading>
                  <Text style={bodyText}>{services}</Text>
                </Section>
              ) : null}

              {documents && documents.length > 0 &&
              documents.some((d) => d.passportUrl || (d.residenceUrls && d.residenceUrls.length > 0) || d.ackNoDocs) ? (
                <Section style={block}>
                  <Heading as="h3" style={h3}>Documenti</Heading>
                  <table style={dataTable}>
                    <thead>
                      <tr>
                        <th style={th}>Passeggero</th>
                        <th style={th}>Passaporto</th>
                        <th style={th}>Residenza / RNE</th>
                        <th style={th}>Stato</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((d, i) => (
                        <tr key={i} style={i % 2 ? trAlt : trBase}>
                          <td style={td}>#{d.n}</td>
                          <td style={td}>
                            {d.passportUrl ? (
                              <a href={d.passportUrl} style={linkStyle}>Apri</a>
                            ) : '—'}
                          </td>
                          <td style={td}>
                            {d.residenceUrls && d.residenceUrls.length > 0
                              ? d.residenceUrls.map((u, j) => (
                                  <div key={j}>
                                    <a href={u} style={linkStyle}>File {j + 1}</a>
                                  </div>
                                ))
                              : '—'}
                          </td>
                          <td style={td}>
                            {d.ackNoDocs ? '⚠ Nessun documento — responsabilità confermata' : 'OK'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Section>
              ) : null}

              {agencyText ? (
                <Section style={block}>
                  <Heading as="h3" style={h3}>Agenzia incaricata</Heading>
                  <Text style={bodyText}>{agencyText}</Text>
                  {agencyAuthLabel ? (
                    <Text style={{ ...bodyText, marginTop: 8 }}>
                      ✅ <strong>Autorizzazione:</strong> {agencyAuthLabel}
                    </Text>
                  ) : null}
                </Section>
              ) : null}
            </>
          ) : (
            <Section style={block}>
              <Text style={bodyText}>{message}</Text>
            </Section>
          )}

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

export const template = {
  component: Email,
  subject: (data: Props) => `New flight request — ${data?.name ?? 'Website'}`,
  displayName: 'Fly page notification',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    company: 'Acme SRL',
    phone: '+39 123 456 7890',
    whatsapp: '+55 11 91234 5678',
    tripLabel: 'Andata e ritorno',
    itinerary: [
      { label: 'Andata', from: 'GRU — São Paulo', to: 'MXP — Milano', date: '2026-08-01', flex: 'Data fissa' },
      { label: 'Ritorno', from: 'MXP — Milano', to: 'GRU — São Paulo', date: '2026-08-20', flex: 'Flessibile (−1/+2 giorni)' },
    ],
    passengers: [
      { n: 1, lastName: 'DOE', firstName: 'Jane', dob: '1985-04-12', cit1: 'IT — Italy', cit2: '—', permit: 'Nessuna', travelClass: 'Economy', bags: '1', weight: '23 kg' },
    ],
    documents: [
      { n: 1, passportUrl: 'https://example.com/passport.pdf', residenceUrls: [], ackNoDocs: false },
    ],
    notes: 'Preferenza per volo diretto se disponibile.',
    services: 'Hotel a São Paulo 15–20/08, zona Jardins.',
    agencyText: 'Cavallinodieci S.r.l. — Calliphora',
    agencyAuthLabel: 'Autorizzo Cavallinodieci S.r.l.',
    message: '',
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
const dataTable = {
  width: '100%',
  borderCollapse: 'collapse' as const,
  fontSize: '12px',
  tableLayout: 'auto' as const,
}
const th = {
  padding: '6px 8px',
  fontSize: '11px',
  color: '#ffffff',
  backgroundColor: '#1e40af',
  textAlign: 'left' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.04em',
  fontWeight: 700,
  border: '1px solid #1e3a8a',
}
const td = {
  padding: '6px 8px',
  fontSize: '12px',
  color: '#0f172a',
  verticalAlign: 'top' as const,
  border: '1px solid #e2e8f0',
  wordBreak: 'break-word' as const,
}
const trBase = { backgroundColor: '#ffffff' }
const trAlt = { backgroundColor: '#f8fafc' }