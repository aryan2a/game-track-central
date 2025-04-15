
import { Clock, Star, Trophy } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";

export interface GameData {
  id: string;
  title: string;
  coverImage: string;
  platform: string;
  status: "playing" | "completed" | "backlog" | "abandoned";
  lastPlayed?: string;
  totalPlaytime: number;
  achievements?: {
    earned: number;
    total: number;
  };
  rating?: number;
}

interface GameCardProps {
  game: GameData;
  onClick?: () => void;
}

export default function GameCard({ game, onClick }: GameCardProps) {
  const statusColors = {
    playing: "bg-gaming-success text-white",
    completed: "bg-gaming-purple text-white",
    backlog: "bg-gaming-secondary text-white",
    abandoned: "bg-gaming-warning text-white",
  };

  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-md hover:shadow-gaming-purple/20 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          src={game.coverImage || "https://placehold.co/400x225?text=No+Image"}
          alt={game.title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
        <Badge className={cn("absolute right-2 top-2", statusColors[game.status])}>
          {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="line-clamp-1 text-lg font-bold">{game.title}</h3>
        <p className="text-sm text-muted-foreground">{game.platform}</p>
        
        <div className="mt-3 flex items-center gap-1">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            {game.totalPlaytime > 0 
              ? `${game.totalPlaytime} ${game.totalPlaytime === 1 ? 'hour' : 'hours'}`
              : 'Not played yet'}
          </span>
        </div>
        
        {game.achievements && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-sm mb-1">
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4 text-gaming-purple" />
                <span>Achievements</span>
              </div>
              <span className="text-muted-foreground">
                {game.achievements.earned}/{game.achievements.total}
              </span>
            </div>
            <Progress 
              value={(game.achievements.earned / game.achievements.total) * 100} 
              className="h-2 bg-muted" 
            />
          </div>
        )}
      </CardContent>
      
      {game.rating && (
        <CardFooter className="bg-muted/30 p-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "h-4 w-4",
                  i < game.rating! ? "fill-gaming-warning text-gaming-warning" : "text-muted-foreground"
                )} 
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {game.lastPlayed ? `Last played: ${game.lastPlayed}` : ''}
          </span>
        </CardFooter>
      )}
    </Card>
  );
}
