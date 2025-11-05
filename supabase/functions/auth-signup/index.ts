import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, cpf, phone, email, password } = await req.json();

    // Validate input
    if (!fullName || !cpf || !phone || !email || !password) {
      return new Response(
        JSON.stringify({ error: 'Todos os campos são obrigatórios' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client with service role key to bypass RLS
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'Email já cadastrado' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if CPF already exists
    const { data: existingCpf } = await supabase
      .from('users')
      .select('cpf')
      .eq('cpf', cpf)
      .maybeSingle();

    if (existingCpf) {
      return new Response(
        JSON.stringify({ error: 'CPF já cadastrado' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Hash password using Web Crypto API
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const passwordHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Create user
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        full_name: fullName,
        cpf,
        phone,
        email: email.toLowerCase(),
        password_hash: passwordHash,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      return new Response(
        JSON.stringify({ error: 'Erro ao criar conta' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('User created successfully:', newUser.email);

    return new Response(
      JSON.stringify({ 
        success: true,
        user: {
          id: newUser.id,
          email: newUser.email,
          fullName: newUser.full_name,
        }
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in auth-signup:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});