# Day 29 - Production Best Practices

## Introduction
Learn essential best practices for building production-ready React TypeScript applications.

## Code Organization

### Feature-Based Structure

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── types/
│   ├── users/
│   └── posts/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types/
├── App.tsx
└── index.tsx
```

## TypeScript Best Practices

### Strict Type Checking

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

### Type-Safe Utilities

```tsx
// Type-safe object keys
export const getObjectKeys = <T extends object>(obj: T): (keyof T)[] => {
  return Object.keys(obj) as (keyof T)[];
};

// Type-safe pick
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Type-safe omit
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

## Performance Best Practices

### Code Splitting

```tsx
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
```

### Memoization

```tsx
const ExpensiveComponent = React.memo<Props>(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveOperation(item));
  }, [data]);

  return <div>{processedData}</div>;
});
```

### Virtual Lists for Large Data

```tsx
import { FixedSizeList } from 'react-window';

const LargeList: React.FC<{ items: string[] }> = ({ items }) => (
  <FixedSizeList
    height={600}
    itemCount={items.length}
    itemSize={50}
    width="100%"
  >
    {({ index, style }) => (
      <div style={style}>{items[index]}</div>
    )}
  </FixedSizeList>
);
```

## Security Best Practices

### Input Sanitization

```tsx
import DOMPurify from 'dompurify';

const SafeHTML: React.FC<{ html: string }> = ({ html }) => {
  const sanitized = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
};
```

### Secure API Calls

```tsx
// CSRF Protection
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// Rate Limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);
```

### Environment Variables

```tsx
// Never commit .env files
// Use different .env files for different environments
// Validate environment variables on startup

const requiredEnvVars = ['API_URL', 'JWT_SECRET'];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});
```

## Error Handling

### Global Error Handler

```tsx
const GlobalErrorHandler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
      // Send to error tracking service
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled rejection:', event.reason);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return <>{children}</>;
};
```

## Testing Best Practices

### Test Coverage

```json
{
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.{ts,tsx}",
      "!src/**/*.d.ts",
      "!src/**/*.stories.tsx"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

### Integration Tests

```tsx
describe('User Flow', () => {
  it('should allow user to login and view dashboard', async () => {
    render(<App />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(loginButton);

    expect(await screen.findByText('Dashboard')).toBeInTheDocument();
  });
});
```

## Accessibility

### ARIA Labels

```tsx
<button aria-label="Close dialog" onClick={onClose}>
  <CloseIcon />
</button>

<input
  type="text"
  aria-labelledby="username-label"
  aria-describedby="username-help"
  aria-required="true"
/>
```

### Keyboard Navigation

```tsx
const Dialog: React.FC<Props> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return isOpen ? <div role="dialog" aria-modal="true">...</div> : null;
};
```

## Documentation

### Component Documentation

```tsx
/**
 * Button component with multiple variants
 * 
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click Me
 * </Button>
 * ```
 */
interface ButtonProps {
  /** Button label text */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Button variant style */
  variant?: 'primary' | 'secondary';
  /** Disabled state */
  disabled?: boolean;
}
```

### README Template

```markdown
# Project Name

## Description
Brief description of the project

## Features
- Feature 1
- Feature 2

## Tech Stack
- React 18
- TypeScript 5
- Redux Toolkit
- Node.js
- MongoDB

## Installation
\`\`\`bash
npm install
\`\`\`

## Usage
\`\`\`bash
npm start
\`\`\`

## Testing
\`\`\`bash
npm test
\`\`\`

## License
MIT
```

## Monitoring and Analytics

```tsx
import ReactGA from 'react-ga4';

ReactGA.initialize('GA_MEASUREMENT_ID');

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location]);
};
```

## Bundle Size Optimization

```bash
# Analyze bundle
npm run build -- --stats
npx webpack-bundle-analyzer build/bundle-stats.json
```

## Exercises
Implement all best practices in your application and measure improvements.

## 🚀 Next Steps
Tomorrow: Building a Complete MERN Application!
