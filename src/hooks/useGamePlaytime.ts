
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GamePlaytime {
  id: string;
  game_id: string;
  duration: number;
  date_played: string;
  user_id: string;
}

export const useGamePlaytime = (gameId: string) => {
  const queryClient = useQueryClient();

  const { data: playtime, isLoading } = useQuery({
    queryKey: ["playtime", gameId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("game_playtime")
        .select("*")
        .eq("game_id", gameId)
        .order("date_played", { ascending: false });

      if (error) {
        toast.error("Error loading playtime data");
        throw error;
      }

      return data as GamePlaytime[];
    },
  });

  const { mutate: addPlaytime } = useMutation({
    mutationFn: async ({ duration }: { duration: number }) => {
      const { error } = await supabase
        .from("game_playtime")
        .insert([{ game_id: gameId, duration }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playtime", gameId] });
      toast.success("Playtime added successfully");
    },
    onError: () => {
      toast.error("Failed to add playtime");
    },
  });

  return {
    playtime,
    isLoading,
    addPlaytime,
  };
};
