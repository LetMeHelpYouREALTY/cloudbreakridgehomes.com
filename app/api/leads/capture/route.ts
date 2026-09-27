/**
 * Lead Capture API — Follow Up Boss events (cloudbreakridgehomes.com)
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  MissingFollowUpBossKeyError,
  postLeadEventToFollowUpBoss,
} from '@/lib/fub/send-lead-event';
import { leadFormLimiter, getClientId, checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limit';

const SITE_SOURCE = 'cloudbreakridgehomes.com';

export interface LeadCaptureRequest {
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  source?: string;
  formType?: string;
  stage?: string;
  tags?: string[];
  message?: string;
  sourceUrl?: string;
  propertyType?: string;
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  neighborhoods?: string[];
  timeline?: string;
  financing?: string;
  preApproved?: boolean;
  turnstileToken?: string;
  company?: string;
  website?: string;
  customFields?: Record<string, unknown>;
}

async function verifyTurnstileToken(token: string): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.warn('TURNSTILE_SECRET_KEY not configured - skipping verification');
    return true;
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    );

    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function hasName(data: LeadCaptureRequest): boolean {
  return Boolean(
    data.name?.trim() ||
      data.firstName?.trim() ||
      data.lastName?.trim()
  );
}

function parseName(data: LeadCaptureRequest): { firstName: string; lastName: string } {
  if (data.firstName?.trim() || data.lastName?.trim()) {
    return {
      firstName: (data.firstName ?? '').trim(),
      lastName: (data.lastName ?? '').trim(),
    };
  }
  const full = (data.name ?? '').trim();
  const parts = full.split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] ?? '',
    lastName: parts.slice(1).join(' '),
  };
}

function resolveFormName(data: LeadCaptureRequest): string {
  return (data.formType || data.source || 'contact-form').trim();
}

function resolveEventType(data: LeadCaptureRequest): string {
  const key = `${data.formType ?? ''} ${data.source ?? ''}`.toLowerCase();

  if (
    key.includes('home-valuation') ||
    key.includes('home_valuation') ||
    key.includes('seller') ||
    key.includes('selling')
  ) {
    return 'Seller Inquiry';
  }
  if (
    key.includes('property-search') ||
    key.includes('property_search') ||
    key.includes('listing') ||
    key.includes('property inquiry')
  ) {
    return 'Property Inquiry';
  }
  if (
    key.includes('newsletter') ||
    key.includes('registration') ||
    key.includes('guide')
  ) {
    return 'Registration';
  }
  return 'General Inquiry';
}

function getAttributionTags(request: NextRequest): string[] {
  const tags: string[] = [];
  const url = new URL(request.url);

  const utmSource = url.searchParams.get('utm_source');
  const utmMedium = url.searchParams.get('utm_medium');
  const utmCampaign = url.searchParams.get('utm_campaign');

  if (utmSource) tags.push(`utm-source:${utmSource}`);
  if (utmMedium) tags.push(`utm-medium:${utmMedium}`);
  if (utmCampaign) tags.push(`utm-campaign:${utmCampaign}`);

  const referrer = request.headers.get('referer');
  if (referrer) {
    try {
      const refUrl = new URL(referrer);
      if (!refUrl.hostname.includes('cloudbreakridgehomes.com')) {
        tags.push(`referrer:${refUrl.hostname}`);
      }
    } catch {
      // ignore invalid referrer
    }
  }

  return tags;
}

function buildSearchCriteria(data: LeadCaptureRequest): string | null {
  const criteria: string[] = [];

  if (data.propertyType) criteria.push(`Type: ${data.propertyType}`);
  if (data.priceMin || data.priceMax) {
    const min = data.priceMin ? `$${data.priceMin.toLocaleString()}` : 'Any';
    const max = data.priceMax ? `$${data.priceMax.toLocaleString()}` : 'Any';
    criteria.push(`Price: ${min} - ${max}`);
  }
  if (data.bedrooms) criteria.push(`Bedrooms: ${data.bedrooms}+`);
  if (data.bathrooms) criteria.push(`Bathrooms: ${data.bathrooms}+`);
  if (data.neighborhoods?.length) {
    criteria.push(`Areas: ${data.neighborhoods.join(', ')}`);
  }
  if (data.timeline) criteria.push(`Timeline: ${data.timeline}`);
  if (data.financing) criteria.push(`Financing: ${data.financing}`);
  if (data.preApproved) criteria.push('Pre-approved: yes');

  return criteria.length > 0 ? criteria.join('\n') : null;
}

function buildMessage(data: LeadCaptureRequest): string {
  const parts: string[] = [];
  if (data.message?.trim()) parts.push(data.message.trim());

  const searchCriteria = buildSearchCriteria(data);
  if (searchCriteria) parts.push(searchCriteria);

  if (data.stage) parts.push(`Stage: ${data.stage}`);

  return parts.join('\n\n') || 'Website inquiry';
}

function buildDescription(data: LeadCaptureRequest, request: NextRequest): string {
  const formName = resolveFormName(data);
  const page =
    data.sourceUrl ||
    request.headers.get('referer') ||
    SITE_SOURCE;
  const attribution = getAttributionTags(request);
  const attributionNote =
    attribution.length > 0 ? ` | Attribution: ${attribution.join(', ')}` : '';
  return `${formName} | ${page}${attributionNote}`;
}

function buildPersonPayload(
  data: LeadCaptureRequest,
  request: NextRequest
): {
  firstName: string;
  lastName: string;
  emails: Array<{ value: string }>;
  phones: Array<{ value: string }>;
  tags: string[];
} {
  const { firstName, lastName } = parseName(data);
  const formName = resolveFormName(data);
  const tags = [
    SITE_SOURCE,
    formName,
    ...(data.tags ?? []),
    ...getAttributionTags(request),
  ].filter((tag, index, arr) => tag && arr.indexOf(tag) === index);

  return {
    firstName,
    lastName,
    emails: data.email?.trim() ? [{ value: data.email.trim() }] : [],
    phones: data.phone?.trim() ? [{ value: data.phone.trim() }] : [],
    tags,
  };
}

export async function POST(request: NextRequest) {
  let data: LeadCaptureRequest;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const honeypot = (data.company ?? data.website ?? '').trim();
  if (honeypot) {
    return NextResponse.json({ success: true });
  }

  const clientId = getClientId(request);
  const rateLimit = await checkRateLimit(leadFormLimiter, clientId);

  if (!rateLimit.success) {
    const resetDate = new Date(rateLimit.reset);
    const minutesUntilReset = Math.ceil((rateLimit.reset - Date.now()) / 60000);

    return NextResponse.json(
      {
        error: `Too many submissions. Please try again in ${minutesUntilReset} minute${minutesUntilReset > 1 ? 's' : ''}.`,
        retryAfter: resetDate.toISOString(),
      },
      {
        status: 429,
        headers: getRateLimitHeaders(rateLimit),
      }
    );
  }

  if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY) {
    if (!data.turnstileToken) {
      return NextResponse.json(
        { error: 'CAPTCHA verification required' },
        { status: 400 }
      );
    }

    const isValid = await verifyTurnstileToken(data.turnstileToken);
    if (!isValid) {
      return NextResponse.json(
        { error: 'CAPTCHA verification failed. Please try again.' },
        { status: 403 }
      );
    }
  }

  if (!data.email?.trim() && !data.phone?.trim()) {
    return NextResponse.json(
      { error: 'Email or phone is required' },
      { status: 400 }
    );
  }

  if (!hasName(data)) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  if (data.email?.trim() && !isValidEmail(data.email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  if (!process.env.FOLLOW_UP_BOSS_API_KEY) {
    console.error(
      '[Lead Capture] FOLLOW_UP_BOSS_API_KEY is not configured — cannot send leads to Follow Up Boss'
    );
    return NextResponse.json(
      { error: 'Lead capture is temporarily unavailable' },
      { status: 503 }
    );
  }

  const formName = resolveFormName(data);
  const sourceUrl =
    data.sourceUrl?.trim() ||
    request.headers.get('referer') ||
    `https://www.${SITE_SOURCE}`;

  const eventPayload = {
    source: SITE_SOURCE,
    system: SITE_SOURCE,
    type: resolveEventType(data),
    message: buildMessage(data),
    description: buildDescription(data, request),
    sourceUrl,
    person: buildPersonPayload(data, request),
  };

  try {
    const fubResponse = await postLeadEventToFollowUpBoss(eventPayload);

    if (!fubResponse.ok) {
      console.error(
        `[Lead Capture] Follow Up Boss events API returned status ${fubResponse.status}`
      );
      return NextResponse.json(
        { error: 'Failed to send lead to CRM' },
        { status: 502, headers: getRateLimitHeaders(rateLimit) }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Lead submitted successfully',
        form: formName,
      },
      { headers: getRateLimitHeaders(rateLimit) }
    );
  } catch (error) {
    if (error instanceof MissingFollowUpBossKeyError) {
      console.error('[Lead Capture] FOLLOW_UP_BOSS_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Lead capture is temporarily unavailable' },
        { status: 503 }
      );
    }

    console.error('[Lead Capture] Follow Up Boss request failed:', error);
    return NextResponse.json(
      { error: 'Failed to send lead to CRM' },
      { status: 502, headers: getRateLimitHeaders(rateLimit) }
    );
  }
}
