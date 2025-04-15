
import { BarChart3, Clock, Gamepad2, Trophy } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import GameGrid from "@/components/games/GameGrid";
import StatsCard from "@/components/dashboard/StatsCard";
import PlaytimeChart from "@/components/dashboard/PlaytimeChart";
import { 
  recentlyPlayed, 
  topRated, 
  weeklyPlaytimeData, 
  totalPlaytimeStats, 
  gamesByStatus, 
  achievementStats 
} from "@/data/mockData";

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to GameTrack Central! Here's an overview of your gaming activity.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Playtime"
            value={`${totalPlaytimeStats.hours} hours`}
            icon={<Clock />}
            description={`Across ${totalPlaytimeStats.gamesPlayed} games`}
            trend={{ value: 12, positive: true }}
          />
          <StatsCard
            title="Game Collection"
            value={gamesByStatus.total}
            icon={<Gamepad2 />}
            description={`${gamesByStatus.playing} currently playing`}
          />
          <StatsCard
            title="Achievements Earned"
            value={achievementStats.earned}
            icon={<Trophy />}
            description={`Out of ${achievementStats.total} total`}
            trend={{ value: 8, positive: true }}
          />
          <StatsCard
            title="Completion Rate"
            value={`${Math.round((gamesByStatus.completed / gamesByStatus.total) * 100)}%`}
            icon={<BarChart3 />}
            description={`${gamesByStatus.completed} games completed`}
          />
        </div>

        <PlaytimeChart data={weeklyPlaytimeData} />

        <GameGrid 
          games={recentlyPlayed}
          title="Recently Played"
          description="Your recently played games"
        />

        <GameGrid 
          games={topRated}
          title="Your Top Rated"
          description="Games you've rated highest"
        />
      </div>
    </MainLayout>
  );
};

export default Index;
