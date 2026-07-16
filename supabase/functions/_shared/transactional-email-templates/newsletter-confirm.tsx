import * as React from 'npm:react@18.3.1'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  firstName?: string
  confirmUrl?: string
  language?: 'it' | 'en' | 'pt'
}

const strings = {
  it: {
    preview: 'Conferma la tua iscrizione alla newsletter #CustoBrasil',
    heading: 'Conferma la tua iscrizione',
    hi: (n: string) => (n ? `Ciao ${n},` : 'Ciao,'),
    intro:
      'grazie per esserti iscritto alla newsletter #CustoBrasil di Business Matching Global. Per completare la registrazione e ricevere gli aggiornamenti, conferma il tuo indirizzo email cliccando sul pulsante qui sotto.',
    cta: 'Conferma iscrizione',
    fallback: 'Se il pulsante non funziona, copia e incolla questo link nel browser:',
    ignore: 'Se non hai richiesto questa iscrizione, ignora semplicemente questa email.',
    signature: 'Business Matching Global',
  },
  en: {
    preview: 'Confirm your subscription to the #CustoBrasil newsletter',
    heading: 'Confirm your subscription',
    hi: (n: string) => (n ? `Hi ${n},` : 'Hi,'),
    intro:
      'thank you for subscribing to the #CustoBrasil newsletter by Business Matching Global. To complete your registration and receive updates, please confirm your email address by clicking the button below.',
    cta: 'Confirm subscription',
    fallback: 'If the button does not work, copy and paste this link into your browser:',
    ignore: 'If you did not request this subscription, simply ignore this email.',
    signature: 'Business Matching Global',
  },
  pt: {
    preview: 'Confirme sua inscrição na newsletter #CustoBrasil',
    heading: 'Confirme sua inscrição',
    hi: (n: string) => (n ? `Olá ${n},` : 'Olá,'),
    intro:
      'obrigado por se inscrever na newsletter #CustoBrasil da Business Matching Global. Para completar seu cadastro e receber atualizações, confirme seu endereço de e-mail clicando no botão abaixo.',
    cta: 'Confirmar inscrição',
    fallback: 'Se o botão não funcionar, copie e cole este link no navegador:',
    ignore: 'Se você não solicitou esta inscrição, basta ignorar este e-mail.',
    signature: 'Business Matching Global',
  },
}

const Email = ({ firstName = '', confirmUrl = '#', language = 'it' }: Props) => {
  const s = strings[language] ?? strings.it
  return (
    <Html lang={language} dir="ltr">
      <Head />
      <Preview>{s.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{s.heading}</Heading>
          <Text style={body}>{s.hi(firstName)}</Text>
          <Text style={body}>{s.intro}</Text>
          <Button href={confirmUrl} style={button}>{s.cta}</Button>
          <Text style={muted}>{s.fallback}</Text>
          <Text style={linkText}>
            <Link href={confirmUrl} style={linkStyle}>{confirmUrl}</Link>
          </Text>
          <Hr style={hr} />
          <Text style={muted}>{s.ignore}</Text>
          <Text style={muted}>{s.signature}</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: (data: Props) => {
    const s = strings[(data?.language as 'it' | 'en' | 'pt') ?? 'it'] ?? strings.it
    return s.preview
  },
  displayName: 'Newsletter — double opt-in confirmation',
  previewData: {
    firstName: 'Mario',
    confirmUrl: 'https://businessmatching.global/newsletter/confirm?token=preview',
    language: 'it',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', color: '#0f172a' }
const container = { padding: '32px 24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 700, margin: '0 0 16px' }
const body = { fontSize: '15px', lineHeight: '22px', margin: '0 0 16px' }
const button = {
  backgroundColor: '#059669',
  color: '#ffffff',
  padding: '12px 22px',
  borderRadius: '8px',
  fontSize: '15px',
  fontWeight: 600,
  textDecoration: 'none',
  display: 'inline-block',
  margin: '8px 0 20px',
}
const linkText = { fontSize: '13px', wordBreak: 'break-all' as const, margin: '0 0 8px' }
const linkStyle = { color: '#059669' }
const muted = { color: '#64748b', fontSize: '12px', margin: '4px 0' }
const hr = { borderColor: '#e2e8f0', margin: '20px 0' }