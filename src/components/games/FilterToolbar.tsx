
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Search, SlidersHorizontal } from "lucide-react";

interface FilterToolbarProps {
  onSearch?: (term: string) => void;
  onFilterChange?: (filters: {
    status: string[];
    platforms: string[];
  }) => void;
}

export default function FilterToolbar({ onSearch, onFilterChange }: FilterToolbarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [platformFilters, setPlatformFilters] = useState<string[]>([]);

  const handleSearch = () => {
    onSearch?.(searchTerm);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilters((current) => {
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      
      onFilterChange?.({
        status: updated,
        platforms: platformFilters,
      });
      
      return updated;
    });
  };

  const handlePlatformFilterChange = (value: string) => {
    setPlatformFilters((current) => {
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      
      onFilterChange?.({
        status: statusFilters,
        platforms: updated,
      });
      
      return updated;
    });
  };
  
  // Example platform options
  const platforms = ["PC", "PlayStation 5", "Xbox Series X", "Nintendo Switch"];

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 md:w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search games..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button variant="outline" onClick={handleSearch}>
          Search
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuCheckboxItem
              checked={statusFilters.includes("playing")}
              onCheckedChange={() => handleStatusFilterChange("playing")}
            >
              Playing
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilters.includes("completed")}
              onCheckedChange={() => handleStatusFilterChange("completed")}
            >
              Completed
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilters.includes("backlog")}
              onCheckedChange={() => handleStatusFilterChange("backlog")}
            >
              Backlog
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilters.includes("abandoned")}
              onCheckedChange={() => handleStatusFilterChange("abandoned")}
            >
              Abandoned
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Platform
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            {platforms.map((platform) => (
              <DropdownMenuCheckboxItem
                key={platform}
                checked={platformFilters.includes(platform)}
                onCheckedChange={() => handlePlatformFilterChange(platform)}
              >
                {platform}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
