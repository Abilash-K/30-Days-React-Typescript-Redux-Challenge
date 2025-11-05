# Day 20 - Advanced Redux Patterns

## Introduction
Master advanced Redux patterns including selectors, entity adapters, and normalization.

## Reselect and Memoized Selectors

```bash
npm install reselect
```

```tsx
import { createSelector } from '@reduxjs/toolkit';

// Basic selector
const selectTodos = (state: RootState) => state.todos.items;

// Memoized selector
const selectCompletedTodos = createSelector(
  [selectTodos],
  (todos) => todos.filter(todo => todo.completed)
);

const selectTodoById = createSelector(
  [selectTodos, (state: RootState, todoId: number) => todoId],
  (todos, todoId) => todos.find(todo => todo.id === todoId)
);
```

## Entity Adapter

```tsx
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  email: string;
}

const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    userAdded: usersAdapter.addOne,
    usersAdded: usersAdapter.addMany,
    userUpdated: usersAdapter.updateOne,
    userRemoved: usersAdapter.removeOne
  }
});

// Selectors
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
} = usersAdapter.getSelectors((state: RootState) => state.users);
```

## RTK Query

```tsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Post {
  id: number;
  title: string;
  body: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      providesTags: ['Post']
    }),
    getPost: builder.query<Post, number>({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }]
    }),
    createPost: builder.mutation<Post, Omit<Post, 'id'>>({
      query: (post) => ({
        url: 'posts',
        method: 'POST',
        body: post
      }),
      invalidatesTags: ['Post']
    }),
    updatePost: builder.mutation<Post, Post>({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: 'PUT',
        body: post
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }]
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Post']
    })
  })
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation
} = api;
```

## Normalized State

```tsx
interface NormalizedState {
  users: {
    byId: Record<number, User>;
    allIds: number[];
  };
}

const normalize = (users: User[]): NormalizedState['users'] => {
  return users.reduce(
    (acc, user) => ({
      byId: { ...acc.byId, [user.id]: user },
      allIds: [...acc.allIds, user.id]
    }),
    { byId: {}, allIds: [] }
  );
};
```

## Exercises
Implement selectors, entity adapters, and RTK Query.

## 🚀 Next Steps
Tomorrow: Styling in React!
