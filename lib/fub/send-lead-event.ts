const SITE_SOURCE = 'cloudbreakridgehomes.com';
const FUB_EVENTS_URL = 'https://api.followupboss.com/v1/events';

export class MissingFollowUpBossKeyError extends Error {
  constructor() {
    super('FOLLOW_UP_BOSS_API_KEY is not configured');
    this.name = 'MissingFollowUpBossKeyError';
  }
}

export async function postLeadEventToFollowUpBoss(
  payload: Record<string, unknown>
): Promise<Response> {
  const apiKey = process.env.FOLLOW_UP_BOSS_API_KEY;
  if (!apiKey) {
    throw new MissingFollowUpBossKeyError();
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
    'X-System': SITE_SOURCE,
  };

  const systemKey = process.env.FUB_SYSTEM_KEY;
  if (systemKey) {
    headers['X-System-Key'] = systemKey;
  }

  return fetch(FUB_EVENTS_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
}
