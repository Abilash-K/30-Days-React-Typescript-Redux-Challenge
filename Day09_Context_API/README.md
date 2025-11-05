# Day 09 - Context API with TypeScript

## Introduction
Share data across components without prop drilling using Context API.

## Creating Context

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => setUser(user);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
```

## Usage

```tsx
const App: React.FC = () => (
  <UserProvider>
    <Dashboard />
  </UserProvider>
);

const Dashboard: React.FC = () => {
  const { user, logout } = useUser();
  
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

## Exercises
Build theme context, auth context, and settings context.

## 🚀 Next Steps
Tomorrow: useReducer and Complex State!
