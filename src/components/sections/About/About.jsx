import styled, { css, keyframes } from 'styled-components';
import { useScrollAnimation } from '../../../hooks';
import Button from '../../ui/Button';
import Container from '../../ui/Container';

const features = [
  'Licensed & Certified',
  '24/7 Emergency Service',
  'Transparent Pricing',
  'Warranty on All Work',
];

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-12px) rotate(3deg);
  }
`;

const drift = keyframes`
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(10px, -10px);
  }
  50% {
    transform: translate(0, -15px);
  }
  75% {
    transform: translate(-10px, -5px);
  }
`;

const AboutSection = styled.section`
  padding-block: ${({ theme }) => theme.space[24]};
  background:
    radial-gradient(ellipse at 0% 0%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 100% 100%, rgba(34, 197, 94, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(247, 197, 30, 0.03) 0%, transparent 40%),
    linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.2), transparent);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.15), transparent);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.space[16]};
  }
`;

const BackgroundPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(6, 182, 212, 0.04) 1px, transparent 0);
  background-size: 48px 48px;
  pointer-events: none;
`;

const GlowOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
  opacity: 0.5;
`;

const GlowOrb1 = styled(GlowOrb)`
  width: 400px;
  height: 400px;
  background: rgba(6, 182, 212, 0.12);
  top: -200px;
  left: -150px;
`;

const GlowOrb2 = styled(GlowOrb)`
  width: 350px;
  height: 350px;
  background: rgba(34, 197, 94, 0.1);
  bottom: -150px;
  right: -100px;
`;

const GlowOrb3 = styled(GlowOrb)`
  width: 200px;
  height: 200px;
  background: rgba(247, 197, 30, 0.08);
  top: 40%;
  right: 20%;
`;

const FloatingShape = styled.div`
  position: absolute;
  pointer-events: none;
  opacity: 0.04;

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
`;

const FloatingCircle1 = styled(FloatingShape)`
  width: 120px;
  height: 120px;
  border: 3px solid ${({ theme }) => theme.colors.accent.cyan};
  border-radius: 50%;
  top: 15%;
  right: 5%;
  animation: ${float} 8s ease-in-out infinite;
`;

const FloatingCircle2 = styled(FloatingShape)`
  width: 80px;
  height: 80px;
  border: 2px solid ${({ theme }) => theme.colors.accent.green};
  border-radius: 50%;
  bottom: 20%;
  left: 3%;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: 1s;
`;

const FloatingSquare = styled(FloatingShape)`
  width: 60px;
  height: 60px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  top: 60%;
  right: 8%;
  animation: ${drift} 10s ease-in-out infinite;
  transform: rotate(15deg);
`;

const FloatingDot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  pointer-events: none;
  animation: ${float} 5s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Dot1 = styled(FloatingDot)`
  background: rgba(6, 182, 212, 0.15);
  top: 25%;
  left: 8%;
  animation-delay: 0s;
`;

const Dot2 = styled(FloatingDot)`
  background: rgba(34, 197, 94, 0.12);
  top: 70%;
  right: 12%;
  animation-delay: 1.5s;
`;

const Dot3 = styled(FloatingDot)`
  background: rgba(247, 197, 30, 0.15);
  bottom: 30%;
  left: 15%;
  animation-delay: 3s;
`;

const Dot4 = styled(FloatingDot)`
  background: rgba(6, 182, 212, 0.1);
  top: 10%;
  left: 40%;
  animation-delay: 2s;
`;

const FloatingIcon = styled.div`
  position: absolute;
  font-size: 1.5rem;
  color: rgba(6, 182, 212, 0.06);
  pointer-events: none;
  animation: ${float} 7s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Icon1 = styled(FloatingIcon)`
  top: 20%;
  left: 5%;
  animation-delay: 0.5s;
`;

const Icon2 = styled(FloatingIcon)`
  bottom: 25%;
  right: 4%;
  color: rgba(34, 197, 94, 0.06);
  animation-delay: 2s;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space[16]};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.space[12]};
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.8s ${({ theme }) => theme.easing.out},
              transform 0.8s ${({ theme }) => theme.easing.out};

  ${({ $visible }) => $visible && css`
    opacity: 1;
    transform: translateX(0);
  `}

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 500px;
    margin-inline: auto;
  }
`;

