import styled, { css, keyframes } from 'styled-components';
import { useScrollAnimation } from '../../../hooks';
import Container from '../../ui/Container';
import SectionHeader from '../../ui/SectionHeader';

const services = [
  {
    icon: 'fas fa-home',
    title: 'Residential Wiring',
    description: 'Complete home electrical solutions including new construction wiring, rewiring, upgrades, circuit breaker installations, and safety inspections.',
    features: ['New Construction', 'Rewiring', 'Safety Inspections'],
    color: 'blue',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  },
  {
    icon: 'fas fa-building',
    title: 'Commercial Electrical',
    description: 'Professional electrical services for offices, retail spaces, and industrial facilities. Ensuring compliance with safety codes.',
    features: ['Office Setup', 'Industrial', 'Code Compliance'],
    color: 'purple',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
  },
  {
    icon: 'fas fa-snowflake',
    title: 'AC Installation',
    description: 'Expert installation, maintenance, and repair of split ACs and central air conditioning systems for optimal performance.',
    features: ['Split AC', 'Central Air', 'Maintenance'],
    color: 'cyan',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  },
  {
    icon: 'fas fa-solar-panel',
    title: 'Solar Panel Setup',
    description: 'Complete solar power solutions including panel installation, inverter setup, and grid connection for renewable energy.',
    features: ['Panel Installation', 'Inverter Setup', 'Grid Connection'],
    color: 'green',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
  },
];

const ServicesSection = styled.section`
  padding-block: ${({ theme }) => theme.layout.sectionY};
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.gray[50]} 0%,
    ${({ theme }) => theme.colors.white} 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.gray[200]},
      transparent
    );
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.space[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.article`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius['2xl']};
  padding: ${({ theme }) => theme.space[8]};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s ${({ theme }) => theme.easing.out},
              transform 0.6s ${({ theme }) => theme.easing.out},
              box-shadow 0.3s ease,
              border-color 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.gradients.primary};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    border-color: ${({ theme }) => theme.colors.primaryLight};
    transform: translateY(-8px);

    &::before {
      transform: scaleX(1);
    }
  }

  &:focus-within {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  ${({ $visible }) => $visible && css`
    opacity: 1;
    transform: translateY(0);

    &:hover {
      transform: translateY(-8px);
    }
  `}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.space[6]};
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: box-shadow 0.3s ease, border-color 0.3s ease;

    &:hover {
      transform: none;
    }
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin-inline: auto;
  margin-block-end: ${({ theme }) => theme.space[6]};
  background: ${({ $gradient }) => $gradient || 'linear-gradient(135deg, #f7c51e 0%, #e0b21a 100%)'};
  border-radius: ${({ theme }) => theme.radius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px ${({ $color, theme }) => {
    const colors = {
      blue: 'rgba(59, 130, 246, 0.3)',
      purple: 'rgba(139, 92, 246, 0.3)',
      cyan: 'rgba(6, 182, 212, 0.3)',
      green: 'rgba(34, 197, 94, 0.3)',
    };
    return colors[$color] || 'rgba(247, 197, 30, 0.3)';
  }};
  transition: transform 0.4s ${({ theme }) => theme.easing.spring},
              box-shadow 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: inherit;
    background: ${({ $gradient }) => $gradient || 'linear-gradient(135deg, #f7c51e 0%, #e0b21a 100%)'};
    opacity: 0;
    z-index: -1;
    filter: blur(12px);
    transition: opacity 0.3s ease;
  }

  i {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.white};
    transition: transform 0.3s ease;
  }

  ${ServiceCard}:hover & {
    transform: scale(1.1) rotate(-5deg);
    box-shadow: 0 8px 25px ${({ $color }) => {
      const colors = {
        blue: 'rgba(59, 130, 246, 0.5)',
        purple: 'rgba(139, 92, 246, 0.5)',
        cyan: 'rgba(6, 182, 212, 0.5)',
        green: 'rgba(34, 197, 94, 0.5)',
      };
      return colors[$color] || 'rgba(247, 197, 30, 0.5)';
    }};

    &::after {
      opacity: 0.5;
    }

    i {
      transform: scale(1.1);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 70px;
    height: 70px;

    i {
      font-size: 1.75rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    ${ServiceCard}:hover & {
      transform: none;
    }
  }
`;

const ServiceTitle = styled.h3`
  font-size: ${({ theme }) => theme.fonts.size.lg};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.gray[800]};
  margin-block-end: ${({ theme }) => theme.space[3]};
`;

const ServiceDescription = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.gray[600]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.relaxed};
  margin-block-end: ${({ theme }) => theme.space[6]};
`;

const FeatureList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
`;

const FeatureTag = styled.li`
  font-size: ${({ theme }) => theme.fonts.size.xs};
  color: ${({ theme }) => theme.colors.gray[600]};
  background: ${({ theme }) => theme.colors.gray[100]};
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[3]}`};
  border-radius: ${({ theme }) => theme.radius.full};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  transition: background 0.2s ease, color 0.2s ease;

  ${ServiceCard}:hover & {
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.gray[800]};
  }
`;

const Services = () => {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <ServicesSection id="services" ref={sectionRef} aria-labelledby="services-heading">
      <Container size="xl">
        <SectionHeader
          id="services-heading"
          title="Our <span>Services</span>"
          subtitle="Comprehensive electrical services for homes and businesses in Hyderabad. We handle everything from minor repairs to major installations with precision and care."
        />

        <ServicesGrid role="list">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              $visible={isVisible}
              style={{ transitionDelay: `${index * 0.1}s` }}
              role="listitem"
              tabIndex={0}
            >
              <IconWrapper $gradient={service.gradient} $color={service.color} aria-hidden="true">
                <i className={service.icon} />
              </IconWrapper>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <FeatureList aria-label={`Features of ${service.title}`}>
                {service.features.map((feature) => (
                  <FeatureTag key={feature}>{feature}</FeatureTag>
                ))}
              </FeatureList>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Container>
    </ServicesSection>
  );
};

export default Services;
