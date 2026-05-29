'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  const handleAuth = async () => {
    setMessage('');
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage(error.message);
      else setMessage('Check your email for confirmation!');
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else setUser(data.user);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) return (<div className="min-h-screen bg-gray-900 flex items-center justify-center"><p className="font-pixel text-pixel-gold">Loading...</p></div>);

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="font-pixel text-2xl text-pixel-gold mb-6 text-center">Trainer Profile</h1>
        {!user ? (
          <div className="bg-gray-800 border-2 border-pixel-gold rounded p-6">
            <div className="flex gap-2 mb-4">
              <button onClick={() => setIsSignUp(false)} className={"font-pixel text-xs px-3 py-2 rounded " + (!isSignUp ? "bg-pixel-gold text-gray-900" : "bg-gray-700 text-gray-300")}>Sign In</button>
              <button onClick={() => setIsSignUp(true)} className={"font-pixel text-xs px-3 py-2 rounded " + (isSignUp ? "bg-pixel-gold text-gray-900" : "bg-gray-700 text-gray-300")}>Sign Up</button>
            </div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-3 p-2 bg-gray-700 border border-gray-600 rounded text-white font-pixel text-xs" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-4 p-2 bg-gray-700 border border-gray-600 rounded text-white font-pixel text-xs" />
            <button onClick={handleAuth} className="w-full bg-pixel-gold text-gray-900 font-pixel text-xs py-2 rounded hover:bg-yellow-400">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
            {message && <p className="font-pixel text-xs mt-3 text-center text-green-400">{message}</p>}
          </div>
        ) : (
          <div className="bg-gray-800 border-2 border-pixel-gold rounded p-6">
            <p className="font-pixel text-xs text-pixel-gold mb-2">Logged in as:</p>
            <p className="font-pixel text-xs text-white mb-4">{user.email}</p>
            <button onClick={handleSignOut} className="w-full bg-red-600 text-white font-pixel text-xs py-2 rounded hover:bg-red-500">Sign Out</button>
          </div>
        )}
      </div>
    </div>
  );
}