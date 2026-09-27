/**
 * Test: /api/leads/capture Route Handler
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from './route';

describe('POST /api/leads/capture', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('FOLLOW_UP_BOSS_API_KEY', 'test-fub-key');
    vi.stubEnv('NEXT_PUBLIC_TURNSTILE_SITE_KEY', '');
    vi.stubEnv('TURNSTILE_SECRET_KEY', '');
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.unstubAllEnvs();
  });

  it('returns 400 for empty JSON body', async () => {
    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toMatch(/required/i);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('returns 200 for honeypot without calling Follow Up Boss', async () => {
    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company: 'spam-co',
        firstName: 'Bot',
        email: 'bot@example.com',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('returns 503 when FOLLOW_UP_BOSS_API_KEY is missing', async () => {
    vi.stubEnv('FOLLOW_UP_BOSS_API_KEY', '');

    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.error).toBeDefined();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('posts a standard Follow Up Boss event on success', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      status: 201,
    });

    const request = new Request(
      'http://localhost:3000/api/leads/capture?utm_source=google',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Referer: 'https://www.cloudbreakridgehomes.com/contact',
        },
        body: JSON.stringify({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '7025551234',
          message: 'Interested in Cloudbreak Ridge',
          formType: 'contact',
        }),
      }
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    const [url, options] = (global.fetch as ReturnType<typeof vi.fn>).mock
      .calls[0] as [string, RequestInit];
    expect(url).toBe('https://api.followupboss.com/v1/events');
    expect(options.method).toBe('POST');

    const headers = options.headers as Record<string, string>;
    expect(headers.Authorization).toBe(
      `Basic ${Buffer.from('test-fub-key:').toString('base64')}`
    );
    expect(headers['X-System']).toBe('cloudbreakridgehomes.com');

    const body = JSON.parse(options.body as string);
    expect(body.source).toBe('cloudbreakridgehomes.com');
    expect(body.system).toBe('cloudbreakridgehomes.com');
    expect(body.type).toBe('General Inquiry');
    expect(body.person.emails).toEqual([{ value: 'john@example.com' }]);
    expect(body.person.phones).toEqual([{ value: '7025551234' }]);
    expect(body.person.tags).toContain('cloudbreakridgehomes.com');
    expect(body.person.tags).toContain('contact');
    expect(body.person.tags).toContain('utm-source:google');
  });

  it('maps home valuation forms to Seller Inquiry', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      status: 200,
    });

    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Seller',
        lastName: 'One',
        email: 'seller@example.com',
        formType: 'home-valuation',
      }),
    });

    await POST(request);

    const body = JSON.parse(
      ((global.fetch as ReturnType<typeof vi.fn>).mock.calls[0][1] as RequestInit)
        .body as string
    );
    expect(body.type).toBe('Seller Inquiry');
  });

  it('returns 502 when Follow Up Boss responds with an error', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(502);
    expect(data.error).toBeDefined();
  });

  it('returns 400 for invalid email', async () => {
    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'not-an-email',
        phone: '7025551234',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toMatch(/email/i);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
