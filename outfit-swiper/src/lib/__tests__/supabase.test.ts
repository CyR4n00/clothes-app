import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock the dependencies
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({})),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('Supabase Client', () => {
  it('should initialize createClient with the correct arguments', () => {
    // Require the module to trigger the initialization
    require('../supabase');

    // Assert that the module was imported and the mock is set up correctly
    expect(createClient).toHaveBeenCalledTimes(1);

    // The first argument should be the URL
    expect(createClient).toHaveBeenCalledWith(
      'https://your-project.supabase.co',
      'your-anon-key',
      {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      }
    );
  });
});
