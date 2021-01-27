import styled from 'styled-components';

const QuizButton = styled.button`
    background-color: ${({ theme }) => theme.colors.secondary};    
    color: ${({ theme }) => theme.colors.contrastText};
    padding: 0.75rem;
    text-transform: uppercase;
    font-weight: 700;
    border-radius: 4px; 
`;

export default QuizButton;
