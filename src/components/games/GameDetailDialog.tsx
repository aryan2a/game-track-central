import { Clock, Gamepad2, Calendar, Trophy, ListChecks, BarChart3, Heart, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { GameData } from "./GameCard";
import { cn } from "@/lib/utils";
import { useGameAchievements } from "@/hooks/useGameAchievements";
import { useState } from "react";

interface GameDetailDialogProps {
  game: GameData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function GameDetailDialog({ game, open, onOpenChange }: GameDetailDialogProps) {
  if (!game) return null;

  const { achievements, updateAchievements } = useGameAchievements(game.id);
  const [isUpdating, setIsUpdating] = useState(false);
  const [earnedCount, setEarnedCount] = useState(achievements?.earned || 0);
  const [totalCount, setTotalCount] = useState(achievements?.total || 0);

  const handleUpdateAchievements = () => {
    setIsUpdating(false);
    updateAchievements({ earned: earnedCount, total: totalCount });
  };

  const statusColors = {
    playing: "bg-gaming-success text-white",
    completed: "bg-gaming-purple text-white",
    backlog: "bg-gaming-secondary text-white",
    abandoned: "bg-gaming-warning text-white",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{game.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="aspect-video overflow-hidden rounded-lg">
            <img
              src={game.coverImage || "https://placehold.co/800x450?text=No+Image"}
              alt={game.title}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <Badge className={cn(statusColors[game.status])}>
              {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
            </Badge>
            <div className="flex items-center gap-1.5 text-sm">
              <Gamepad2 className="h-4 w-4 text-muted-foreground" />
              <span>{game.platform}</span>
            </div>
            {game.lastPlayed && (
              <div className="flex items-center gap-1.5 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Last played: {game.lastPlayed}</span>
              </div>
            )}
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <h3 className="flex items-center gap-2 font-semibold">
                <Clock className="h-5 w-5 text-gaming-purple" />
                Playtime
              </h3>
              <p className="text-xl font-bold">
                {game.totalPlaytime} {game.totalPlaytime === 1 ? 'hour' : 'hours'}
              </p>
              <Button variant="outline" size="sm" className="gap-1.5 mt-2">
                <Clock className="h-4 w-4" />
                Log Time
              </Button>
            </div>
            
            <div className="space-y-1.5">
              <h3 className="flex items-center gap-2 font-semibold">
                <Trophy className="h-5 w-5 text-gaming-purple" />
                Achievements
              </h3>
              {isUpdating ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className="w-20 rounded-md border px-2 py-1"
                      value={earnedCount}
                      onChange={(e) => setEarnedCount(Number(e.target.value))}
                      min={0}
                    />
                    <span>/</span>
                    <input
                      type="number"
                      className="w-20 rounded-md border px-2 py-1"
                      value={totalCount}
                      onChange={(e) => setTotalCount(Number(e.target.value))}
                      min={0}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleUpdateAchievements}>
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsUpdating(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">
                      {achievements?.earned || 0}/{achievements?.total || 0}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({achievements?.total ? Math.round((achievements.earned / achievements.total) * 100) : 0}%)
                    </span>
                  </div>
                  <Progress
                    value={achievements?.total ? (achievements.earned / achievements.total) * 100 : 0}
                    className="h-2 mt-2"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 mt-2"
                    onClick={() => setIsUpdating(true)}
                  >
                    <Trophy className="h-4 w-4" />
                    Update Achievements
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <Separator />
          
          {game.rating && (
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Your Rating:</h3>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "h-5 w-5",
                      i < game.rating! ? "fill-gaming-warning text-gaming-warning" : "text-muted-foreground"
                    )} 
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            <Button className="gap-1.5">
              <ListChecks className="h-4 w-4" />
              Edit Details
            </Button>
            <Button variant="outline" className="gap-1.5">
              <BarChart3 className="h-4 w-4" />
              View Stats
            </Button>
            <Button variant="ghost" className="gap-1.5 text-gaming-warning">
              <Heart className="h-4 w-4" />
              Add to Favorites
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
