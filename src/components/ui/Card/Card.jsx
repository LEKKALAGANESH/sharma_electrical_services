import styled, { css } from 'styled-components';

const variantStyles = {
  default: css`box-shadow: ${({ theme }) => theme.shadows.sm};`,
  elevated: css`box-shadow: ${({ theme }) => theme.shadows.md};`,
  outlined: css`
    border: 1px solid ${({ theme }) => theme.colors.gray[200]};
    box-shadow: none;
  `,
};

const StyledCard = styled.article`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.space[8]};
  transition: transform ${({ theme }) => theme.transitions.normal},
              box-shadow ${({ theme }) => theme.transitions.normal};

  ${({ $variant }) => variantStyles[$variant || 'default']}

  ${({ $hoverable }) => $hoverable && css`
    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
    }
  `}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.space[6]};
  }
`;

const Card = ({ children, variant = 'default', hoverable = true, className, style, ...props }) => {
  return (
    <StyledCard $variant={variant} $hoverable={hoverable} className={className} style={style} {...props}>
      {children}
    </StyledCard>
  );
};

export default Card;
