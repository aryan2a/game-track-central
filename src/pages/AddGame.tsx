
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(1, "Game title is required"),
  platform: z.string().min(1, "Platform is required"),
  status: z.string().min(1, "Status is required"),
  coverImage: z.string().optional(),
  description: z.string().optional(),
  totalPlaytime: z.coerce.number().min(0, "Playtime must be zero or positive"),
});

type FormValues = z.infer<typeof formSchema>;

const AddGame = () => {
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      platform: "",
      status: "backlog",
      coverImage: "",
      description: "",
      totalPlaytime: 0,
    },
  });

  const onSubmit = (data: FormValues) => {
    // In a real app, this would save to a backend/database
    console.log("New game data:", data);
    toast.success("Game added successfully!");
    
    // Navigate back to library
    setTimeout(() => {
      navigate("/library");
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Game</h1>
          <p className="text-muted-foreground">
            Add a new game to your collection
          </p>
        </div>

        <div className="mx-auto max-w-2xl rounded-lg border border-border bg-card p-6 shadow-sm">
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter game title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="PC">PC</SelectItem>
                          <SelectItem value="PlayStation 5">PlayStation 5</SelectItem>
                          <SelectItem value="Xbox Series X">Xbox Series X</SelectItem>
                          <SelectItem value="Nintendo Switch">Nintendo Switch</SelectItem>
                          <SelectItem value="PlayStation 4">PlayStation 4</SelectItem>
                          <SelectItem value="Xbox One">Xbox One</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="playing">Currently Playing</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="backlog">In Backlog</SelectItem>
                          <SelectItem value="abandoned">Abandoned</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter image URL (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a brief description (optional)"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="totalPlaytime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Playtime (hours)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/library")}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-gaming-purple hover:bg-gaming-purple/90">
                  Add Game
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddGame;
