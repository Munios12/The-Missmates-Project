import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qccsesqjapcumnwfcxea.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjY3Nlc3FqYXBjdW1ud2ZjeGVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3Nzk4MTYsImV4cCI6MjAxNDM1NTgxNn0.Uk4wq_7NtyYk3GOUZ-DXvJleHzIRfw3IILueJw9o0Us";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
