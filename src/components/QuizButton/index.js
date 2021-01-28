import styled from 'styled-components';
import PropTypes from 'prop-types';

const QuizButton = styled.button`
    background-color: ${({ theme }) => theme.colors.secondary};    
    color: ${({ theme }) => theme.colors.contrastText};
    border-radius: ${({ theme }) => theme.borderRadius}; 
    border: 0;
    width: 100%;
    padding: 14px 16px;
    font-weight: bold;
    font-size: 14px;
    line-height: 1;
    text-transform: uppercase;
    outline: 0;
    transition: .3s;
    cursor: pointer;

    &:hover,
    &:focus {
        opacity: .9;
    }

    &:disabled {
        cursor: not-allowed;
    }
`;

QuizButton.propTypes = {
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  children: PropTypes.node.isRequired,
};

export default QuizButton;
