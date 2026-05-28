export default function CommunityPage() {
  const posts = [
    { id: 1, author: 'TrainerAsh', team: 'mystic', title: 'Best Raid Counters for Mewtwo?', replies: 24, date: '2026-05-27' },
    { id: 2, author: 'PikachuFan', team: 'instinct', title: 'Shiny hunting tips for Community Day', replies: 18, date: '2026-05-26' },
    { id: 3, author: 'GymLeader42', team: 'valor', title: 'Looking for local raid group', replies: 12, date: '2026-05-25' },
    { id: 4, author: 'PokeCollector', team: 'mystic', title: 'Trade evolution - worth it?', replies: 31, date: '2026-05-24' },
    { id: 5, author: 'ShadowHunter', team: 'valor', title: 'Shadow vs Purified Pokemon guide', replies: 45, date: '2026-05-23' },
  ];

  function getTeamColor(team: string) {
    switch (team) {
      case 'mystic': return 'text-blue-400';
      case 'valor': return 'text-red-400';
      case 'instinct': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-pixel text-pixel-gold mb-2">Community Hub</h1>
        <p className="text-gray-400">Connect with trainers worldwide</p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="pixel-card bg-pixel-darker border border-pixel-accent rounded-lg p-4 hover:border-pixel-gold transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-pixel text-sm text-white mb-1">{post.title}</h3>
                <p className={`text-xs ${getTeamColor(post.team)}`}>by {post.author}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-pixel-gold">{post.replies} replies</p>
                <p className="text-xs text-gray-500">{post.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
