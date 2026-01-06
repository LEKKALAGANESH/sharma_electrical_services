import styled, { css } from 'styled-components';

const sizeStyles = {
  sm: css`max-width: 640px;`,
  md: css`max-width: 768px;`,
  lg: css`max-width: 1024px;`,
  xl: css`max-width: ${({ theme }) => theme.layout.containerMax};`,
  full: css`max-width: 100%;`,
};

const StyledContainer = styled.div`
  width: 100%;
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.layout.containerPadding};
  ${({ $size }) => sizeStyles[$size || 'xl']}
`;

const Container = ({ children, size = 'xl', className, ...props }) => {
  return (
    <StyledContainer $size={size} className={className} {...props}>
      {children}
    </StyledContainer>
  );
};

export default Container;
