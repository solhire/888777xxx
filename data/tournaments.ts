export type TournamentStatus = 'live' | 'coming-soon' | 'maintenance';

export interface TournamentMeta {
  id: string;
  title: string;
  image: string;
  logoOverlay?: string;
  status: TournamentStatus;
  activeTournaments: number;
  totalPrizePool: string;
  rules: string[];
  registeredPlayers: { alias: string; mmr: string }[];
}

export const tournaments: TournamentMeta[] = [
  {
    id: 'valorant',
    title: 'VALORANT',
    image: '/games/valorant.jpg',
    status: 'coming-soon',
    activeTournaments: 0,
    totalPrizePool: '2.5 SOL',
    rules: [
      '5v5 – Best of 3 format',
      'North American servers',
      'Screenshot of scoreboard required',
      'No exploits or macro scripts',
    ],
    registeredPlayers: [],
  },
  {
    id: 'dota2',
    title: 'DOTA 2',
    image: '/games/dota2.jpg',
    status: 'coming-soon',
    activeTournaments: 0,
    totalPrizePool: '3.5 SOL',
    rules: [
      'Captains Mode – Best of 1',
      'SEA & US-West servers',
      'All picks allowed except custom lobbies',
      'Team must check in 15 minutes pre-match',
    ],
    registeredPlayers: [],
  },
  {
    id: 'csgo',
    title: 'CS:GO',
    image: '/games/csgo.jpg',
    status: 'coming-soon',
    activeTournaments: 0,
    totalPrizePool: '2.0 SOL',
    rules: [
      'MR15 – Best of 1',
      'VAC secured lobbies only',
      'Overtime enabled (MR3)',
      'Demo upload required for finals',
    ],
    registeredPlayers: [],
  },
  {
    id: 'lol',
    title: 'LEAGUE OF LEGENDS',
    image: '/games/lol.jpg',
    status: 'coming-soon',
    activeTournaments: 0,
    totalPrizePool: '3.0 SOL',
    rules: [
      'Tournament Draft – Best of 1',
      'NA servers (Chicago)',
      'Pause limit: 5 minutes per team',
      'Cross-region accounts not allowed',
    ],
    registeredPlayers: [],
  },
  {
    id: 'fortnite',
    title: 'FORTNITE',
    image: '/games/fn76.jpg',
    logoOverlay: '/nexilfn.png',
    status: 'coming-soon',
    activeTournaments: 0,
    totalPrizePool: '1.5 SOL',
    rules: [
      'Zero Build – Duos',
      'Kill race format',
      'Replay submission required',
      'No stream sniping',
    ],
    registeredPlayers: [],
  },
  {
    id: 'cod',
    title: 'CALL OF DUTY',
    image: '/games/cod.jpg',
    status: 'coming-soon',
    activeTournaments: 0,
    totalPrizePool: '2.0 SOL',
    rules: [
      'Search & Destroy – Best of 5',
      'Cross-play enabled',
      'Gentleman\'s agreement list enforced',
      'Must stream POV for verification',
    ],
    registeredPlayers: [],
  },
];
