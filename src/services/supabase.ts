import { createClient } from "@supabase/supabase-js";


const SUPABASE_URL = "https://osgosbuerqbcwtbzouys.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zZ29zYnVlcnFiY3d0YnpvdXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMjM5OTQsImV4cCI6MjA2NDU5OTk5NH0.j5IjfeBJcSSpeNXULguFTzQNkUvR7YFIK0plZ-7gTiY";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;