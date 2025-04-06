
# Adding Users to Supabase for Authentication

This document explains how to add users to your Supabase project for authentication purposes.

## Methods to Add Users

### 1. Sign Up through the Application

The most common way is to let users sign up through your application:

```javascript
// Example sign-up function
const signUp = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      // You can also add optional data
      options: {
        data: {
          first_name: 'John',
          last_name: 'Doe',
          role: 'customer'
        }
      }
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};
```

### 2. Using the Supabase Dashboard

You can manually add users through the Supabase Dashboard:

1. Go to your Supabase project dashboard
2. Navigate to "Authentication" > "Users"
3. Click "Add User"
4. Enter the user's email and password
5. Click "Create User"

### 3. Using the Supabase Admin API

For server-side operations or bulk user creation, you can use the Admin API:

```javascript
// This should only be used in a secure server environment
// NEVER expose your service_role key in client-side code
const adminClient = createClient(
  'https://your-project.supabase.co',
  'your-service-role-key'
);

const createUser = async (email, password) => {
  try {
    const { data, error } = await adminClient.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
```

## Getting the Current User

To get the current authenticated user in your application:

```javascript
// Get the current session and user
const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) throw error;
    
    return data.user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};
```

## Setting Up an Auth Listener

To listen for authentication changes:

```javascript
// Set up in a useEffect or component initialization
const { data: { subscription } } = supabase.auth.onAuthStateChange(
  (event, session) => {
    // Update your app state based on auth changes
    if (event === 'SIGNED_IN') {
      setUser(session?.user ?? null);
      // Do something after sign in
    } else if (event === 'SIGNED_OUT') {
      setUser(null);
      // Do something after sign out
    }
  }
);

// Clean up the subscription when done
return () => subscription.unsubscribe();
```

## Important Considerations

1. **Security**: Never expose your service_role key in client-side code
2. **Email Verification**: By default, Supabase requires email verification
   - You can disable this in the Supabase Dashboard under Authentication > Settings
3. **Password Requirements**: Default minimum length is 6 characters
4. **Rate Limiting**: Supabase implements rate limiting to prevent abuse
5. **JWT Tokens**: Authentication uses JWT tokens that expire (default is 1 hour)
   - Refresh tokens are used to get new access tokens
