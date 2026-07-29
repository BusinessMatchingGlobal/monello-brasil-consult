import * as React from 'npm:react@18.3.1'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  firstName?: string
  language?: 'it' | 'en' | 'pt'
}

const strings = {
  it: {
    preview: 'Iscrizione confermata — e un servizio in più per le vostre trasferte',
    heading: 'Iscrizione confermata',
    hi: (n: string) => (n ? `Ciao ${n},` : 'Ciao,'),
    intro:
      'la tua iscrizione alla newsletter #CustoBrasil è attiva. Grazie per la conferma.',
    body:
      "Ne approfittiamo per ricordarti che BMG ha anche un travel desk dedicato al corridoio, in partnership con un'agenzia italiana autorizzata attiva dal 2004 — tariffe aeree negoziate non disponibili online, hotel, transfer e assistenza proattiva in viaggio inclusa nel prezzo.",
    body2:
      'Per chi organizza la trasferta di settembre (o qualsiasi missione in Brasile):',
    cta: 'Scopri il travel desk',
    signature: 'Business Matching Global',
  },
  en: {
    preview: 'Subscription confirmed — and one more service for your trips',
    heading: 'Subscription confirmed',
    hi: (n: string) => (n ? `Hi ${n},` : 'Hi,'),
    intro: 'your subscription to the #CustoBrasil newsletter is now active. Thank you for confirming.',
    body:
      'While we are here: BMG also runs a travel desk dedicated to this corridor, in partnership with an authorised Italian agency operating since 2004 — negotiated airfares not available online, hotels, transfers and proactive in-trip assistance included in the price.',
    body2: 'If you are planning the September trip (or any mission to Brazil):',
    cta: 'Discover the travel desk',
    signature: 'Business Matching Global',
  },
  pt: {
    preview: 'Inscrição confirmada — e um serviço a mais para suas viagens',
    heading: 'Inscrição confirmada',
    hi: (n: string) => (n ? `Olá ${n},` : 'Olá,'),
    intro: 'sua inscrição na newsletter #CustoBrasil está ativa. Obrigado pela confirmação.',
    body:
      'Aproveitamos para lembrar que a BMG também tem um travel desk dedicado a este corredor, em parceria com uma agência italiana autorizada, ativa desde 2004 — tarifas aéreas negociadas indisponíveis online, hotéis, transfers e assistência proativa durante a viagem incluída no preço.',
    body2: 'Para quem está organizando a viagem de setembro (ou qualquer missão ao Brasil):',
    cta: 'Conhecer o travel desk',
    signature: 'Business Matching Global',
  },
}

const BT_URL = 'https://businessmatching.global/BT'

const Email = ({ firstName = '', language = 'it' }: Props) => {
  const s = strings[language] ?? strings.it
  return (
    <Html lang={language} dir="ltr">
      <Head />
      <Preview>{s.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{s.heading}</Heading>
          <Text style={text}>{s.hi(firstName)}</Text>
          <Text style={text}>{s.intro}</Text>
          <Hr style={hr} />
          <Text style={text}>{s.body}</Text>
          <Text style={text}>{s.body2}</Text>
          <Button href={BT_URL} style={button}>
            {s.cta}
          </Button>
          <Text style={muted}>businessmatching.global/BT</Text>
          <Hr style={hr} />
          <Text style={muted}>{s.signature}</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: (data: any) =>
    data?.language === 'en'
      ? 'Subscription confirmed — and our travel desk for Brazil'
      : data?.language === 'pt'
      ? 'Inscrição confirmada — e nosso travel desk para o Brasil'
      : 'Iscrizione confermata — e il nostro travel desk per il Brasile',
  displayName: 'Newsletter confirmed + travel desk',
  previewData: { firstName: 'Marco', language: 'it' },
  restricted: true,
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '600px' }
const h1 = { fontSize: '22px', color: '#111111', margin: '0 0 16px' }
const text = { fontSize: '15px', lineHeight: '1.6', color: '#333333' }
const muted = { fontSize: '12px', color: '#777777' }
const hr = { borderColor: '#e6e6e6', margin: '20px 0' }
const button = {
  backgroundColor: '#0b3d2c',
  color: '#ffffff',
  borderRadius: '6px',
  padding: '12px 20px',
  fontSize: '15px',
  textDecoration: 'none',
  display: 'inline-block',
}