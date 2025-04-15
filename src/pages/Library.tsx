
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import GameGrid from "@/components/games/GameGrid";
import FilterToolbar from "@/components/games/FilterToolbar";
import AddGameButton from "@/components/games/AddGameButton";
import { mockGames } from "@/data/mockData";
import { GameData } from "@/components/games/GameCard";

const Library = () => {
  const [filteredGames, setFilteredGames] = useState<GameData[]>(mockGames);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredGames(mockGames);
      return;
    }
    
    const results = mockGames.filter(game => 
      game.title.toLowerCase().includes(term.toLowerCase()) ||
      game.platform.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredGames(results);
  };

  const handleFilterChange = (filters: {
    status: string[];
    platforms: string[];
  }) => {
    let results = [...mockGames];
    
    if (filters.status.length > 0) {
      results = results.filter(game => 
        filters.status.includes(game.status)
      );
    }
    
    if (filters.platforms.length > 0) {
      results = results.filter(game => 
        filters.platforms.includes(game.platform)
      );
    }
    
    if (searchTerm) {
      results = results.filter(game => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.platform.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredGames(results);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Game Library</h1>
            <p className="text-muted-foreground">
              Manage and browse your game collection
            </p>
          </div>
          <AddGameButton />
        </div>

        <FilterToolbar 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />

        {filteredGames.length > 0 ? (
          <GameGrid games={filteredGames} />
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed border-gaming-secondary p-12 text-center">
            <h3 className="text-lg font-medium">No games found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Library;
