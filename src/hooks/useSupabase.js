// src/hooks/useSupabase.js
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../utilities/constants';
import { useEffect, useState } from 'react';

const useSupabase = () => {
    const [supabaseClient, setSupabaseClient] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
            const errorMessage = '⚠️ Please configure your Supabase credentials in src/utils/constants.js';
            console.warn(errorMessage);
            setError(new Error(errorMessage));
        } else {
            const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            setSupabaseClient(client);

            // Optional: Listen to auth state changes (as in the original script)
            client.auth.onAuthStateChange((event, session) => {
                console.log('Auth state changed:', event, session);
                if (event === 'SIGNED_IN') {
                    console.log('User signed in:', session.user);
                } else if (event === 'SIGNED_OUT') {
                    console.log('User signed out');
                }
            });
        }
    }, []);

    return { supabase: supabaseClient, supabaseError: error };
};

export default useSupabase;