'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const sampleTrades = [
    { id: '1', pokemon_offered: 'Tapu Fini', pokemon_wanted: 'Tapu Koko', cp_offered: 1632, cp_wanted: 1730, description: 'New from raids - looking for other Tapus. Best friend trade preferred (800 dust)', is_shiny: false, is_legendary: true, username: 'TrainerAsh', created_at: '2026-05-29' },
    { id: '2', pokemon_offered: 'Shiny Charizard', pokemon_wanted: 'Shiny Dragonite', cp_offered: 2889, cp_wanted: 3792, description: 'CD shiny for CD shiny - registered trade 800 dust at best friends', is_shiny: true, is_legendary: false, username: 'MistyWater', created_at: '2026-05-28' },
    { id: '3', pokemon_offered: 'Dialga', pokemon_wanted: 'Palkia', cp_offered: 4038, cp_wanted: 3991, description: 'Both registered legendaries - 800 stardust at best friend', is_shiny: false, is_legendary: true, username: 'BrockRock', created_at: '2026-05-27' },
    { id: '4', pokemon_offered: 'Larvitar', pokemon_wanted: 'Electabuzz', cp_offered: 594, cp_wanted: 1333, description: 'From 1-star raids today - just need dex entry. 100 dust', is_shiny: false, is_legendary: false, username: 'NewTrainer42', created_at: '2026-05-29' },
  ];

export default function TradesPage() {
  const [trades, setTrades] = useState(sampleTrades);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({ pokemon_offered: '', pokemon_wanted: '', cp_offered: '', cp_wanted: '', description: '', is_shiny: false, is_legendary: false });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    loadTrades();
  }, []);

  const loadTrades = async () => {
    const { data } = await supabase.from('trades').select('*').order('created_at', { ascending: false });
    if (data && data.length > 0) setTrades(data);
  };

  const handleSubmit = async () => {
    if (!user) { alert('Please sign in first'); return; }
    const { error } = await supabase.from('trades').insert([{ ...form, cp_offered: Number(form.cp_offered), cp_wanted: Number(form.cp_wanted), user_id: user.id, username: user.email.split('@')[0] }]);
    if (!error) { setShowForm(false); loadTrades(); setForm({ pokemon_offered: '', pokemon_wanted: '', cp_offered: '', cp_wanted: '', description: '', is_shiny: false, is_legendary: false }); }
  };

  const filtered = trades.filter(t => {
    if (filter === 'shiny') return t.is_shiny;
    if (filter === 'legendary') return t.is_legendary;
    return true;
  });

  const filters = ['all', 'shiny', 'legendary'];
  const filterLabels = { all: 'All Trades', shiny: 'Shiny', legendary: 'Legendary' };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-pixel text-2xl text-pixel-gold">Trade Board</h1>
          <button onClick={() => { if (!user) { alert('Sign in first'); return; } setShowForm(!showForm); }} className="bg-pixel-gold text-gray-900 font-pixel text-xs px-4 py-2 rounded hover:bg-yellow-400">{showForm ? 'Cancel' : '+ New Trade'}</button>
        </div>
        {showForm && (
          <div className="bg-gray-800 border-2 border-pixel-gold rounded p-4 mb-6">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input placeholder="Pokemon Offered" value={form.pokemon_offered} onChange={(e) => setForm({...form, pokemon_offered: e.target.value})} className="p-2 bg-gray-700 border border-gray-600 rounded text-white font-pixel text-xs" />
              <input placeholder="Pokemon Wanted" value={form.pokemon_wanted} onChange={(e) => setForm({...form, pokemon_wanted: e.target.value})} className="p-2 bg-gray-700 border border-gray-600 rounded text-white font-pixel text-xs" />
              <input placeholder="CP Offered" type="number" value={form.cp_offered} onChange={(e) => setForm({...form, cp_offered: e.target.value})} className="p-2 bg-gray-700 border border-gray-600 rounded text-white font-pixel text-xs" />
              <input placeholder="CP Wanted" type="number" value={form.cp_wanted} onChange={(e) => setForm({...form, cp_wanted: e.target.value})} className="p-2 bg-gray-700 border border-gray-600 rounded text-white font-pixel text-xs" />
            </div>
            <input placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 rounded text-white font-pixel text-xs" />
            <div className="flex gap-4 mb-3">
              <label className="font-pixel text-xs text-gray-300 flex items-center gap-2"><input type="checkbox" checked={form.is_shiny} onChange={(e) => setForm({...form, is_shiny: e.target.checked})} /> Shiny</label>
              <label className="font-pixel text-xs text-gray-300 flex items-center gap-2"><input type="checkbox" checked={form.is_legendary} onChange={(e) => setForm({...form, is_legendary: e.target.checked})} /> Legendary</label>
            </div>
            <button onClick={handleSubmit} className="bg-green-600 text-white font-pixel text-xs px-4 py-2 rounded hover:bg-green-500">Submit Trade</button>
          </div>
        )}
        <div className="flex gap-2 mb-6">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={"font-pixel text-xs px-3 py-2 rounded " + (filter === f ? "bg-pixel-gold text-gray-900" : "bg-gray-700 text-gray-300")}>{filterLabels[f]}</button>
          ))}
        </div>
        <div className="space-y-4">
          {filtered.map((trade) => (
            <div key={trade.id} className="bg-gray-800 border-2 border-gray-700 rounded p-4 hover:border-pixel-gold">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-pixel text-sm text-white">{trade.pokemon_offered}</span>
                    <span className="font-pixel text-xs text-pixel-gold">{"\u2192"}</span>
                    <span className="font-pixel text-sm text-white">{trade.pokemon_wanted}</span>
                  </div>
                  <div className="flex gap-3 text-xs font-pixel text-gray-400">
                    <span>CP {trade.cp_offered} / {trade.cp_wanted}</span>
                    {trade.is_shiny && <span className="text-yellow-400">Shiny</span>}
                    {trade.is_legendary && <span className="text-purple-400">Legendary</span>}
                  </div>
                  {trade.description && <p className="font-pixel text-xs text-gray-500 mt-2">{trade.description}</p>}
                </div>
                <div className="text-right">
                  <p className="font-pixel text-xs text-pixel-gold">{trade.username}</p>
                  <p className="font-pixel text-xs text-gray-500">{trade.created_at}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}