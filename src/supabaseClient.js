import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://brpsmyufxfdtgpoobvgu.supabase.co/";
const supabaseAnonKey = "sb_publishable_Am0v2FHDe3z78HUnPo-Z8w_3YwraMlE";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);