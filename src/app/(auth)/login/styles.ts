import styled, { keyframes } from 'styled-components';

// --- Styled Components ---

export const LoginPageContainer = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: #ffffff; /* White background */
`;

export const LeftPanel = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    background-color: #f8f9fa; /* Light grey background for contrast */
`;

export const LoginForm = styled.form`
    width: 100%;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Title = styled.h1`
    font-weight: 800;
    font-size: 36px;
    color: #252525; /* Primary Text Color */
    margin-bottom: 30px;
    text-align: center;
`;

export const InputField = styled.input`
    font-size: 16px;
    padding: 15px 20px;
    border: 1px solid #ced4da; /* Subtle border */
    border-radius: 8px; /* Rounded corners - M3 influence */
    background-color: #ffffff;
    color: #495057;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:focus {
        outline: none;
        border-color: #a0d9b1; /* Green accent on focus */
        box-shadow: 0 0 0 3px rgba(160, 217, 177, 0.3); /* Green focus ring */
    }
`;

export const InputWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex; /* Align items if needed, though button is absolute */
`;

// Password visibility toggle button
export const PasswordToggleButton = styled.button`
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    color: #6c757d;
    line-height: 1;

    &:hover {
        color: #252525;
    }
`;

export const SubmitButton = styled.button`
    font-weight: 500;
    font-size: 18px;
    color: #ffffff;
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

export const Divider = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    color: #adb5bd; /* Muted grey */
    margin: 25px 0;
    font-size: 14px;

    &::before,
    &::after {
        content: "";
        flex: 1;
        border-bottom: 1px solid #dee2e6;
    }

    &::before {
        margin-right: 0.75em;
    }

    &::after {
        margin-left: 0.75em;
    }
`;

export const OAuthContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 25px; /* Increased gap */
`;

export const OAuthButton = styled.button`
    background: #ffffff;
    border: 1px solid #dee2e6;
    border-radius: 50%;
    width: 55px; /* Slightly larger */
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:hover {
        background-color: #f1f3f5;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    img {
        width: 28px; /* Slightly larger icon */
        height: 28px;
    }
`;

export const SignUpLink = styled.div`
    text-align: center;
    margin-top: 35px;
    font-size: 14px;
    color: #6c757d;

    a {
        color: #252525; /* Use primary color */
        font-weight: 500;
        text-decoration: none;
        &:hover {
        text-decoration: underline;
        }
    }
`;

// --- Snackbar Styles ---
export const Snackbar = styled.div<{ $isVisible: boolean; $isError?: boolean }>`
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%)
        translateY(${(props) => (props.$isVisible ? "0" : "100px")});
    background-color: ${(props) =>
            props.$isError ? "#F8D7DA" : "#D1E7DD"}; /* Success is default green */
    color: ${(props) => (props.$isError ? "#721C24" : "#0F5132")};
    padding: 12px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    z-index: 1100;
    opacity: ${(props) => (props.$isVisible ? 1 : 0)};
    transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
    font-size: 15px;
    text-align: center;
`;

// --- Right Panel (Dynamic Image/Animation) ---

export const RightPanel = styled.div`
    flex: 1;
    background-color: #e0e0e0; /* Base grey background */
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    /* Using the dots pattern from landing page */
    background-image: url("/images/deco-wave-1.svg");
    background-repeat: repeat;
    background-size: 350px 350px; /* Adjusted size */
    background-position: center;
`;

// Keyframes for floating animation (Reverted)
export const float = keyframes`
    0% { transform: translatey(0px) rotate(-5deg); }
    50% { transform: translatey(-25px) rotate(5deg); }
    100% { transform: translatey(0px) rotate(-5deg); }
`;

// Animated Shapes (Reverted)
export const AnimatedShape = styled.div`
    position: absolute;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(6px);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
    animation: ${float} 7s ease-in-out infinite;
`;

export const AnimatedShape1 = styled(AnimatedShape)`
    width: 180px;
    height: 140px;
    top: 25%;
    left: 20%;
    animation-delay: -1s;
`;

export const AnimatedShape2 = styled(AnimatedShape)`
    width: 120px;
    height: 120px;
    border-radius: 50%; /* Circle */
    background-color: rgba(160, 217, 177, 0.65); /* Semi-transparent green */
    top: 55%;
    right: 25%;
    animation-duration: 6s;
    animation-delay: -4s;
`;

export const AnimatedShape3 = styled(AnimatedShape)`
    width: 90px;
    height: 160px;
    background-color: rgba(245, 245, 245, 0.7); /* Lightest grey */
    top: 15%;
    right: 10%;
    animation-duration: 8s;
    animation-delay: -2s;
`;
