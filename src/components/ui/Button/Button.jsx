import { forwardRef } from "react";
import styled, { css, keyframes } from "styled-components";

// Animations
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

const sizeStyles = {
  sm: css`
    padding: ${({ theme }) => `${theme.space[2]} ${theme.space[5]}`};
    font-size: ${({ theme }) => theme.fonts.size.sm};
    min-height: 36px;
  `,
  md: css`
    padding: ${({ theme }) => `${theme.space[3]} ${theme.space[6]}`};
    font-size: ${({ theme }) => theme.fonts.size.base};
    min-height: 44px;
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.space[4]} ${theme.space[8]}`};
    font-size: ${({ theme }) => theme.fonts.size.md};
    min-height: 52px;
  `,
};

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.gradients.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.gray[800]};
    box-shadow: ${({ theme }) => theme.shadows.button};

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
      );
      background-size: 200% 100%;
      border-radius: inherit;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.gradients.primaryHover};
      border-color: ${({ theme }) => theme.colors.primaryHover};
      box-shadow: ${({ theme }) => theme.shadows.glow};
      transform: translateY(-3px);

      &::before {
        opacity: 1;
        animation: ${shimmer} 1.5s infinite;
      }
    }

    &:active:not(:disabled) {
      transform: translateY(-1px) scale(0.98);
      box-shadow: ${({ theme }) => theme.shadows.glowSm};
    }
  `,
  outline: css`
    background-color: transparent;
    border-color: currentColor;
    color: ${({ theme }) => theme.colors.primary};
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: ${({ theme }) => theme.colors.primary};
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
      z-index: -1;
    }

    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.colors.gray[800]};
      border-color: ${({ theme }) => theme.colors.primary};
      transform: translateY(-3px);
      box-shadow: ${({ theme }) => theme.shadows.md};

      &::before {
        transform: scaleX(1);
        transform-origin: left;
      }
    }

    &:active:not(:disabled) {
      transform: translateY(-1px) scale(0.98);
    }
  `,
  ghost: css`
    background-color: transparent;
    border-color: transparent;
    color: ${({ theme }) => theme.colors.gray[700]};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.gray[100]};
      color: ${({ theme }) => theme.colors.gray[800]};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.gray[200]};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.gray[800]};
    border-color: ${({ theme }) => theme.colors.gray[800]};
    color: ${({ theme }) => theme.colors.white};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.gray[700]};
      border-color: ${({ theme }) => theme.colors.gray[700]};
      transform: translateY(-3px);
      box-shadow: ${({ theme }) => theme.shadows.lg};
    }

    &:active:not(:disabled) {
      transform: translateY(-1px) scale(0.98);
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.semantic.error};
    border-color: ${({ theme }) => theme.colors.semantic.error};
    color: ${({ theme }) => theme.colors.white};

    &:hover:not(:disabled) {
      background-color: #dc2626;
      border-color: #dc2626;
      transform: translateY(-3px);
      box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
    }

    &:active:not(:disabled) {
      transform: translateY(-1px) scale(0.98);
    }
  `,
};

const StyledButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
  font-family: ${({ theme }) => theme.fonts.family};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  text-decoration: none;
  white-space: nowrap;
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.radius.lg};
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  isolation: isolate;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ $size }) => sizeStyles[$size || "md"]}
  ${({ $variant }) => variantStyles[$variant || "primary"]}

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  ${({ $loading }) =>
    $loading &&
    css`
      pointer-events: none;
      opacity: 0.8;
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${({ $size }) =>
      $size === "lg" &&
      css`
        padding: ${({ theme }) => `${theme.space[3]} ${theme.space[6]}`};
        font-size: ${({ theme }) => theme.fonts.size.base};
        min-height: 48px;
      `}
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover:not(:disabled) {
      transform: none;
    }

    &::before {
      animation: none !important;
    }
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ $position }) =>
    $position === "right" &&
    css`
      ${StyledButton}:hover:not(:disabled) & {
        transform: translateX(4px);
      }
    `}

  ${({ $position }) =>
    $position === "left" &&
    css`
      ${StyledButton}:hover:not(:disabled) & {
        transform: translateX(-4px);
      }
    `}

  svg,
  i {
    width: 1.1em;
    height: 1.1em;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    ${StyledButton}:hover:not(:disabled) & {
      transform: none;
    }
  }
`;

const Spinner = styled.span`
  width: 1.25em;
  height: 1.25em;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const ButtonText = styled.span`
  position: relative;
  z-index: 1;
`;

const Button = forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "right",
      fullWidth = false,
      loading = false,
      href,
      disabled = false,
      className,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <StyledButton
        ref={ref}
        as={href ? "a" : "button"}
        type={!href ? type : undefined}
        href={href}
        disabled={!href && isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
        $loading={loading}
        className={className}
        {...props}
      >
        {loading ? (
          <>
            <Spinner aria-hidden="true" />
            <ButtonText>Loading...</ButtonText>
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <IconWrapper $position="left" aria-hidden="true">
                {icon}
              </IconWrapper>
            )}
            <ButtonText>{children}</ButtonText>
            {icon && iconPosition === "right" && (
              <IconWrapper $position="right" aria-hidden="true">
                {icon}
              </IconWrapper>
            )}
          </>
        )}
      </StyledButton>
    );
  }
);

Button.displayName = "Button";

export default Button;
