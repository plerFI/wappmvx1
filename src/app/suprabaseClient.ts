import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://asvwoiytyipqchnbpwvi.supabase.co"; // Ersetze mit deiner URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzdndvaXl0eWlwcWNobmJwd3ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyODIwOTgsImV4cCI6MjA1Njg1ODA5OH0.6BBxVnSTIecRJMEpD4b8fytBM9IaD-XOar31MZmgXak"; // Ersetze mit deinem API-Schlüssel

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
