// Script to create a test user in Supabase
const { createClient } = require('@supabase/supabase-js');

// Supabase connection details from .env.local
const supabaseUrl = 'https://cuuxtzzwbxazftcyjqol.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1dXh0enp3YnhhemZ0Y3lqcW9sIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzUzNDkwNSwiZXhwIjoyMDU5MTEwOTA1fQ.ySdyzlhWl3fgvc3LURC9LUuwIdfE6-9OmOI5iLmsvfs';

// Test user credentials
const testEmail = 'testuser@example.com';
const testPassword = 'Password123!';

async function createTestUser() {
  // Initialize Supabase client
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // Create user
    const { data, error } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true // Auto-confirm email
    });
    
    if (error) {
      console.error('Error creating user:', error.message);
    } else {
      console.log('Test user created successfully!');
      console.log('Email:', testEmail);
      console.log('Password:', testPassword);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createTestUser(); 