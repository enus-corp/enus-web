'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signupUser } from '../../services/auth';
import { SignupPageContainer, LeftPanel, SignupForm, Title, InputRow, InputField, SelectField, SubmitButton, LoginLink, RightPanel, AnimatedShape1, AnimatedShape2, AnimatedShape3, Snackbar } from './styles';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    gender: '',
    age: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ message: string; isVisible: boolean; isError?: boolean }>({
    message: '',
    isVisible: false,
    isError: false
  });
  const router = useRouter();

  // Function to show the snackbar
  const showSnackbar = (message: string, isError: boolean = false) => {
    setSnackbar({ message, isVisible: true, isError });
    // Auto-hide after a few seconds
    setTimeout(() => {
      setSnackbar({ message: '', isVisible: false, isError: false });
    }, 4000); // Hide after 4 seconds
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.firstName || !formData.lastName || !formData.username || !formData.password || !formData.email || !formData.gender || !formData.age) {
      showSnackbar('Please fill in all fields.', true);
      setIsLoading(false);
      return;
    }

    const ageNumber = parseInt(formData.age, 10);
    if (isNaN(ageNumber) || ageNumber <= 0) {
      showSnackbar('Please enter a valid age.', true);
      setIsLoading(false);
      return;
    }

    try {
      await signupUser({...formData, age: ageNumber});
      showSnackbar('Signup successful! Redirecting...');
      setTimeout(() => { router.push('/login') }, 2000);

    } catch (err: unknown) {
      console.error("Signup error:", err);
      if (err instanceof Error) {
        showSnackbar(err.message || 'Signup failed. Please try again.', true);
      } else {
        showSnackbar('An unknown error occurred during signup.', true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignupPageContainer>
      <LeftPanel>
        <SignupForm onSubmit={handleSignup}>
          <Title>Create Account</Title>

          <InputRow>
            <InputField
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
            <InputField
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </InputRow>

          <InputField
            name="username"
            placeholder="Username (8-20 characters)"
            value={formData.username}
            onChange={handleChange}
            disabled={isLoading}
            required
            minLength={8}
            maxLength={20}
          />
          <InputField
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
          <InputField
            name="password"
            type="password"
            placeholder="Password (see requirements)"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            required
            minLength={8}
            title="Password must have at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
          />

          <InputRow>
            <SelectField
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={isLoading}
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </SelectField>
            <InputField
              name="age"
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              disabled={isLoading}
              required
              min="1"
            />
          </InputRow>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </SubmitButton>

          <LoginLink>
            Already have an account? <Link href="/login">Log In</Link>
          </LoginLink>
        </SignupForm>
      </LeftPanel>
      <RightPanel>
        {/* Re-use animation from login */}
        <AnimatedShape1 />
        <AnimatedShape2 />
        <AnimatedShape3 />
      </RightPanel>

      {/* Snackbar component at the bottom */}
      <Snackbar $isVisible={snackbar.isVisible} $isError={snackbar.isError}>
        {snackbar.message}
      </Snackbar>
    </SignupPageContainer>
  );
};

export default SignupPage; 