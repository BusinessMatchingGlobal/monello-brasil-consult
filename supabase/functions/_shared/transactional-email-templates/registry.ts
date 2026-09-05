import type { ComponentType } from 'npm:react@18.3.1'
import { template as assistantWeeklyDigest } from './assistant-weekly-digest.tsx'
import { template as contactNotification } from './contact-notification.tsx'
import { template as flyContactNotification } from './fly-contact-notification.tsx'
import { template as newsletterConfirm } from './newsletter-confirm.tsx'
import { template as newsletterOwnerNotification } from './newsletter-owner-notification.tsx'
import { template as newsletterTravelDesk } from './newsletter-travel-desk.tsx'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: any) => string)
  displayName?: string
  previewData?: Record<string, any>
  to?: string
  /**
   * If true, this template can only be sent when the caller of
   * a send is triggered from trusted server code. Use for templates
   * whose recipient or link content is caller-controlled and could otherwise
   * be abused to send branded phishing to arbitrary addresses.
   */
  restricted?: boolean
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'assistant-weekly-digest': assistantWeeklyDigest,
  'contact-notification': contactNotification,
  'fly-contact-notification': flyContactNotification,
  'newsletter-confirm': newsletterConfirm,
  'newsletter-owner-notification': newsletterOwnerNotification,
  'newsletter-travel-desk': newsletterTravelDesk,
}