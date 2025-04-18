
import { Search, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import NotificationsMenu from "../notifications/NotificationsMenu";
import UserProfileMenu from "../user/UserProfileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-gaming-darkPurple/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="hidden md:block">
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-gaming-purple">Game</span>Track
            </h1>
          </div>
        </div>

        <div className="hidden md:flex md:w-1/3">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search games..."
              className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <NotificationsMenu />
          <UserProfileMenu />
        </div>
      </div>
    </header>
  );
}
