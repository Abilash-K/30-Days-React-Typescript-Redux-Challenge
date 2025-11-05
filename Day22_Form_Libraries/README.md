# Day 22 - Form Libraries (React Hook Form)

## Introduction
Build powerful forms with validation using React Hook Form and Yup.

## React Hook Form

```bash
npm install react-hook-form
npm install yup @hookform/resolvers
```

## Basic Form

```tsx
import { useForm } from 'react-hook-form';

interface FormData {
  username: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username', { required: 'Username is required' })} />
      {errors.username && <span>{errors.username.message}</span>}

      <input 
        {...register('email', { 
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Invalid email'
          }
        })} 
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input 
        type="password"
        {...register('password', { 
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        })} 
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Register</button>
    </form>
  );
};
```

## With Yup Validation

```tsx
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  username: yup.string().required('Username is required').min(3),
  email: yup.string().required('Email is required').email(),
  password: yup.string().required('Password is required').min(6)
}).required();

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
};
```

## Controller for Custom Components

```tsx
import { Controller } from 'react-hook-form';
import Select from 'react-select';

const MyForm: React.FC = () => {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={countryOptions}
          />
        )}
      />
    </form>
  );
};
```

## Exercises
Build complex forms with validation and custom components.

## 🚀 Next Steps
Tomorrow: Backend Setup with Node.js and Express!
