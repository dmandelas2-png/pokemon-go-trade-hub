export type Team = 'mystic' | 'valor' | 'instinct';
export type TradeType = 'standard' | 'special' | 'lucky';
export type TradeStatus = 'open' | 'pending' | 'completed' | 'cancelled';
export type RaidStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';
export type RequestStatus = 'pending' | 'accepted' | 'rejected';
export type FriendStatus = 'pending' | 'accepted' | 'blocked';
export type MessageContext = 'trade' | 'raid' | 'direct';

export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  trainer_code: string | null;
  team: Team | null;
  level: number | null;
  bio: string | null;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  is_online: boolean;
  last_seen: string;
  created_at: string;
  updated_at: string;
}

export interface TradeListing {
  id: string;
  user_id: string;
  pokemon_offered: string;
  pokemon_offered_shiny: boolean;
  pokemon_wanted: string;
  pokemon_wanted_shiny: boolean;
  description: string | null;
  stardust_cost: string | null;
  trade_type: TradeType;
  status: TradeStatus;
  location: string | null;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
}

export interface TradeRequest {
  id: string;
  listing_id: string;
  requester_id: string;
  message: string | null;
  status: RequestStatus;
  created_at: string;
  profiles?: Profile;
}

export interface RaidListing {
  id: string;
  host_id: string;
  pokemon_name: string;
  raid_tier: number;
  is_mega: boolean;
  is_shadow: boolean;
  location: string;
  latitude: number | null;
  longitude: number | null;
  start_time: string;
  end_time: string | null;
  max_players: number;
  current_players: number;
  is_remote: boolean;
  description: string | null;
  status: RaidStatus;
  created_at: string;
  profiles?: Profile;
}

export interface RaidParticipant {
  id: string;
  raid_id: string;
  user_id: string;
  status: string;
  joined_at: string;
  profiles?: Profile;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  context_type: MessageContext;
  context_id: string | null;
  created_at: string;
}

export interface Friend {
  id: string;
  user_id: string;
  friend_id: string;
  status: FriendStatus;
  created_at: string;
  profiles?: Profile;
}

export interface LeekDuckEvent {
  name: string;
  eventType: string;
  heading: string;
  link: string;
  image: string;
  start: string;
  end: string;
  extraData?: Record<string, unknown>;
}

export interface LeekDuckRaidBoss {
  name: string;
  tier: number;
  type: string[];
  shinyAvailable: boolean;
  image: string;
}
