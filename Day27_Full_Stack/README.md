# Day 27 - Full Stack Integration

## Introduction
Connect your React frontend with Node.js backend to build a complete MERN application.

## Project Structure

```
mern-app/
├── client/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── types/
│   └── package.json
├── server/                 # Node.js Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.ts
│   └── package.json
└── README.md
```

## API Service Layer

```tsx
// client/src/services/api.ts
import axios, { AxiosInstance } from 'axios';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.api.interceptors.request.use(config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.api.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.api.get<T>(url);
    return response.data;
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response = await this.api.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data: any): Promise<T> {
    const response = await this.api.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.api.delete<T>(url);
    return response.data;
  }
}

export const apiService = new ApiService();
```

## Redux Integration with API

```tsx
// client/src/store/slices/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return await apiService.get<User[]>('/users');
});

export const createUser = createAsyncThunk('users/createUser', async (userData: Omit<User, 'id'>) => {
  return await apiService.post<User>('/users', userData);
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    currentUser: null,
    loading: false,
    error: null
  } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  }
});

export default userSlice.reducer;
```

## Complete Component with API Integration

```tsx
// client/src/components/UserList.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUsers, createUser } from '../store/slices/userSlice';

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleCreateUser = async () => {
    const userData = {
      name: 'New User',
      email: 'newuser@example.com'
    };
    await dispatch(createUser(userData));
    dispatch(fetchUsers());
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Users</h1>
      <button onClick={handleCreateUser}>Add User</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
```

## CORS Configuration

```tsx
// server/src/server.ts
import cors from 'cors';

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

## Environment Variables

```bash
# client/.env
REACT_APP_API_URL=http://localhost:5000/api

# server/.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-app
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

## Error Boundary Integration

```tsx
// client/src/components/ErrorBoundary.tsx
class ErrorBoundary extends React.Component<Props, State> {
  componentDidCatch(error: Error) {
    // Log to error reporting service
    console.error('Error:', error);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

## Real-time Updates with WebSockets

```bash
npm install socket.io socket.io-client
```

```tsx
// server
import { Server } from 'socket.io';

const io = new Server(server, {
  cors: { origin: CLIENT_URL }
});

io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('message', (data) => {
    io.emit('message', data);
  });
});

// client
import io from 'socket.io-client';

const socket = io(API_URL);

socket.on('message', (data) => {
  console.log('Received:', data);
});
```

## Exercises
Build a complete full-stack application with authentication, CRUD operations, and real-time features.

## 🚀 Next Steps
Tomorrow: Deployment and DevOps!
