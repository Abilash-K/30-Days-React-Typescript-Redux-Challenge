// Basic Types in TypeScript

// Primitive Types
export const message: string = "Hello, TypeScript!";
export const count: number = 42;
export const isActive: boolean = true;
export const nothing: null = null;
export const notDefined: undefined = undefined;

// Arrays
export const numbers: number[] = [1, 2, 3, 4, 5];
export const names: Array<string> = ["Alice", "Bob", "Charlie"];

// Tuples
export const person: [string, number] = ["John", 30];

// Enums
export enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

// Interfaces
export interface User {
  id: number;
  name: string;
  email: string;
  isAdmin?: boolean; // Optional property
  readonly createdAt: Date; // Readonly property
}

export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

// Type Aliases
export type ID = string | number;
export type Status = "pending" | "active" | "inactive";

// Function Types
export function greet(name: string): string {
  return `Hello, ${name}!`;
}

export const add = (a: number, b: number): number => a + b;

export const multiply = (a: number, b: number): number => {
  return a * b;
};

// Function with optional parameters
export function introduce(name: string, age?: number): string {
  if (age) {
    return `My name is ${name} and I am ${age} years old.`;
  }
  return `My name is ${name}.`;
}

// Function with default parameters
export function createUser(name: string, role: string = "user"): User {
  return {
    id: Math.floor(Math.random() * 1000),
    name,
    email: `${name.toLowerCase()}@example.com`,
    isAdmin: role === "admin",
    createdAt: new Date()
  };
}

// Union Types
export type Result = string | number | boolean;

export function displayResult(result: Result): void {
  console.log(`Result: ${result}`);
}

// Intersection Types
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

export type Person = HasName & HasAge;

export const createPerson = (name: string, age: number): Person => {
  return { name, age };
};

// Generic Types
export function identity<T>(arg: T): T {
  return arg;
}

export function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

// Generic Interface
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export const userResponse: ApiResponse<User> = {
  data: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    createdAt: new Date()
  },
  status: 200,
  message: "Success"
};

// Classes
export class Calculator {
  private result: number = 0;

  add(value: number): this {
    this.result += value;
    return this;
  }

  subtract(value: number): this {
    this.result -= value;
    return this;
  }

  getResult(): number {
    return this.result;
  }

  reset(): void {
    this.result = 0;
  }
}

// Usage examples
export const exampleUsage = () => {
  // Basic types
  const msg = greet("TypeScript");
  console.log(msg);

  // Arrays
  const firstNumber = getFirstElement(numbers);
  const firstName = getFirstElement(names);

  // Objects
  const user = createUser("Alice", "admin");
  console.log(user);

  // Classes
  const calc = new Calculator();
  const result = calc.add(5).subtract(2).getResult(); // 3
  console.log(result);

  return {
    msg,
    firstNumber,
    firstName,
    user,
    result
  };
};
