import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

// Create a single Supabase client for interacting with your database
export const supabase = createClient<Database>(
    'https://ilmxjocypdlyawxanmea.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsbXhqb2N5cGRseWF3eGFubWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgwNDcxNTYsImV4cCI6MjA0MzYyMzE1Nn0.yl0_EruWEC9Juk4_Vk2Qo9AzTrOgwjy07o8peNdHOpM'
  );