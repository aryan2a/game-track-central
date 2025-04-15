
import { GameData } from "@/components/games/GameCard";

export const mockGames: GameData[] = [
  {
    id: "1",
    title: "Elden Ring",
    coverImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1274&ixlib=rb-4.0.3",
    platform: "PC",
    status: "playing",
    lastPlayed: "Today",
    totalPlaytime: 47,
    achievements: {
      earned: 21,
      total: 42,
    },
    rating: 5,
  },
  {
    id: "2",
    title: "Hogwarts Legacy",
    coverImage: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?auto=format&fit=crop&q=80&w=1364&ixlib=rb-4.0.3",
    platform: "PlayStation 5",
    status: "completed",
    lastPlayed: "Last week",
    totalPlaytime: 36,
    achievements: {
      earned: 38,
      total: 45,
    },
    rating: 4,
  },
  {
    id: "3",
    title: "Cyberpunk 2077",
    coverImage: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=1506&ixlib=rb-4.0.3",
    platform: "PC",
    status: "completed",
    lastPlayed: "2 weeks ago",
    totalPlaytime: 78,
    achievements: {
      earned: 42,
      total: 50,
    },
    rating: 4,
  },
  {
    id: "4",
    title: "The Legend of Zelda: Tears of the Kingdom",
    coverImage: "https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?auto=format&fit=crop&q=80&w=1467&ixlib=rb-4.0.3",
    platform: "Nintendo Switch",
    status: "playing",
    lastPlayed: "Yesterday",
    totalPlaytime: 25,
    achievements: {
      earned: 15,
      total: 30,
    },
    rating: 5,
  },
  {
    id: "5",
    title: "Red Dead Redemption 2",
    coverImage: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=1288&ixlib=rb-4.0.3",
    platform: "Xbox Series X",
    status: "backlog",
    totalPlaytime: 0,
    achievements: {
      earned: 0,
      total: 51,
    },
  },
  {
    id: "6",
    title: "Starfield",
    coverImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1325&ixlib=rb-4.0.3",
    platform: "PC",
    status: "playing",
    lastPlayed: "3 days ago",
    totalPlaytime: 18,
    achievements: {
      earned: 12,
      total: 40,
    },
    rating: 3,
  },
  {
    id: "7",
    title: "Baldur's Gate 3",
    coverImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=1287&ixlib=rb-4.0.3",
    platform: "PC",
    status: "playing",
    lastPlayed: "Today",
    totalPlaytime: 52,
    achievements: {
      earned: 18,
      total: 36,
    },
    rating: 5,
  },
  {
    id: "8",
    title: "Marvel's Spider-Man 2",
    coverImage: "https://images.unsplash.com/photo-1604537372136-89b3dae196e3?auto=format&fit=crop&q=80&w=1469&ixlib=rb-4.0.3",
    platform: "PlayStation 5",
    status: "completed",
    lastPlayed: "Last month",
    totalPlaytime: 23,
    achievements: {
      earned: 32,
      total: 40,
    },
    rating: 4,
  },
];

// Weekly playtime data for chart
export const weeklyPlaytimeData = [
  { name: "Mon", playtime: 2.5 },
  { name: "Tue", playtime: 1.8 },
  { name: "Wed", playtime: 3.2 },
  { name: "Thu", playtime: 5.1 },
  { name: "Fri", playtime: 4.3 },
  { name: "Sat", playtime: 7.5 },
  { name: "Sun", playtime: 6.2 },
];

// Recently played games
export const recentlyPlayed = mockGames.filter(game => 
  game.status === "playing" || game.lastPlayed?.includes("Today") || game.lastPlayed?.includes("Yesterday")
).slice(0, 4);

// Top rated games
export const topRated = [...mockGames]
  .filter(game => game.rating)
  .sort((a, b) => (b.rating || 0) - (a.rating || 0))
  .slice(0, 4);

// Games by status stats
export const gamesByStatus = {
  playing: mockGames.filter(game => game.status === "playing").length,
  completed: mockGames.filter(game => game.status === "completed").length,
  backlog: mockGames.filter(game => game.status === "backlog").length,
  abandoned: mockGames.filter(game => game.status === "abandoned").length,
  total: mockGames.length,
};

// Platform stats
export const platformStats = {
  pc: mockGames.filter(game => game.platform === "PC").length,
  ps5: mockGames.filter(game => game.platform === "PlayStation 5").length,
  xbox: mockGames.filter(game => game.platform === "Xbox Series X").length,
  switch: mockGames.filter(game => game.platform === "Nintendo Switch").length,
};

// Total playtime stats
export const totalPlaytimeStats = {
  hours: mockGames.reduce((total, game) => total + game.totalPlaytime, 0),
  gamesPlayed: mockGames.filter(game => game.totalPlaytime > 0).length,
};

// Achievement stats
export const achievementStats = {
  earned: mockGames.reduce((total, game) => total + (game.achievements?.earned || 0), 0),
  total: mockGames.reduce((total, game) => total + (game.achievements?.total || 0), 0),
};
