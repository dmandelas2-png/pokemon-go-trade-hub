import { LeekDuckEvent, LeekDuckRaidBoss } from '@/types/database';

const LEEKDUCK_BASE = 'https://leekduck.com';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache: Map<string, CacheEntry<unknown>> = new Map();

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
    return entry.data as T;
  }
  return null;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

export async function fetchCurrentEvents(): Promise<LeekDuckEvent[]> {
  const cached = getCached<LeekDuckEvent[]>('events');
  if (cached) return cached;

  try {
    const response = await fetch(`${LEEKDUCK_BASE}/events/`, {
      next: { revalidate: 1800 },
    });
    const html = await response.text();
    const events = parseEventsFromHTML(html);
    setCache('events', events);
    return events;
  } catch (error) {
    console.error('Failed to fetch LeekDuck events:', error);
    return getMockEvents();
  }
}

export async function fetchRaidBosses(): Promise<LeekDuckRaidBoss[]> {
  const cached = getCached<LeekDuckRaidBoss[]>('raids');
  if (cached) return cached;

  try {
    const response = await fetch(`${LEEKDUCK_BASE}/boss/`, {
      next: { revalidate: 1800 },
    });
    const html = await response.text();
    const bosses = parseRaidBossesFromHTML(html);
    setCache('raids', bosses);
    return bosses;
  } catch (error) {
    console.error('Failed to fetch LeekDuck raid bosses:', error);
    return getMockRaidBosses();
  }
}

function parseEventsFromHTML(html: string): LeekDuckEvent[] {
  const events: LeekDuckEvent[] = [];
  const eventRegex = /<div class="Pokemon GO resource[^"]*event-item[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi;
  const titleRegex = /<h2[^>]*>(.*?)<\/h2>/i;
  const imgRegex = /<img[^>]*src="([^"]*)"[^>]*>/i;
  const linkRegex = /<a[^>]*href="([^"]*)"[^>]*>/i;

  let match;
  while ((match = eventRegex.exec(html)) !== null) {
    const block = match[1];
    const title = titleRegex.exec(block);
    const img = imgRegex.exec(block);
    const link = linkRegex.exec(block);

    if (title) {
      events.push({
        name: title[1].replace(/<[^>]*>/g, '').trim(),
        eventType: 'event',
        heading: title[1].replace(/<[^>]*>/g, '').trim(),
        link: link ? `${LEEKDUCK_BASE}` : '',
        image: img ? img[1] : '',
        start: new Date().toISOString(),
        end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });
    }
  }

  return events.length > 0 ? events : getMockEvents();
}

function parseRaidBossesFromHTML(html: string): LeekDuckRaidBoss[] {
  const bosses: LeekDuckRaidBoss[] = [];
  const bossRegex = /<li[^>]*class="Pokemon GO resource[^"]*boss-pokemon[^"]*"[^>]*>([\s\S]*?)<\/li>/gi;
  const nameRegex = /<p[^>]*class="Pokemon GO resource[^"]*boss-name[^"]*"[^>]*>(.*?)<\/p>/i;
  const imgRegex = /<img[^>]*src="([^"]*)"[^>]*>/i;

  let match;
  while ((match = bossRegex.exec(html)) !== null) {
    const block = match[1];
    const name = nameRegex.exec(block);
    const img = imgRegex.exec(block);

    if (name) {
      bosses.push({
        name: name[1].replace(/<[^>]*>/g, '').trim(),
        tier: 5,
        type: ['Unknown'],
        shinyAvailable: block.includes('shiny'),
        image: img ? img[1] : '',
      });
    }
  }

  return bosses.length > 0 ? bosses : getMockRaidBosses();
}

function getMockEvents(): LeekDuckEvent[] {
  return [
    { name: 'Community Day Classic', eventType: 'community-day', heading: 'Community Day Classic: Ralts', link: '', image: '', start: new Date().toISOString(), end: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() },
    { name: 'Spotlight Hour', eventType: 'spotlight-hour', heading: 'Spotlight Hour: Pikachu', link: '', image: '', start: new Date().toISOString(), end: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString() },
    { name: 'Raid Hour', eventType: 'raid-hour', heading: 'Raid Hour: Mewtwo', link: '', image: '', start: new Date().toISOString(), end: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() },
    { name: 'GO Battle League Season', eventType: 'go-battle-league', heading: 'GO Battle League: Great League', link: '', image: '', start: new Date().toISOString(), end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() },
    { name: 'Research Breakthrough', eventType: 'research', heading: 'Research Breakthrough: Galarian Birds', link: '', image: '', start: new Date().toISOString(), end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() },
  ];
}

function getMockRaidBosses(): LeekDuckRaidBoss[] {
  return [
    { name: 'Mewtwo', tier: 5, type: ['Psychic'], shinyAvailable: true, image: '' },
    { name: 'Mega Rayquaza', tier: 6, type: ['Dragon', 'Flying'], shinyAvailable: true, image: '' },
    { name: 'Registeel', tier: 5, type: ['Steel'], shinyAvailable: true, image: '' },
    { name: 'Machamp', tier: 3, type: ['Fighting'], shinyAvailable: true, image: '' },
    { name: 'Togetic', tier: 3, type: ['Fairy', 'Flying'], shinyAvailable: true, image: '' },
    { name: 'Shinx', tier: 1, type: ['Electric'], shinyAvailable: true, image: '' },
  ];
}
