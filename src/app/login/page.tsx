'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser, oauthLogin } from '../../services/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { LoginPageContainer, LeftPanel, LoginForm, Title, InputField, InputWrapper, PasswordToggleButton, SubmitButton, Divider, OAuthContainer, OAuthButton, SignUpLink, RightPanel, AnimatedShape1, AnimatedShape2, AnimatedShape3, Snackbar } from './styles';
import { SigninResponse } from '@/types/response/signinResponse';


// --- Login Page Component ---

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ message: string; isVisible: boolean; isError?: boolean }>({ 
      message: '', 
      isVisible: false, 
      isError: false 
  });
  const router = useRouter();

  const showSnackbar = (message: string, isError: boolean = false) => {
    setSnackbar({ message, isVisible: true, isError });
    setTimeout(() => {
      setSnackbar(prev => ({ ...prev, isVisible: false }));
    }, 4000);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showSnackbar('Please enter both email and password', true);
      return;
    }

    setIsLoading(true);
    try {
      const tokenData : SigninResponse = await loginUser({ email, password });
      const { accessToken, refreshToken } = tokenData;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
      
      showSnackbar('Login Successful! Redirecting...', false);

      setTimeout(() => {
        router.push('/chat');
      }, 1500);

    } catch (err: unknown) {
      if (err instanceof Error) {
        showSnackbar(err.message || 'Login failed. Please try again.', true);
      } else {
        showSnackbar('An unknown error occurred during login.', true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = (provider: string) => {
    console.log(`Initiating OAuth login with: ${provider}`);
    oauthLogin(provider);
  };

  return (
    <LoginPageContainer>
      <LeftPanel>
        {/* Login Form */}
        <LoginForm onSubmit={handleLogin}>
          <Title>Welcome Back</Title>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          {/* Email input */}
          <InputField
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />

          {/* Password input */}
          <InputWrapper>
            <InputField
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={isLoading}
              style={{ paddingRight: '50px', width: '100%' }}
            />
            <PasswordToggleButton
              type="button"
              onClick={togglePasswordVisibility}
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            >
              <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} size="lg" />
            </PasswordToggleButton>
          </InputWrapper>
          
          {/* Submit button */}
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </SubmitButton>

          <Divider>or continue with</Divider>

          {/* OAuth login */}
          <OAuthContainer>
            <OAuthButton 
              type="button" 
              onClick={() => handleOAuth('google')} 
              aria-label="Login with Google"
            >
              <Image src="/icons/google.svg" alt="Google Login" width={28} height={28} />
            </OAuthButton>
            <OAuthButton 
              type="button" 
              onClick={() => handleOAuth('kakao')} 
              aria-label="Login with Kakao"
            >
              <Image src="/icons/kakao.svg" alt="Kakao Login" width={28} height={28} />
            </OAuthButton>
            <OAuthButton 
              type="button" 
              onClick={() => handleOAuth('naver')} 
              aria-label="Login with Naver"
            >
              <Image src="/icons/naver.svg" alt="Naver Login" width={28} height={28} />
            </OAuthButton>
          </OAuthContainer>

          {/* Signup link */}
          <SignUpLink>
            Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
          </SignUpLink>
        </LoginForm>
      </LeftPanel>
      <RightPanel>
        <AnimatedShape1 />
        <AnimatedShape2 />
        <AnimatedShape3 />
      </RightPanel>

      <Snackbar $isVisible={snackbar.isVisible} $isError={snackbar.isError}>
        {snackbar.message}
      </Snackbar>
    </LoginPageContainer>
  );
};

export default LoginPage; 