'use client';

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- Styled Components ---

const LoginPageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #FFFFFF; /* White background */
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: #F8F9FA; /* Light grey background for contrast */
`;

const LoginForm = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-family: 'Avenir', sans-serif;
  font-weight: 800;
  font-size: 36px;
  color: #252525; /* Primary Text Color */
  margin-bottom: 30px;
  text-align: center;
`;

const InputField = styled.input`
  font-family: 'Avenir', sans-serif;
  font-size: 16px;
  padding: 15px 20px;
  border: 1px solid #CED4DA; /* Subtle border */
  border-radius: 8px; /* Rounded corners - M3 influence */
  background-color: #FFFFFF;
  color: #495057;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #A0D9B1; /* Green accent on focus */
    box-shadow: 0 0 0 3px rgba(160, 217, 177, 0.3); /* Green focus ring */
  }
`;

const SubmitButton = styled.button`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: #FFFFFF;
  background-color: #252525; /* Match landing page button */
  border: none;
  border-radius: 8px; /* Rounded corners */
  padding: 15px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin-top: 10px; /* Spacing */

  &:hover {
    background-color: #495057; /* Darken on hover */
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #ADB5BD; /* Muted grey */
  margin: 25px 0;
  font-size: 14px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #DEE2E6;
  }

  &::before {
    margin-right: .75em;
  }

  &::after {
    margin-left: .75em;
  }
`;

const OAuthContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px; /* Increased gap */
`;

const OAuthButton = styled.button`
  background: #FFFFFF;
  border: 1px solid #DEE2E6;
  border-radius: 50%;
  width: 55px; /* Slightly larger */
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    background-color: #F1F3F5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  img {
    width: 28px; /* Slightly larger icon */
    height: 28px;
  }
`;

const SignUpLink = styled.div`
  text-align: center;
  margin-top: 35px;
  font-size: 14px;
  color: #6C757D;

  a {
    color: #252525; /* Use primary color */
    font-weight: 500;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

// --- Right Panel (Dynamic Image/Animation) ---

const RightPanel = styled.div`
  flex: 1;
  background-color: #E0E0E0; /* Base grey background */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  /* Using the dots pattern from landing page */
  background-image: url('/images/deco-wave-1.svg');
  background-repeat: repeat;
  background-size: 350px 350px; /* Adjusted size */
  background-position: center;
`;

// Keyframes for floating animation (Reverted)
const float = keyframes`
  0% { transform: translatey(0px) rotate(-5deg); }
  50% { transform: translatey(-25px) rotate(5deg); }
  100% { transform: translatey(0px) rotate(-5deg); }
`;

// Animated Shapes (Reverted)
const AnimatedShape = styled.div`
  position: absolute;
  border-radius: 20px; 
  background-color: rgba(255, 255, 255, 0.6); 
  backdrop-filter: blur(6px); 
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15); 
  animation: ${float} 7s ease-in-out infinite; 
`;

const AnimatedShape1 = styled(AnimatedShape)`
  width: 180px;
  height: 140px;
  top: 25%;
  left: 20%;
  animation-delay: -1s; 
`;

const AnimatedShape2 = styled(AnimatedShape)`
  width: 120px;
  height: 120px;
  border-radius: 50%; /* Circle */
  background-color: rgba(160, 217, 177, 0.65); /* Semi-transparent green */
  top: 55%;
  right: 25%;
  animation-duration: 6s; 
  animation-delay: -4s; 
`;

const AnimatedShape3 = styled(AnimatedShape)`
  width: 90px;
  height: 160px;
  background-color: rgba(245, 245, 245, 0.7); /* Lightest grey */
  top: 15%;
  right: 10%;
  animation-duration: 8s;
  animation-delay: -2s;
`;

// --- Login Page Component ---

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/chat');
  };

  const handleOAuth = (provider: string) => {
    // TODO: Implement OAuth logic
    console.log(`OAuth login attempt with: ${provider}`);
    alert(`${provider} login not implemented yet.`);
  };

  return (
    <LoginPageContainer>
      <LeftPanel>
        <LoginForm onSubmit={handleLogin}>
          <Title>Welcome Back</Title>
          <InputField
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <SubmitButton type="submit">Log In</SubmitButton>
          <Divider>or continue with</Divider>
          <OAuthContainer>
            <OAuthButton type="button" onClick={() => handleOAuth('Google')} aria-label="Login with Google">
              {/* Placeholder: Replace with actual Google icon */}
              <Image src="/icons/google.svg" alt="Google Login" width={28} height={28} />
            </OAuthButton>
             <OAuthButton type="button" onClick={() => handleOAuth('Kakao')} aria-label="Login with Kakao">
               {/* Placeholder: Replace with actual Kakao icon */}
              <Image src="/icons/kakao.svg" alt="Kakao Login" width={28} height={28} />
            </OAuthButton>
             <OAuthButton type="button" onClick={() => handleOAuth('Naver')} aria-label="Login with Naver">
               {/* Placeholder: Replace with actual Naver icon */}
              <Image src="/icons/naver.svg" alt="Naver Login" width={28} height={28} />
            </OAuthButton>
          </OAuthContainer>
          <SignUpLink>
            Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
          </SignUpLink>
        </LoginForm>
      </LeftPanel>
      <RightPanel>
        {/* Reverted to floating shapes animation */}
        <AnimatedShape1 />
        <AnimatedShape2 />
        <AnimatedShape3 />
      </RightPanel>
    </LoginPageContainer>
  );
};

export default LoginPage; 