import styled, { keyframes } from "styled-components";

export const SignupPageContainer = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: #FFFFFF;
`;

export const LeftPanel = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    background-color: #F8F9FA;
    overflow-y: auto;
`;

export const SignupForm = styled.form`
    width: 100%;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const Title = styled.h1`
    font-family: 'Avenir', sans-serif;
    font-weight: 800;
    font-size: 36px;
    color: #252525;
    margin-bottom: 25px;
    text-align: center;
`;

export const InputField = styled.input`
    font-family: 'Avenir', sans-serif;
    font-size: 16px;
    padding: 14px 18px;
    border: 1px solid #CED4DA;
    border-radius: 8px;
    background-color: #FFFFFF;
    color: #495057;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:focus {
        outline: none;
        border-color: #A0D9B1;
        box-shadow: 0 0 0 3px rgba(160, 217, 177, 0.3);
    }
`;

export const InputRow = styled.div`
    display: flex;
    gap: 15px;
    width: 100%;

    & > ${InputField}, & > select { // Target both input and select
        flex: 1;
    }
`;

export const SelectField = styled.select`
    font-family: 'Avenir', sans-serif;
    font-size: 16px;
    padding: 14px 18px;
    border: 1px solid #CED4DA;
    border-radius: 8px;
    background-color: #FFFFFF;
    color: #495057;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    cursor: pointer;
    appearance: none;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236C757D%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.6-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 0.65em auto;
    padding-right: 2.5rem;

    &:focus {
        outline: none;
        border-color: #A0D9B1;
        box-shadow: 0 0 0 3px rgba(160, 217, 177, 0.3);
    }
`;

export const SubmitButton = styled.button`
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 18px;
    color: #FFFFFF;
    background-color: #252525;
    border: none;
    border-radius: 8px;
    padding: 15px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    margin-top: 15px;

    &:hover {
        background-color: #495057;
    }

    &:disabled {
        background-color: #ADB5BD;
        cursor: not-allowed;
    }
`;

export const LoginLink = styled.div`
    text-align: center;
    margin-top: 30px;
    font-size: 14px;
    color: #6C757D;

    a {
        color: #252525;
        font-weight: 500;
        text-decoration: none;
        &:hover {
        text-decoration: underline;
        }
    }
`;

// --- Right Panel & Animation (Placeholder definitions) ---
export const RightPanel = styled.div`
    flex: 1;
    background-color: #E0E0E0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-image: url('/images/deco-wave-1.svg');
    background-repeat: repeat;
    background-size: 350px 350px;
    background-position: center;
`;
export const float = keyframes`
    0% { transform: translatey(0px) rotate(-5deg); }
    50% { transform: translatey(-25px) rotate(5deg); }
    100% { transform: translatey(0px) rotate(-5deg); }
`;
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
    border-radius: 50%;
    background-color: rgba(160, 217, 177, 0.65);
    top: 55%;
    right: 25%;
    animation-duration: 6s;
    animation-delay: -4s;
`;
export const AnimatedShape3 = styled(AnimatedShape)`
    width: 90px;
    height: 160px;
    background-color: rgba(245, 245, 245, 0.7);
    top: 15%;
    right: 10%;
    animation-duration: 8s;
    animation-delay: -2s;
`;
// --- End Placeholder Definitions ---

// --- Snackbar Styles ---
export const Snackbar = styled.div<{ $isVisible: boolean; $isError?: boolean }>`
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(${props => props.$isVisible ? '0' : '100px'}); /* Slide up/down */
    background-color: ${props => props.$isError ? '#F8D7DA' : '#D1E7DD'}; /* Red for error, Green for success */
    color: ${props => props.$isError ? '#721C24' : '#0F5132'};
    padding: 12px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    z-index: 1100; /* Above modal backdrop */
    opacity: ${props => props.$isVisible ? 1 : 0};
    transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
    font-family: 'Avenir', sans-serif;
    font-size: 15px;
    text-align: center;
`;

// --- Signup Page Component ---
