import { fetchRaidBosses } from '@/lib/leekduck';
import { LeekDuckRaidBoss } from '@/types/database';

function getTierLabel(tier: number): string {
  switch (tier) {
    case 6:
      return 'Mega Raids';
    case 5:
      return 'Legendary Raids (T5)';
    case 3:
      return 'Tier 3 Raids';
    case 1:
      return 'Tier 1 Raids';
    default:
      return `Tier ${tier} Raids`;
  }
}

function getTierColor(tier: number): string {
  switch (tier) {
    case 6:
      return 'text-red-400';
    case 5:
      return 'text-purple-400';
    case 3:
      return 'text-yellow-400';
    case 1:
      return 'text-green-400';
    default:
      return 'text-gray-400';
  }
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    Normal: 'bg-gray-400 text-black',
    Fire: 'bg-red-500 text-white',
    Water: 'bg-blue-500 text-white',
    Electric: 'bg-yellow-400 text-black',
    Grass: 'bg-green-500 text-white',
    Ice: 'bg-cyan-300 text-black',
    Fighting: 'bg-orange-700 text-white',
    Poison: 'bg-purple-500 text-white',
    Ground: 'bg-amber-600 text-white',
    Flying: 'bg-indigo-300 text-black',
    Psychic: 'bg-pink-500 text-white',
    Bug: 'bg-lime-500 text-black',
    Rock: 'bg-yellow-700 text-white',
    Ghost: 'bg-purple-700 text-white',
    Dragon: 'bg-indigo-600 text-white',
    Dark: 'bg-gray-700 text-white',
    Steel: 'bg-gray-400 text-black',
    Fairy: 'bg-pink-300 text-black',
  };
  return colors[type] || 'bg-gray-500 text-white';
}

export default async function RaidsPage() {
  const raidBosses: LeekDuckRaidBoss[] = await fetchRaidBosses();

  const tierOrder = [6, 5, 3, 1];
  const groupedBosses: Record<number, LeekDuckRaidBoss[]> = {};

  for (const boss of raidBosses) {
    if (!groupedBosses[boss.tier]) {
      groupedBosses[boss.tier] = [];
    }
    groupedBosses[boss.tier].push(boss);
  }

  const sortedTiers = tierOrder.filter((tier) => groupedBosses[tier]?.length > 0);

  if (raidBosses.length === 0) {
    return (
      <div className="min-h-screen bg-pixel-darker p-6">
        <h1 className="font-pixel text-3xl text-pixel-gold mb-2 text-center">
          Current Raid Bosses
        </h1>
        <p className="text-gray-400 text-sm text-center mb-8">
          Live data from LeekDuck
        </p>
        <div className="text-center text-gray-500 mt-12">
          <p className="text-xl">No raid bosses currently available.</p>
          <p className="text-sm mt-2">Check back later for updated raid information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pixel-darker p-6">
      <h1 className="font-pixel text-3xl text-pixel-gold mb-2 text-center">
        Current Raid Bosses
      </h1>
      <p className="text-gray-400 text-sm text-center mb-8">
        Live data from LeekDuck
      </p>

      {sortedTiers.map((tier) => (
        <section key={tier} className="mb-10">
          <h2 className={`font-pixel text-xl ${getTierColor(tier)} mb-4 border-b border-pixel-accent pb-2`}>
            {getTierLabel(tier)}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {groupedBosses[tier].map((boss, index) => (
              <div
                key={`${boss.name}-${index}`}
                className="pixel-card p-4 rounded-lg border border-pixel-accent hover:border-pixel-gold transition-colors"
              >
                {boss.image && (
                  <div className="flex justify-center mb-3">
                    <img
                      src={boss.image}
                      alt={boss.name}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                )}
                <h3 className="font-pixel text-sm text-pixel-highlight text-center mb-2">
                  {boss.name}
                </h3>
                <div className="flex flex-wrap justify-center gap-1 mb-2">
                  {boss.type.map((t) => (
                    <span
                      key={t}
                      className={`pixel-badge text-xs px-2 py-0.5 rounded ${getTypeColor(t)}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center items-center gap-2 mt-2">
                  <span className={`text-xs ${getTierColor(tier)}`}>
                    T{tier}
                  </span>
                  {boss.shinyAvailable && (
                    <span className="pixel-badge text-xs px-2 py-0.5 rounded bg-yellow-500 text-black">
                      * Shiny Available
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
