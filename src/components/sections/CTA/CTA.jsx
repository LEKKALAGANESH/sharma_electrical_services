import styled, { keyframes } from 'styled-components';
import Button from '../../ui/Button';
import Container from '../../ui/Container';

const shimmer = keyframes`
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-15px) scale(1.05);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.15);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const CTASection = styled.section`
  padding-block: ${({ theme }) => theme.space[20]};
  background:
    radial-gradient(ellipse at 0% 50%, rgba(249, 115, 22, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 100% 50%, rgba(239, 68, 68, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 100%, rgba(247, 197, 30, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, #7c2d12 0%, #9a3412 25%, #c2410c 50%, #9a3412 75%, #7c2d12 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.space[16]};
  }
`;

const BackgroundPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.04) 1px, transparent 0);
  background-size: 32px 32px;
  pointer-events: none;
`;

const ShimmerOverlay = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 40%,
      rgba(255, 255, 255, 0.03) 50%,
      transparent 60%
    );
    animation: ${shimmer} 8s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`;

const GlowOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  animation: ${pulse} 6s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const GlowOrb1 = styled(GlowOrb)`
  width: 350px;
  height: 350px;
  background: rgba(249, 115, 22, 0.3);
  top: -150px;
  left: -100px;
  animation-delay: 0s;
`;

const GlowOrb2 = styled(GlowOrb)`
  width: 300px;
  height: 300px;
  background: rgba(239, 68, 68, 0.25);
  bottom: -100px;
  right: -100px;
  animation-delay: 2s;
`;

const GlowOrb3 = styled(GlowOrb)`
  width: 200px;
  height: 200px;
  background: rgba(247, 197, 30, 0.2);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 4s;
`;

const FloatingShape = styled.div`
  position: absolute;
  pointer-events: none;
  opacity: 0.06;

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
`;

const FloatingCircle1 = styled(FloatingShape)`
  width: 100px;
  height: 100px;
  border: 3px solid ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  top: 20%;
  left: 8%;
  animation: ${float} 7s ease-in-out infinite;
`;

const FloatingCircle2 = styled(FloatingShape)`
  width: 60px;
  height: 60px;
  border: 2px solid ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  bottom: 25%;
  right: 10%;
  animation: ${float} 5s ease-in-out infinite;
  animation-delay: 1s;
`;

const FloatingRing = styled(FloatingShape)`
  width: 150px;
  height: 150px;
  border: 4px solid ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  top: 10%;
  right: 15%;
  animation: ${rotate} 20s linear infinite;
  border-top-color: transparent;
  border-right-color: transparent;
`;

const SparkleIcon = styled.div`
  position: absolute;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.08);
  pointer-events: none;
  animation: ${float} 4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Sparkle1 = styled(SparkleIcon)`
  top: 30%;
  left: 5%;
  animation-delay: 0.5s;
`;

const Sparkle2 = styled(SparkleIcon)`
  bottom: 30%;
  right: 5%;
  animation-delay: 1.5s;
`;

const Sparkle3 = styled(SparkleIcon)`
  top: 15%;
  left: 30%;
  animation-delay: 2.5s;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const CTAContent = styled.div`
  text-align: center;
  max-width: 700px;
  margin-inline: auto;
`;

const CTATitle = styled.h2`
  font-size: ${({ theme }) => theme.fonts.size['2xl']};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.white};
  line-height: ${({ theme }) => theme.fonts.lineHeight.tight};
  margin-block-end: ${({ theme }) => theme.space[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fonts.size.xl};
  }
`;

const CTADescription = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.md};
  color: rgba(255, 255, 255, 0.85);
  line-height: ${({ theme }) => theme.fonts.lineHeight.relaxed};
  margin-block-end: ${({ theme }) => theme.space[8]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fonts.size.base};
  }
`;

const CTAButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.space[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;

    & > * {
      width: 100%;
      max-width: 280px;
    }
  }
`;

const PrimaryButton = styled(Button)`
  background: ${({ theme }) => theme.gradients.primary};
  border-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.gray[800]};

  &:hover {
    box-shadow: 0 0 30px rgba(247, 197, 30, 0.5);
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background: ${({ theme }) => theme.colors.white};
    color: #1e3a5f;
    border-color: ${({ theme }) => theme.colors.white};
  }
`;

const CTA = () => {
  return (
    <CTASection aria-labelledby="cta-heading">
      {/* Background decorations */}
      <BackgroundPattern aria-hidden="true" />
      <ShimmerOverlay aria-hidden="true" />
      <GlowOrb1 aria-hidden="true" />
      <GlowOrb2 aria-hidden="true" />
      <GlowOrb3 aria-hidden="true" />
      <FloatingCircle1 aria-hidden="true" />
      <FloatingCircle2 aria-hidden="true" />
      <FloatingRing aria-hidden="true" />
      <Sparkle1 aria-hidden="true">
        <i className="fas fa-star" />
      </Sparkle1>
      <Sparkle2 aria-hidden="true">
        <i className="fas fa-sparkles" />
      </Sparkle2>
      <Sparkle3 aria-hidden="true">
        <i className="fas fa-bolt" />
      </Sparkle3>

      <ContentWrapper>
        <Container size="lg">
          <CTAContent>
            <CTATitle id="cta-heading">Ready to Start Your Electrical Project?</CTATitle>
            <CTADescription>
              Get a free consultation and quote from Hyderabad's trusted electrical experts. No obligation, no hidden fees.
            </CTADescription>
            <CTAButtons>
              <PrimaryButton
                href="/contact"
                size="lg"
                icon={<i className="fas fa-paper-plane" aria-hidden="true" />}
              >
                Get Free Quote
              </PrimaryButton>
              <SecondaryButton
                href="tel:9876543210"
                size="lg"
                icon={<i className="fas fa-phone-alt" aria-hidden="true" />}
              >
                Call Now
              </SecondaryButton>
            </CTAButtons>
          </CTAContent>
        </Container>
      </ContentWrapper>
    </CTASection>
  );
};

export default CTA;
