# Day 23 - Backend Setup - Node.js and Express with TypeScript

## Introduction
Set up a production-ready backend with Node.js, Express, and TypeScript.

## Project Setup

```bash
mkdir server && cd server
npm init -y
npm install express cors dotenv
npm install --save-dev typescript @types/node @types/express @types/cors
npm install --save-dev ts-node nodemon
```

## TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## Express Server

```tsx
// src/server.ts
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

## Router Setup

```tsx
// src/routes/userRoutes.ts
import { Router } from 'express';
import { getUsers, getUserById, createUser } from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);

export default router;
```

## Controllers

```tsx
// src/controllers/userController.ts
import { Request, Response } from 'express';

interface User {
  id: number;
  name: string;
  email: string;
}

export const getUsers = (req: Request, res: Response): void => {
  // Logic to get users
  res.json({ users: [] });
};

export const getUserById = (req: Request<{ id: string }>, res: Response): void => {
  const { id } = req.params;
  // Logic to get user by ID
  res.json({ user: null });
};

export const createUser = (req: Request<{}, {}, User>, res: Response): void => {
  const user = req.body;
  // Logic to create user
  res.status(201).json({ user });
};
```

## Middleware

```tsx
// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
};

// src/middleware/auth.ts
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify token logic
  next();
};
```

## Package.json Scripts

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

## Exercises
Build a complete REST API with routes, controllers, and middleware.

## 🚀 Next Steps
Tomorrow: MongoDB and Mongoose with TypeScript!
