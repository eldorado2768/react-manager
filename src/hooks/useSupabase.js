// src/hooks/useSupabase.js
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

console.log("SUPABASE_URL", process.env.REACT_APP_SUPABASE_URL);
console.log("SUPABASE_ANON_KEY", process.env.REACT_APP_SUPABASE_URL);

const useSupabase = () => {
  const [supabaseClient, setSupabaseClient] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const client = createClient(
      process.env.REACT_APP_SUPABASE_URL,
      process.env.REACT_APP_SUPABASE_ANON_KEY
    );
    setSupabaseClient(client);

    // Optional: Listen to auth state changes (as in the original script)
    client.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      if (event === "SIGNED_IN") {
        console.log("User signed in:", session.user);
      } else if (event === "SIGNED_OUT") {
        console.log("User signed out");
      }
    });
  }, []);

  return { supabase: supabaseClient, supabaseError: error };
};

export default useSupabase;
