import { createSlice } from '@reduxjs/toolkit';

const storedToken = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
const storedUser = typeof localStorage !== 'undefined' ? localStorage.getItem('user') : null;

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload
        try { localStorage.setItem('user', JSON.stringify(action.payload)); } catch {}
      },
      setToken: (state, action) => {
        state.token = action.payload
        try { localStorage.setItem('token', action.payload ?? ''); } catch {}
      },

     setLoading: (state, action) => {
         state.loading = action.payload
      },

      setError: (state, action) => {
        
        state.error = action.payload
      },

      logout: (state) => {
        state.user = null
        state.token = null
        state.error = null
        state.loading = false
        try {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        } catch {}
      }

  }

});

export const {setUser, setLoading,setToken,setError, logout} = 
  authSlice.actions

export default authSlice.reducer;
