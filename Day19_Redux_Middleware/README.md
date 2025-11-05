# Day 19 - Redux Middleware and Thunk

## Introduction
Learn about Redux middleware and async operations with Redux Thunk.

## Redux Thunk

Thunk allows writing async logic that interacts with the store.

```tsx
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface Post {
  id: number;
  title: string;
  body: string;
}

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchPosts',
  async () => {
    const response = await fetch('/api/posts');
    return response.json();
  }
);

export const createPost = createAsyncThunk<Post, Omit<Post, 'id'>>(
  'posts/createPost',
  async (postData) => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });
    return response.json();
  }
);

interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    loading: false,
    error: null
  } as PostsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch';
      });
  }
});
```

## Custom Middleware

```tsx
import { Middleware } from '@reduxjs/toolkit';

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next state:', store.getState());
  return result;
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware)
});
```

## Error Handling

```tsx
export const fetchUserWithErrorHandling = createAsyncThunk<
  User,
  number,
  { rejectValue: string }
>(
  'user/fetch',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        return rejectWithValue('Failed to fetch user');
      }
      return response.json();
    } catch (error) {
      return rejectWithValue('Network error');
    }
  }
);
```

## Exercises
Implement async operations, custom middleware, and error handling.

## 🚀 Next Steps
Tomorrow: Advanced Redux Patterns!
