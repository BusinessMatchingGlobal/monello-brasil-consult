import type { ComponentType } from 'npm:react@18.3.1'
import { template as contactNotification } from './contact-notification.tsx'
import { template as newsletterConfirm } from './newsletter-confirm.tsx'
import { template as newsletterOwnerNotification } from './newsletter-owner-notification.tsx'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: any) => string)
  displayName?: string
  previewData?: Record<string, any>
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'contact-notification': contactNotification,
  'newsletter-confirm': newsletterConfirm,
  'newsletter-owner-notification': newsletterOwnerNotification,
}