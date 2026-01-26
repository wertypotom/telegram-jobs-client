# Unit Tests

Testing isolated React components, hooks, and utilities.

## Tools

- **Vitest** - Test runner
- **React Testing Library** - Component testing
- **@testing-library/user-event** - User interaction simulation

## Setup

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitejs/plugin-react
```

## Component Testing

### Basic Component Test

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const user = userEvent.setup();
    render(<MyComponent />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Clicked')).toBeInTheDocument();
  });
});
```

### Testing Props

```typescript
it('renders with different props', () => {
  const { rerender } = render(<MyComponent count={0} />);
  expect(screen.getByText('Count: 0')).toBeInTheDocument();

  rerender(<MyComponent count={5} />);
  expect(screen.getByText('Count: 5')).toBeInTheDocument();
});
```

### Testing Conditional Rendering

```typescript
it('shows loading state', () => {
  render(<MyComponent isLoading />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

it('shows error state', () => {
  render(<MyComponent error="Failed to load" />);
  expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
});
```

## Hook Testing

### Basic Hook Test

```typescript
import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('increments counter', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
```

### React Query Hook Testing

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFeature } from './useFeature';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useFeature', () => {
  it('fetches data successfully', async () => {
    const { result } = renderHook(() => useFeature(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(expectedData);
  });

  it('handles errors', async () => {
    // Mock API to return error
    const { result } = renderHook(() => useFeature(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeDefined();
  });
});
```

## Form Testing

```typescript
import { useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';

it('validates form input', async () => {
  const user = userEvent.setup();
  render(<MyForm />);

  const emailInput = screen.getByLabelText('Email');
  await user.type(emailInput, 'invalid-email');

  await user.click(screen.getByRole('button', { name: 'Submit' }));

  expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
});

it('submits form successfully', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();

  render(<MyForm onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText('Email'), 'test@example.com');
  await user.type(screen.getByLabelText('Password'), 'password123');
  await user.click(screen.getByRole('button', { name: 'Submit' }));

  expect(onSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123',
  });
});
```

## Mocking

### Mock Functions

```typescript
import { vi } from 'vitest';

it('calls onClick handler', async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(<Button onClick={handleClick}>Click me</Button>);
  await user.click(screen.getByRole('button'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Mock Modules

```typescript
vi.mock('./api', () => ({
  fetchUser: vi.fn(() => Promise.resolve({ id: 1, name: 'Test' })),
}));
```

## Running Tests

```bash
# Run all tests
npx vitest

# Watch mode
npx vitest --watch

# Coverage
npx vitest --coverage

# Run specific file
npx vitest MyComponent.test.tsx
```

## Best Practices

### Do

- ✅ Test behavior, not implementation
- ✅ Use semantic queries (`getByRole`, `getByLabelText`)
- ✅ Test user interactions
- ✅ Test edge cases (empty, null, undefined)
- ✅ Keep tests isolated

### Don't

- ❌ Test implementation details
- ❌ Test third-party libraries
- ❌ Use `getByTestId` unless necessary
- ❌ Test CSS/styles directly
- ❌ Share state between tests

## Common Patterns

### Testing Translations (i18n)

```typescript
it('displays translated text', () => {
  render(<MyComponent />);
  expect(screen.getByText(t('feature.title'))).toBeInTheDocument();
});
```

### Testing Zustand Store

```typescript
import { renderHook, act } from '@testing-library/react';
import { useStore } from './store';

it('updates store state', () => {
  const { result } = renderHook(() => useStore());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```
