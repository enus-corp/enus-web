import { styled } from "styled-components";

export const OnboardingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    background-color: #f5f5f5;
`;

export const Form = styled.form`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
`;

export const Title = styled.h1`
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
`;

export const FormGroup = styled.div`
    margin-bottom: 1rem;
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
`;

export const Select = styled.select`
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
`;

export const Button = styled.button`
    width: 100%;
    padding: 0.75rem;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1rem;

    &:hover {
        background-color: #0051a2;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

export const Snackbar = styled.div<{ isError: boolean }>`
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 24px;
    background-color: ${props => props.isError ? '#ff4444' : '#00C851'};
    color: white;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1000;
`;