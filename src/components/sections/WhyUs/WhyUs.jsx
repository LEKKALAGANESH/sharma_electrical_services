import styled, { css, keyframes } from 'styled-components';
import { useScrollAnimation } from '../../../hooks';
import Container from '../../ui/Container';
import SectionHeader from '../../ui/SectionHeader';

const reasons = [
  {
    icon: 'fas fa-shield-alt',
    title: 'Safety First',
    description: 'Every installation meets strict safety standards. We never cut corners when it comes to protecting your property and family.',
    color: '#3b82f6', // blue
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  },
  {
    icon: 'fas fa-clock',
    title: 'On-Time Service',
    description: 'We respect your time. Our team arrives punctually and completes projects within agreed timelines.',
    color: '#f59e0b', // amber
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  {
    icon: 'fas fa-award',
    title: 'Quality Workmanship',
    description: 'Our skilled electricians deliver precise, durable work using premium materials and proven techniques.',
    color: '#8b5cf6', // purple
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
  },
  {
    icon: 'fas fa-rupee-sign',
    title: 'Fair Pricing',
    description: 'Transparent quotes with no hidden charges. We provide detailed estimates before starting any work.',
    color: '#22c55e', // green
    gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
  },
];

const float = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
`;

const WhyUsSection = styled.section`
  padding-block: ${({ theme }) => theme.layout.sectionY};
  background:
    radial-gradient(ellipse at 20% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 100%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(247, 197, 30, 0.05) 0%, transparent 60%),
    linear-gradient(135deg, ${({ theme }) => theme.colors.gray[900]} 0%, #1a1a2e 50%, ${({ theme }) => theme.colors.gray[900]} 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  }
`;

const BackgroundPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.03) 1px, transparent 0);
  background-size: 40px 40px;
  pointer-events: none;
`;

const GlowOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
  animation: ${pulse} 8s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const GlowOrb1 = styled(GlowOrb)`
  width: 300px;
  height: 300px;
  background: rgba(59, 130, 246, 0.2);
  top: -100px;
  left: -100px;
  animation-delay: 0s;
`;

const GlowOrb2 = styled(GlowOrb)`
  width: 400px;
  height: 400px;
  background: rgba(139, 92, 246, 0.15);
  bottom: -150px;
  right: -150px;
  animation-delay: 2s;
`;

const GlowOrb3 = styled(GlowOrb)`
  width: 200px;
  height: 200px;
  background: rgba(247, 197, 30, 0.1);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 4s;
`;

const FloatingIcon = styled.div`
  position: absolute;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.03);
  pointer-events: none;
  animation: ${float} 6s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const FloatingIcon1 = styled(FloatingIcon)`
  top: 15%;
  left: 10%;
  animation-delay: 0s;
`;

const FloatingIcon2 = styled(FloatingIcon)`
  top: 60%;
  right: 8%;
  animation-delay: 1s;
`;

const FloatingIcon3 = styled(FloatingIcon)`
  bottom: 20%;
  left: 15%;
  animation-delay: 2s;
`;

const FloatingIcon4 = styled(FloatingIcon)`
  top: 25%;
  right: 15%;
  animation-delay: 3s;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const WhyUsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.space[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const WhyUsItem = styled.article`
  text-align: center;
  padding: ${({ theme }) => theme.space[8]};
  background: rgba(255, 255, 255, 0.03);
  border-radius: ${({ theme }) => theme.radius['2xl']};
  border: 1px solid rgba(255, 255, 255, 0.08);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ${({ theme }) => theme.easing.out},
              transform 0.6s ${({ theme }) => theme.easing.out},
              background 0.3s ease,
              border-color 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.12);
  }

  ${({ $visible }) => $visible && css`
    opacity: 1;
    transform: translateY(0);
  `}

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin-inline: auto;
  margin-block-end: ${({ theme }) => theme.space[6]};
  background: ${({ $gradient }) => $gradient};
  border-radius: ${({ theme }) => theme.radius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px ${({ $color }) => $color}40;
  transition: transform ${({ theme }) => theme.transitions.normal},
              box-shadow ${({ theme }) => theme.transitions.normal};

  i {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.white};
  }

  ${WhyUsItem}:hover & {
    transform: scale(1.1);
    box-shadow: 0 8px 30px ${({ $color }) => $color}60;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 70px;
    height: 70px;

    i {
      font-size: 1.75rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    ${WhyUsItem}:hover & {
      transform: none;
    }
  }
`;

const ItemTitle = styled.h4`
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-block-end: ${({ theme }) => theme.space[3]};
`;

const ItemDescription = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  color: rgba(255, 255, 255, 0.7);
  line-height: ${({ theme }) => theme.fonts.lineHeight.relaxed};
`;

const WhyUs = () => {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <WhyUsSection ref={sectionRef} aria-labelledby="whyus-heading">
      {/* Background decorations */}
      <BackgroundPattern aria-hidden="true" />
      <GlowOrb1 aria-hidden="true" />
      <GlowOrb2 aria-hidden="true" />
      <GlowOrb3 aria-hidden="true" />
      <FloatingIcon1 aria-hidden="true">
        <i className="fas fa-bolt" />
      </FloatingIcon1>
      <FloatingIcon2 aria-hidden="true">
        <i className="fas fa-plug" />
      </FloatingIcon2>
      <FloatingIcon3 aria-hidden="true">
        <i className="fas fa-lightbulb" />
      </FloatingIcon3>
      <FloatingIcon4 aria-hidden="true">
        <i className="fas fa-tools" />
      </FloatingIcon4>

      <ContentWrapper>
        <Container size="xl">
          <SectionHeader
            id="whyus-heading"
            title="Why Choose <span>Sharma Electrical</span>"
            subtitle="We combine technical expertise with honest service to deliver electrical solutions you can trust."
            dark
          />

          <WhyUsGrid role="list">
            {reasons.map((reason, index) => (
              <WhyUsItem
                key={reason.title}
                $visible={isVisible}
                style={{ transitionDelay: `${index * 0.1}s` }}
                role="listitem"
              >
                <IconWrapper $gradient={reason.gradient} $color={reason.color} aria-hidden="true">
                  <i className={reason.icon} />
                </IconWrapper>
                <ItemTitle>{reason.title}</ItemTitle>
                <ItemDescription>{reason.description}</ItemDescription>
              </WhyUsItem>
            ))}
          </WhyUsGrid>
        </Container>
      </ContentWrapper>
    </WhyUsSection>
  );
};

export default WhyUs;
