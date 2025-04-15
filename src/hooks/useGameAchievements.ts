
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GameAchievement {
  id: string;
  game_id: string;
  earned: number;
  total: number;
  user_id: string;
}

export const useGameAchievements = (gameId: string) => {
  const queryClient = useQueryClient();

  const { data: achievements, isLoading } = useQuery({
    queryKey: ["achievements", gameId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("game_achievements")
        .select("*")
        .eq("game_id", gameId)
        .single();

      if (error && error.code !== "PGRST116") {
        toast.error("Error loading achievements");
        throw error;
      }

      return data as GameAchievement;
    },
  });

  const { mutate: updateAchievements } = useMutation({
    mutationFn: async ({ earned, total }: { earned: number; total: number }) => {
      if (achievements) {
        // Update existing achievements
        const { error } = await supabase
          .from("game_achievements")
          .update({ earned, total })
          .eq("id", achievements.id);

        if (error) throw error;
      } else {
        // Create new achievements entry
        const { error } = await supabase.from("game_achievements").insert([
          {
            game_id: gameId,
            earned,
            total,
          },
        ]);

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements", gameId] });
      toast.success("Achievements updated successfully");
    },
    onError: () => {
      toast.error("Failed to update achievements");
    },
  });

  return {
    achievements,
    isLoading,
    updateAchievements,
  };
};
