import { fetchCurrentEvents } from '@/lib/leekduck';
import { LeekDuckEvent } from '@/types/database';

function getEventBadgeColor(eventType: string): string {
  switch (eventType) {
    case 'community-day':
      return 'bg-green-600';
    case 'spotlight-hour':
      return 'bg-yellow-600';
    case 'raid-hour':
      return 'bg-red-600';
    case 'go-battle-league':
      return 'bg-purple-600';
    case 'research':
      return 'bg-blue-600';
    default:
      return 'bg-gray-600';
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default async function EventsPage() {
  const events: LeekDuckEvent[] = await fetchCurrentEvents();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-pixel text-pixel-gold mb-2">Current Events</h1>
        <p className="text-sm text-gray-400">Powered by LeekDuck</p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No events currently available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div key={index} className="pixel-card p-4">
              {event.image && (
                <div className="w-full h-40 bg-pixel-darker rounded mb-3 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="font-pixel text-pixel-gold text-lg mb-2">{event.name}</h3>
              <span className={`pixel-badge ${getEventBadgeColor(event.eventType)} text-white text-xs px-2 py-1 rounded mb-2 inline-block`}>
                {event.eventType}
              </span>
              {event.heading && (
                <p className="text-gray-300 text-sm mt-2 mb-3">{event.heading}</p>
              )}
              <div className="text-xs text-gray-400 mt-2">
                <p>Start: {formatDate(event.start)}</p>
                <p>End: {formatDate(event.end)}</p>
              </div>
              {event.link && (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-btn inline-block mt-3 text-xs px-3 py-1"
                >
                  View on LeekDuck
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
