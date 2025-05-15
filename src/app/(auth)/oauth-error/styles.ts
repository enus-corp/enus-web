import styled from 'styled-components';

const ErrorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
    text-align: center;
    padding: 20px;
`;

const ErrorMessage = styled.h1`
    font-size: 1.5rem;
    color: #dc2626;
    margin-bottom: 1rem;
`;

const ErrorDescription = styled.p`
    font-size: 1.1rem;
    color: #4b5563;
    margin-bottom: 2rem;
`;

const ReturnButton = styled.button`
    padding: 0.75rem 1.5rem;
    background-color: #3b82f6;
    color: white;
    border-radius: 0.375rem;
    font-weight: 500;
    transition: background-color 0.2s;

    &:hover {
        background-color: #2563eb;
    }
`;

export { ErrorContainer, ErrorMessage, ErrorDescription, ReturnButton };
