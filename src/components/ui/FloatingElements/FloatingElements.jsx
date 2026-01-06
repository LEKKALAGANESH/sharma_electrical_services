import { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useReducedMotion } from '../../../hooks';

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const FloatingWrapper = styled.div`
  position: fixed;
  bottom: ${({ theme }) => theme.space[8]};
  right: ${({ theme }) => theme.space[6]};
  z-index: ${({ theme }) => theme.zIndex.fixed};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    bottom: ${({ theme }) => theme.space[4]};
    right: ${({ theme }) => theme.space[4]};
    gap: ${({ theme }) => theme.space[2]};
  }
`;

const FloatingButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    transition: transform 0.15s ease;
  }
`;

const WhatsAppButton = styled(FloatingButton).attrs({ as: 'a' })`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.875rem;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
  animation: ${pulse} 2s infinite;

  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: inherit;
    background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
    opacity: 0;
    z-index: -1;
    filter: blur(12px);
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: scale(1.15);
    animation: none;
    box-shadow: 0 8px 30px rgba(37, 211, 102, 0.5);

    &::before {
      opacity: 0.6;
    }
  }

  &:active {
    transform: scale(1.05);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 52px;
    height: 52px;
    font-size: 1.5rem;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  right: calc(100% + ${({ theme }) => theme.space[3]});
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.colors.gray[800]};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[4]}`};
  border-radius: ${({ theme }) => theme.radius.lg};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  pointer-events: none;
  box-shadow: ${({ theme }) => theme.shadows.lg};

  &::after {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    border: 6px solid transparent;
    border-left-color: ${({ theme }) => theme.colors.gray[800]};
  }

  ${WhatsAppButton}:hover &,
  ${WhatsAppButton}:focus-visible & {
    opacity: 1;
    visibility: visible;
    transform: translateY(-50%) translateX(-5px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const BackToTopButton = styled(FloatingButton)`
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.colors.gray[800]};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.25rem;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px) scale(0.8);

  ${({ $visible }) => $visible && css`
    opacity: 1;
    visibility: visible;
    transform: translateY(0) scale(1);
    animation: ${slideUp} 0.3s ease;
  `}

  &:hover {
    background: ${({ theme }) => theme.gradients.primary};
    color: ${({ theme }) => theme.colors.gray[800]};
    transform: translateY(-5px) scale(1.05);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  &:active {
    transform: translateY(-2px) scale(1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 44px;
    height: 44px;
    font-size: 1.125rem;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    ${({ $visible }) => $visible && css`
      transform: none;
    `}
    &:hover {
      transform: none;
    }
  }
`;

const CallButton = styled(FloatingButton).attrs({ as: 'a' })`
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.gradients.primary};
  color: ${({ theme }) => theme.colors.gray[800]};
  font-size: 1.25rem;
  box-shadow: ${({ theme }) => theme.shadows.glow};
  display: none;

  &:hover {
    transform: scale(1.1) rotate(-10deg);
    box-shadow: ${({ theme }) => theme.shadows.glowLg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 44px;
    height: 44px;
    font-size: 1.125rem;
  }
`;

const FloatingElements = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <FloatingWrapper aria-label="Quick actions" role="group">
      <WhatsAppButton
        href="https://wa.me/919876543210?text=Hi,%20I'm%20interested%20in%20your%20electrical%20services"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <i className="fab fa-whatsapp" aria-hidden="true" />
        <Tooltip role="tooltip">Chat with us!</Tooltip>
      </WhatsAppButton>

      <CallButton
        href="tel:+919876543210"
        aria-label="Call us at +91 9876543210"
      >
        <i className="fas fa-phone-alt" aria-hidden="true" />
      </CallButton>

      <BackToTopButton
        $visible={showBackToTop}
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
      >
        <i className="fas fa-chevron-up" aria-hidden="true" />
      </BackToTopButton>
    </FloatingWrapper>
  );
};

export default FloatingElements;
