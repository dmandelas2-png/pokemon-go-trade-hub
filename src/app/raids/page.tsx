'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const sampleRaids = [
  { id: '1', boss: 'Mega Rayquaza', tier: 'MEGA', location: 'Central Park Gym', max_players: 10, current_players: 6, is_remote: true, description: 'Remote invites available', host: 'TrainerRed', created_at: '2026-05-28' },
  { id: '2', boss: 'Dialga (Origin)', tier: '5', location: 'Times Square', max_players: 6, current_players: 3, is_remote: false, description: 'Meet at fountain', host: 'GymLeader99', created_at: '2026-05-28' },
  { id: '3', boss: 'Mega Charizard X', tier: 'MEGA', location: 'Brooklyn Bridge', max_players: 5, current_players: 2, is_remote: true, description: 'Will start when full', host: 'FireBreather', created_at: '2026-05-28' },
  { id: '4', boss: 'Kartana', tier: '5', location: 'Union Square', max_players: 8, current_players: 8, is_remote: true, description: 'Full! Sorry', host: 'UltraBeast', created_at: '2026-05-28' },
];

export default function RaidsPage() {
  const [raids, setRaids] = useState(sampleRaids);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({ boss: '', tier: '5', location: '', max_players: '6', is_remote: false, description: '' });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    loadRaids();
  }, []);

  const loadRaids = async () => {
    const { data } = await supabase.from('raids').select('*').order('created_at', { ascending: false });
    if (data && data.length > 0) setRaids(data);
  };

  const handleSubmit = async () => {
    if (!user) { alert('Please sign in first'); return; }
    const { error } = await supabase.from('raids').insert([{ ...form, max_players: Number(form.max_players), current_players: 1, user_id: user.id, host: user.email.split('@')[0] }]);
    if (!error) { setShowForm(false); loadRaids(); setForm({ boss: '', tier: '5', location: '', max_players: '6', is_remote: false, description: '' }); }
  };

  const filtered = raids.filter(r => {
    if (filter === 'remote') return r.is_remote;
    if (filter === 'local') return !r.is_remote;
    if (filter === 'mega') return r.tier === 'MEGA';
    return true;
  });

  const filters = ['all', 'remote', 'local', 'mega'];
  const filterLabels = { all: 'All Raids', remote: 'Remote', local: 'Local', mega: 'Mega' };

  const getTierLabel = (tier) => {
    if (tier === 'MEGA') return 'MEGA';
    return 'T' + tier;
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-pixel text-2xl text-pixel-gold">Raid Lobby</h1>
          <button onClick={() => { if (!user) { alert('Sign in first'); return; } setShowForm(!showForm); }} className="bg-pixel-gold text-gray-900 font-pixel text-xs px-4 py-2 rounded hover:bg-yellow-400">{showForm ? 'Cancel' : '+ Host Raid'}</button>
        </div>
        {showForm && (
          <div className="bg-gray-800 border-2 border-pixel-gold rounded p-4 mb-6">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input placeholder="Raid Boss" value={form.boss} onChange={(e) => setForm({...form, boss: e.target.value})} className="p-2 bg-gray-700 border border-gray-600 rounded text-white font-pixel text-xs" />
              <select value={form.tier} onChange={(e) => setForm({...form, tier: e.target.value})} className="p-2 bg-gray-700 border border-gray-600 rounded text-white font-pixel text-xs">
                <option value="1">Tier 1</option>
                <option value="3">Tier 3</option>
                <option value="5">Tier 5</option>
                <option value="MEGA">Mega</option>
              </select>
              <input placeholder="Location" value={form.location} onChange={(e) => setForm({...form, location: e.target.value})} className="p-2 bg-gray-700 border border-gray-600 rounded text-white font-pixel text-xs" />
              <input placeholder="Max Players" type="number" value={form.max_players} onChange={(e) => setForm({...form, max_players: e.target.value})} className="p-2 bg-gray-700 border border-gray-600 rounded text-white font-pixel text-xs" />
            </div>
            <div className="flex gap-4 mb-3">
              <label className="font-pixel text-xs text-gray-300 flex items-center gap-2"><input type="checkbox" checked={form.is_remote} onChange={(e) => setForm({...form, is_remote: e.target.checked})} /> Remote Raid</label>
            </div>
            <input placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 rounded text-white font-pixel text-xs" />
            <button onClick={handleSubmit} className="bg-green-600 text-white font-pixel text-xs px-4 py-2 rounded hover:bg-green-500">Host Raid</button>
          </div>
        )}
        <div className="flex gap-2 mb-6">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={"font-pixel text-xs px-3 py-2 rounded " + (filter === f ? "bg-pixel-gold text-gray-900" : "bg-gray-700 text-gray-300")}>{filterLabels[f]}</button>
          ))}
        </div>
        <div className="space-y-4">
          {filtered.map((raid) => (
            <div key={raid.id} className="bg-gray-800 border-2 border-gray-700 rounded p-4 hover:border-pixel-gold">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-pixel text-sm text-white">{raid.boss}</span>
                    <span className="font-pixel text-xs text-yellow-400">{getTierLabel(raid.tier)}</span>
                    {raid.is_remote && <span className="font-pixel text-xs bg-blue-900 text-blue-300 px-2 py-0.5 rounded">Remote</span>}
                  </div>
                  <p className="font-pixel text-xs text-gray-400 mb-2">{raid.location}</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div className="bg-pixel-gold h-2 rounded-full" style={{width: (raid.current_players / raid.max_players * 100) + '%'}}></div>
                  </div>
                  <p className="font-pixel text-xs text-gray-400">{raid.current_players}/{raid.max_players} players</p>
                  {raid.description && <p className="font-pixel text-xs text-gray-500 mt-1">{raid.description}</p>}
                </div>
                <div className="text-right ml-4">
                  <p className="font-pixel text-xs text-pixel-gold mb-2">{raid.host}</p>
                  {raid.current_players < raid.max_players ? (
                    <button className="bg-green-600 text-white font-pixel text-xs px-3 py-1 rounded hover:bg-green-500">Join</button>
                  ) : (
                    <span className="font-pixel text-xs text-red-400">Full</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}