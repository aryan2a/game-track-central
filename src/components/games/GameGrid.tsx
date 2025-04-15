
import { useState } from "react";
import { GameData } from "./GameCard";
import GameCard from "./GameCard";
import GameDetailDialog from "./GameDetailDialog";

interface GameGridProps {
  games: GameData[];
  title?: string;
  description?: string;
}

export default function GameGrid({ games, title, description }: GameGridProps) {
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);
  
  return (
    <div className="space-y-6">
      {title && (
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {games.map((game) => (
          <GameCard 
            key={game.id} 
            game={game} 
            onClick={() => setSelectedGame(game)}
          />
        ))}
      </div>
      
      <GameDetailDialog 
        game={selectedGame} 
        open={!!selectedGame}
        onOpenChange={() => setSelectedGame(null)}
      />
    </div>
  );
}
