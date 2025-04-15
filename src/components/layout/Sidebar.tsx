
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { 
  Home, 
  LayoutGrid, 
  Trophy, 
  Clock, 
  BarChart3, 
  Heart, 
  Settings, 
  Plus
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">
            <span className="text-gaming-purple">Game</span>Track
          </h2>
          <div className="space-y-1">
            <Button 
              asChild 
              variant="secondary" 
              className="w-full justify-start gap-2 bg-gaming-purple hover:bg-gaming-purple/90 text-white"
            >
              <Link to="/add-game">
                <Plus className="h-4 w-4" />
                Add New Game
              </Link>
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-10rem)] px-2">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Navigation</h2>
              <div className="space-y-1">
                <Button asChild variant="ghost" className="w-full justify-start gap-2">
                  <Link to="/">
                    <Home className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start gap-2">
                  <Link to="/library">
                    <LayoutGrid className="h-4 w-4" />
                    Game Library
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start gap-2">
                  <Link to="/achievements">
                    <Trophy className="h-4 w-4" />
                    Achievements
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start gap-2">
                  <Link to="/playtime">
                    <Clock className="h-4 w-4" />
                    Playtime
                  </Link>
                </Button>
              </div>
            </div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Discover</h2>
              <div className="space-y-1">
                <Button asChild variant="ghost" className="w-full justify-start gap-2">
                  <Link to="/stats">
                    <BarChart3 className="h-4 w-4" />
                    Stats & Insights
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start gap-2">
                  <Link to="/wishlist">
                    <Heart className="h-4 w-4" />
                    Wishlist
                  </Link>
                </Button>
              </div>
            </div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Settings</h2>
              <div className="space-y-1">
                <Button asChild variant="ghost" className="w-full justify-start gap-2">
                  <Link to="/settings">
                    <Settings className="h-4 w-4" />
                    Account Settings
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
