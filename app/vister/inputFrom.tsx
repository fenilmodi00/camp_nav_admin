"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from "@/utils/supabase/supabaseClient"; // Import from `browser` because it's a client-side component.
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  longitude: z.string().refine(value => !isNaN(parseFloat(value)), {
    message: "Longitude must be a valid number.",
  }),
  latitude: z.string().refine(value => !isNaN(parseFloat(value)), {
    message: "Latitude must be a valid number.",
  }),
  checkpointName: z.string().min(1, {
    message: "Checkpoint name is required.",
  }),
});

// const supabase = createClient();

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      longitude: "",
      latitude: "",
      checkpointName: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { error } = await supabase.from("admin_path_visit").insert([
        {
          name: data.username,
          longitude: parseFloat(data.longitude),
          latitude: parseFloat(data.latitude),
          checkpoint_name: data.checkpointName,
        },
      ]);

      if (error) {
        console.error("Supabase insertion error:", error);
        throw error;
      }

      toast({
        title: "Data submitted successfully",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error: any) {
      toast({
        title: "Error submitting data",
        description: error.message,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input inputMode="decimal" placeholder="24.5646653" {...field} />
              </FormControl>
              <FormDescription>
                Y-axis on Earth.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input inputMode="decimal" placeholder="-84.6478368743" {...field} />
              </FormControl>
              <FormDescription>
                X-axis on Earth.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="checkpointName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Checkpoint Name</FormLabel>
              <FormControl>
                <Input inputMode="text" placeholder="L-Section seating" {...field} />
              </FormControl>
              <FormDescription>
                Checkpoint description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