const ImageMain = styled.div`
  border-radius: ${({ theme }) => theme.radius.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const ImageBadge = styled.div`
  position: absolute;
  bottom: -20px;
  right: -20px;
  background: ${({ theme }) => theme.gradients.primary};
  color: ${({ theme }) => theme.colors.gray[800]};
  padding: ${({ theme }) => theme.space[6]};
  border-radius: ${({ theme }) => theme.radius.lg};
  text-align: center;
  font-size: ${({ theme }) => theme.fonts.size['2xl']};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  line-height: 1;
  box-shadow: ${({ theme }) => theme.shadows.md};

  span {
    display: block;
    font-size: ${({ theme }) => theme.fonts.size.xs};
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
    margin-top: ${({ theme }) => theme.space[1]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    bottom: -10px;
    right: -10px;
    padding: ${({ theme }) => theme.space[4]};
    font-size: ${({ theme }) => theme.fonts.size.xl};
  }
`;

const Content = styled.div`
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.8s ${({ theme }) => theme.easing.out} 0.2s,
              transform 0.8s ${({ theme }) => theme.easing.out} 0.2s;

  ${({ $visible }) => $visible && css`
    opacity: 1;
    transform: translateX(0);
  `}
`;

const Tagline = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-block-end: ${({ theme }) => theme.space[4]};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fonts.size['2xl']};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.gray[800]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.tight};
  margin-block-end: ${({ theme }) => theme.space[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fonts.size.xl};
  }
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.base};
  color: ${({ theme }) => theme.colors.gray[600]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.relaxed};
  margin-block-end: ${({ theme }) => theme.space[6]};
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.space[4]};
  margin-block-end: ${({ theme }) => theme.space[8]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ${({ theme }) => theme.easing.out},
              transform 0.5s ${({ theme }) => theme.easing.out};

  ${({ $visible }) => $visible && css`
    opacity: 1;
    transform: translateY(0);
  `}

  i {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fonts.size.md};
  }

  span {
    font-size: ${({ theme }) => theme.fonts.size.sm};
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
    color: ${({ theme }) => theme.colors.gray[700]};
  }
`;

const About = () => {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.15 });

  return (
    <AboutSection id="about" ref={sectionRef}>
      <Container size="xl">
        <AboutGrid>
          <ImageWrapper $visible={isVisible}>
            <ImageMain>
              <img
                src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80"
                alt="Professional electrician team from Sharma Electrical Services working in Hyderabad"
                loading="lazy"
              />
            </ImageMain>
            <ImageBadge>
              14+
              <span>Years of Trust</span>
            </ImageBadge>
          </ImageWrapper>

          <Content $visible={isVisible}>
            <Tagline>Hyderabad's Trusted Electrical Partner</Tagline>
            <Title>Welcome to Sharma Electrical Services</Title>
            <Description>
              Since 2010, Sharma Electrical Services has been Hyderabad's go-to choice for reliable, safe,
              and professional electrical solutions. What started as a small family business has grown
              into a full-service electrical company serving thousands of residential and commercial
              clients.
            </Description>
            <Description>
              Our licensed electricians bring decades of combined experience to every job — from simple
              repairs to complete electrical system installations. We take pride in our workmanship,
              transparency, and commitment to customer satisfaction.
            </Description>

            <Features>
              {features.map((feature, index) => (
                <Feature
                  key={feature}
                  $visible={isVisible}
                  style={{ transitionDelay: `${0.4 + index * 0.1}s` }}
                >
                  <i className="fas fa-check-circle" aria-hidden="true" />
                  <span>{feature}</span>
                </Feature>
              ))}
            </Features>

            <Button
              href="/contact"
              icon={<i className="fas fa-calendar-check" aria-hidden="true" />}
            >
              Schedule Consultation
            </Button>
          </Content>
        </AboutGrid>
      </Container>
    </AboutSection>
  );
};

export default About;
