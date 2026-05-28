import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-16 px-4 text-center bg-pixel-darker">
        <h1 className="text-5xl md:text-6xl font-pixel text-pixel-highlight mb-4">
          PokeTrade Hub
        </h1>
        <p className="text-xl md:text-2xl text-pixel-gold mb-4">
          Your ultimate Pok&eacute;mon GO trading companion
        </p>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Connect with trainers worldwide to trade Pok&eacute;mon, coordinate raids, and stay up to date with the latest events. Build your perfect team and complete your Pok&eacute;dex!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/trades" className="pixel-btn">
            Browse Trades
          </Link>
          <Link href="/raids" className="pixel-btn-secondary">
            View Raids
          </Link>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="w-full py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Trade Pokemon Card */}
          <div className="pixel-card p-6 text-center">
            <div className="text-4xl mb-4">{"\u{1F504}"}</div>
            <h3 className="text-xl font-pixel text-pixel-highlight mb-2">Trade Pok&eacute;mon</h3>
            <p className="text-gray-300 text-sm">
              Find trainers to trade with in your area or remotely. Complete your Pok&eacute;dex with local and remote trading options.
            </p>
          </div>

          {/* Raid Bosses Card */}
          <div className="pixel-card p-6 text-center">
            <div className="text-4xl mb-4">{"\u{2694}\u{FE0F}"}</div>
            <h3 className="text-xl font-pixel text-pixel-gold mb-2">Raid Bosses</h3>
            <p className="text-gray-300 text-sm">
              Current raid bosses powered by LeekDuck data. Coordinate with other trainers to take down legendary raids.
            </p>
          </div>

          {/* Events Card */}
          <div className="pixel-card p-6 text-center">
            <div className="text-4xl mb-4">{"\u{1F4C5}"}</div>
            <h3 className="text-xl font-pixel text-pixel-green mb-2">Events</h3>
            <p className="text-gray-300 text-sm">
              Stay updated on current and upcoming events including Community Days, Spotlight Hours, and special research.
            </p>
          </div>

          {/* Community Card */}
          <div className="pixel-card p-6 text-center">
            <div className="text-4xl mb-4">{"\u{1F465}"}</div>
            <h3 className="text-xl font-pixel text-pixel-highlight mb-2">Community</h3>
            <p className="text-gray-300 text-sm">
              Connect with trainers in your area. Add friends, send messages, and build your local Pok&eacute;mon GO community.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
