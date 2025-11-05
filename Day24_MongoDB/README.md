# Day 24 - MongoDB and Mongoose with TypeScript

## Introduction
Integrate MongoDB database with Mongoose ODM and TypeScript.

## Setup

```bash
npm install mongoose
npm install --save-dev @types/mongoose
```

## Database Connection

```tsx
// src/config/database.ts
import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};
```

## Mongoose Models

```tsx
// src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please add a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IUser>('User', UserSchema);
```

## CRUD Operations

```tsx
// src/services/userService.ts
import User, { IUser } from '../models/User';

export class UserService {
  // Create
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    const user = await User.create(userData);
    return user;
  }

  // Read
  async getAllUsers(): Promise<IUser[]> {
    const users = await User.find().select('-password');
    return users;
  }

  async getUserById(id: string): Promise<IUser | null> {
    const user = await User.findById(id).select('-password');
    return user;
  }

  // Update
  async updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    const user = await User.findByIdAndUpdate(
      id,
      userData,
      { new: true, runValidators: true }
    );
    return user;
  }

  // Delete
  async deleteUser(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }
}
```

## Population and Relations

```tsx
// src/models/Post.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
}

const PostSchema: Schema = new Schema({
  title: String,
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Get posts with author populated
const posts = await Post.find().populate('author', 'name email');
```

## Exercises
Create models, implement CRUD operations, and set up relationships.

## 🚀 Next Steps
Tomorrow: RESTful API Development!
