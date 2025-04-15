
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function AddGameButton() {
  return (
    <Link to="/add-game">
      <Button className="gap-2 bg-gaming-purple hover:bg-gaming-purple/90 text-white">
        <Plus className="h-4 w-4" />
        Add New Game
      </Button>
    </Link>
  );
}
