import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://orcurstjttnhckjuhyqb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yY3Vyc3RqdHRuaGNranVoeXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxOTY0NDksImV4cCI6MjAzMTc3MjQ0OX0.KTppgBJfs3mpzvM4c3LXfjXwQ8LrkIu8DWUBo6d5NpQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);