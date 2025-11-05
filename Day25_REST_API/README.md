# Day 25 - RESTful API Development

## Introduction
Build a complete RESTful API with best practices and proper architecture.

## REST Principles

- **Resource-based**: URLs represent resources
- **HTTP Methods**: GET, POST, PUT, PATCH, DELETE
- **Stateless**: Each request is independent
- **Status Codes**: Proper HTTP status codes

## API Structure

```
/api/v1
  /users
    GET    /         - Get all users
    GET    /:id      - Get user by ID
    POST   /         - Create user
    PUT    /:id      - Update user
    DELETE /:id      - Delete user
  /posts
    GET    /         - Get all posts
    GET    /:id      - Get post by ID
    POST   /         - Create post
    PUT    /:id      - Update post
    DELETE /:id      - Delete post
```

## Complete API Example

```tsx
// src/routes/api.ts
import express from 'express';
import userRoutes from './users';
import postRoutes from './posts';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

export default router;

// src/routes/users.ts
import { Router } from 'express';
import { 
  getUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser 
} from '../controllers/userController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { userSchema } from '../schemas/userSchema';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', validate(userSchema), createUser);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, authorize('admin'), deleteUser);

export default router;
```

## Controllers

```tsx
// src/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';
import { ApiResponse } from '../types';

const userService = new UserService();

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};
```

## Error Handling

```tsx
// src/utils/ApiError.ts
export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
```

## Pagination

```tsx
export const getPaginatedUsers = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find().skip(skip).limit(limit);
  const total = await User.countDocuments();

  res.json({
    data: users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
};
```

## Filtering and Sorting

```tsx
export const getFilteredUsers = async (req: Request, res: Response) => {
  const { role, sort, fields } = req.query;

  let query = User.find();

  // Filtering
  if (role) {
    query = query.where('role').equals(role);
  }

  // Sorting
  if (sort) {
    query = query.sort(sort as string);
  }

  // Field selection
  if (fields) {
    query = query.select((fields as string).split(',').join(' '));
  }

  const users = await query;
  res.json({ data: users });
};
```

## Exercises
Build a complete REST API with CRUD operations, pagination, and filtering.

## 🚀 Next Steps
Tomorrow: Authentication and Authorization!
