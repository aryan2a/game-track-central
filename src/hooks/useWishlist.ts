
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface WishlistItem {
  id: string;
  game_id: string;
  user_id: string;
  created_at: string;
}

export const useWishlist = (gameId?: string) => {
  const queryClient = useQueryClient();

  const { data: isWishlisted, isLoading: isCheckingWishlist } = useQuery({
    queryKey: ["wishlist", gameId],
    queryFn: async () => {
      if (!gameId) return false;
      const { data, error } = await supabase
        .from("wishlists")
        .select("*")
        .eq("game_id", gameId)
        .single();

      if (error && error.code !== "PGRST116") {
        toast.error("Error checking wishlist status");
        throw error;
      }

      return !!data;
    },
    enabled: !!gameId,
  });

  const { mutate: toggleWishlist } = useMutation({
    mutationFn: async (gameId: string) => {
      if (isWishlisted) {
        const { error } = await supabase
          .from("wishlists")
          .delete()
          .eq("game_id", gameId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("wishlists")
          .insert([{ game_id: gameId }]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
    },
    onError: () => {
      toast.error("Failed to update wishlist");
    },
  });

  return {
    isWishlisted,
    isLoading: isCheckingWishlist,
    toggleWishlist,
  };
};
