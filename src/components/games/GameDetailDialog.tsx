
import { Clock, Gamepad2, Calendar, Trophy, ListChecks, BarChart3, Heart, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { GameData } from "./GameCard";
import { cn } from "@/lib/utils";

interface GameDetailDialogProps {
  game: GameData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function GameDetailDialog({ game, open, onOpenChange }: GameDetailDialogProps) {
  if (!game) return null;

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
            
            {game.achievements && (
              <div className="space-y-1.5">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Trophy className="h-5 w-5 text-gaming-purple" />
                  Achievements
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">{game.achievements.earned}/{game.achievements.total}</span>
                  <span className="text-sm text-muted-foreground">
                    ({Math.round((game.achievements.earned / game.achievements.total) * 100)}%)
                  </span>
                </div>
                <Progress 
                  value={(game.achievements.earned / game.achievements.total) * 100}
                  className="h-2 mt-2"
                />
              </div>
            )}
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
