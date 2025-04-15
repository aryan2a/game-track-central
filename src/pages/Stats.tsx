
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Stats() {
  const { data: stats } = useQuery({
    queryKey: ["gaming-stats"],
    queryFn: async () => {
      const [achievementsResponse, playtimeResponse] = await Promise.all([
        supabase.from("game_achievements").select("*"),
        supabase.from("game_playtime").select("*"),
      ]);

      if (achievementsResponse.error) throw achievementsResponse.error;
      if (playtimeResponse.error) throw playtimeResponse.error;

      const totalAchievements = achievementsResponse.data.reduce(
        (acc, game) => {
          acc.earned += game.earned || 0;
          acc.total += game.total || 0;
          return acc;
        },
        { earned: 0, total: 0 }
      );

      const totalPlaytime = playtimeResponse.data.reduce(
        (acc, session) => acc + (session.duration || 0),
        0
      );

      return {
        achievements: totalAchievements,
        playtime: Math.round(totalPlaytime / 60), // Convert to hours
        recentPlaytime: playtimeResponse.data
          .sort((a, b) => new Date(b.date_played).getTime() - new Date(a.date_played).getTime())
          .slice(0, 7)
          .map(session => ({
            date: new Date(session.date_played).toLocaleDateString(),
            hours: session.duration / 60
          }))
      };
    }
  });

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gaming Stats & Insights</h1>
          <p className="text-muted-foreground">
            Track your gaming achievements and progress
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Achievement Progress</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-3xl font-bold">
                {stats?.achievements.earned || 0}/{stats?.achievements.total || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Total achievements earned
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Playtime</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-3xl font-bold">
                {stats?.playtime || 0} hours
              </div>
              <p className="text-xs text-muted-foreground">
                Across all games
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Gaming Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats?.recentPlaytime || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="hours" stroke="#8B5CF6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
