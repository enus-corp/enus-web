'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px;
  background-color: #FFFFFF;
  position: relative;
  overflow: hidden;
  background-image: url('/images/deco-wave-1.svg');
  background-repeat: repeat;
  background-size: 550px 550px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 1200px;
  width: 100%;
`;

const HeroSection = styled.div`
  display: flex;
  gap: 64px;
  align-items: center;
  margin-bottom: 64px;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex: 1;
`;

const Title = styled.h1`
  font-family: 'Avenir', sans-serif;
  font-weight: 800;
  font-size: 72px;
  line-height: 1.22;
  color: #252525;
  margin: 0;
`;

const Description = styled.p`
  font-family: 'Avenir', sans-serif;
  font-weight: 400;
  font-size: 26px;
  line-height: 1.37;
  color: rgba(37, 37, 37, 0.8);
  margin: 0;
`;

const Button = styled.button`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 0.75;
  color: #FFFFFF;
  background-color: #252525;
  border: none;
  border-radius: 36px;
  padding: 24px 48px;
  cursor: pointer;
  width: fit-content;
`;

// Abstract Shape Container as Hero Visual
const AbstractShapeContainer = styled.div`
  position: relative; /* Context for absolute positioning of inner shapes */
  flex: 1; /* Take up available space */
  min-height: 400px; /* Ensure it has some height */
  max-width: 600px; /* Match previous max-width */
  width: 100%;
  border: 2px solid black;
  border-radius: 24px; /* Keep the rounded corners */
  overflow: hidden; /* Hide overflow */
  background-color: #F5F5F5; /* Base background for the container */
`;

const AbstractShapeBase = styled.div`
  position: absolute;
`;

const AbstractShape1 = styled(AbstractShapeBase)`
  width: 60%;
  height: 50%;
  background-color: #E0E0E0; /* Light Grey */
  top: 10%;
  left: -10%;
  border-radius: 15px;
  transform: rotate(-20deg);
`;

const AbstractShape2 = styled(AbstractShapeBase)`
  width: 50%;
  height: 40%;
  background-color: #A0D9B1; /* Light Green */
  bottom: 15%;
  right: 5%;
  border-radius: 50%; /* Circle */
  opacity: 0.8;
`;

const AbstractShape3 = styled(AbstractShapeBase)`
  width: 45%;
  height: 30%;
  background-color: #FFFFFF; /* White */
  top: 25%;
  right: -5%;
  border-radius: 10px;
  transform: rotate(15deg);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const AbstractShape4 = styled(AbstractShapeBase)`
  width: 30%;
  height: 20%;
  background-color: #BDBDBD; /* Medium Grey */
  bottom: 5%;
  left: 5%;
  border-radius: 8px;
  transform: rotate(5deg);
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: #252525;
  border-radius: 40px;
  padding: 64px;
`;

const FeatureRow = styled.div`
  display: flex;
  gap: 118px;
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FeatureIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconWrapper = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
`;

const FeatureTitle = styled.h3`
  font-family: 'Avenir', sans-serif;
  font-weight: 800;
  font-size: 32px;
  line-height: 1.37;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

const FeatureDescription = styled.p`
  font-family: 'Avenir', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.37;
  color: #FFFFFF;
  margin: 0;
`;

const LandingPage: React.FC = () => {
  return (
    <Container>
      <Content>
        <HeroSection>
          <TextContent>
            <Title>
              Stay Informed,
              <br />
              Stay Ahead
            </Title>
            <Description>
              Get AI-powered news summaries in seconds. Ask questions, dive deeper, and stay updated without the overwhelm. Your personal news assistant that helps you understand the world better.
            </Description>
            <Link href="/login">
              <Button>Try Now</Button>
            </Link>
          </TextContent>
          
          <AbstractShapeContainer>
            <AbstractShape1 />
            <AbstractShape2 />
            <AbstractShape3 />
            <AbstractShape4 />
          </AbstractShapeContainer>

        </HeroSection>

        <FeatureList>
          <FeatureRow>
            <FeatureItem>
              <FeatureIcon>
              </FeatureIcon>
              <FeatureTitle>Registered Users</FeatureTitle>
              <FeatureDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </FeatureDescription>
            </FeatureItem>

            <FeatureItem>
              <FeatureIcon>
              </FeatureIcon>
              <FeatureTitle>Daily Users  </FeatureTitle>
              <FeatureDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </FeatureDescription>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
              </FeatureIcon>
              <FeatureTitle>Title 3</FeatureTitle>
              <FeatureDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </FeatureDescription>
            </FeatureItem>
          </FeatureRow>
        </FeatureList>
      </Content>
    </Container>
  );
};

export default LandingPage; 