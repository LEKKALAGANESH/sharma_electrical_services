import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useReducedMotion } from "../../../hooks";
import Button from "../../ui/Button";

const stats = [
  {
    number: 14,
    suffix: "+",
    label: "Years Experience",
    icon: "fa-calendar-check",
  },
  { number: 5000, suffix: "+", label: "Projects Completed", icon: "fa-tasks" },
  { number: 100, suffix: "%", label: "Client Satisfaction", icon: "fa-heart" },
];

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const bounceDown = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(12px);
  }
  60% {
    transform: translateY(6px);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(3deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Styled Components
const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space[32]}
    ${({ theme }) => theme.layout.containerPadding};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.space[24]};
    min-height: auto;
    padding-top: 120px;
    padding-bottom: ${({ theme }) => theme.space[16]};
  }
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  background-image: url("https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&q=80");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  will-change: transform;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.gradients.hero};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    &::after {
      background: ${({ theme }) => theme.gradients.heroMobile};
    }
  }
`;

const ParticleOverlay = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const Particle = styled.div`
  position: absolute;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.full};
  opacity: ${({ $opacity }) => $opacity};
  animation: ${float} ${({ $duration }) => $duration}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  left: ${({ $left }) => $left}%;
  top: ${({ $top }) => $top}%;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 900px;
  text-align: center;
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  background: rgba(23, 23, 23, 0.6);
  backdrop-filter: blur(${({ theme }) => theme.blur.md});
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[6]}`};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  margin-block-end: ${({ theme }) => theme.space[6]};
  border: 1px solid rgba(247, 197, 30, 0.4);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  opacity: 0;
  animation: ${fadeInDown} 0.8s ${({ theme }) => theme.easing.out} forwards;
  animation-delay: 0.2s;

  i {
    font-size: 0.9em;
    animation: ${pulse} 2s ease-in-out infinite;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fonts.size.xs};
    padding: ${({ theme }) => `${theme.space[1.5]} ${theme.space[4]}`};
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
    i {
      animation: none;
    }
  }
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fonts.size["3xl"]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.white};
  line-height: ${({ theme }) => theme.fonts.lineHeight.tight};
  margin-block-end: ${({ theme }) => theme.space[6]};
  letter-spacing: ${({ theme }) => theme.fonts.letterSpacing.tight};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5), 0 4px 20px rgba(0, 0, 0, 0.3);
  opacity: 0;
  animation: ${fadeInUp} 0.8s ${({ theme }) => theme.easing.out} forwards;
  animation-delay: 0.4s;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fonts.size["2xl"]};
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: 0.1em;
    left: 0;
    right: 0;
    height: 0.15em;
    background: ${({ theme }) => theme.colors.primaryLight};
    border-radius: ${({ theme }) => theme.radius.full};
    z-index: -1;
  }
`;

const HeroDescription = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.md};
  color: rgba(255, 255, 255, 0.95);
  line-height: ${({ theme }) => theme.fonts.lineHeight.relaxed};
  margin-block-end: ${({ theme }) => theme.space[10]};
  max-width: 700px;
  margin-inline: auto;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.4), 0 2px 15px rgba(0, 0, 0, 0.25);
  opacity: 0;
  animation: ${fadeInUp} 0.8s ${({ theme }) => theme.easing.out} forwards;
  animation-delay: 0.5s;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fonts.size.base};
    margin-block-end: ${({ theme }) => theme.space[8]};
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.space[4]};
  margin-block-end: ${({ theme }) => theme.space[16]};
  opacity: 0;
  animation: ${fadeInUp} 0.8s ${({ theme }) => theme.easing.out} forwards;
  animation-delay: 0.6s;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.space[3]};
    margin-block-end: ${({ theme }) => theme.space[12]};

    & > * {
      width: 100%;
      max-width: 300px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

const HeroStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space[8]};
  max-width: 700px;
  margin-inline: auto;
  opacity: 0;
  animation: ${scaleIn} 0.8s ${({ theme }) => theme.easing.out} forwards;
  animation-delay: 0.8s;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.space[4]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.space[6]};
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.space[6]};
  background: rgba(23, 23, 23, 0.65);
  backdrop-filter: blur(${({ theme }) => theme.blur.md});
  border-radius: ${({ theme }) => theme.radius.xl};
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  transition: transform ${({ theme }) => theme.transitions.normal},
    background ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
    background: rgba(23, 23, 23, 0.75);
    border-color: ${({ theme }) => theme.colors.primaryLight};
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.space[4]};
    flex-direction: row;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space[4]};
    text-align: left;
  }
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.gradients.primary};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.space[3]};
  color: ${({ theme }) => theme.colors.gray[800]};
  font-size: 1.25rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 0;
    flex-shrink: 0;
    width: 44px;
    height: 44px;
  }
`;

const StatContent = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex: 1;
  }
`;

const StatNumber = styled.div`
  font-size: ${({ theme }) => theme.fonts.size["2xl"]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
  font-variant-numeric: tabular-nums;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fonts.size.xl};
  }
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  color: rgba(255, 255, 255, 0.7);
  margin-top: ${({ theme }) => theme.space[1]};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 0;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.space[8]};
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  opacity: 0;
  animation: fadeIn 0.6s ${({ theme }) => theme.easing.out} 1.2s forwards;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

const ScrollLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  color: rgba(255, 255, 255, 0.6);
  padding: ${({ theme }) => theme.space[3]};
  border-radius: ${({ theme }) => theme.radius.lg};
  transition: color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.primary};
    background: rgba(255, 255, 255, 0.05);
  }

  span {
    font-size: ${({ theme }) => theme.fonts.size.xs};
    text-transform: uppercase;
    letter-spacing: ${({ theme }) => theme.fonts.letterSpacing.widest};
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
  }

  i {
    font-size: 1.5rem;
    animation: ${bounceDown} 2s infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`;

// Animated Counter Component
const AnimatedNumber = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || prefersReducedMotion) {
      setCount(value);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value, prefersReducedMotion]);

  return (
    <StatNumber ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </StatNumber>
  );
};

// Particle Generator
const generateParticles = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 4 + 4,
    delay: Math.random() * 2,
    opacity: Math.random() * 0.3 + 0.1,
  }));
};

const Hero = () => {
  const [particles] = useState(() => generateParticles(12));
  const prefersReducedMotion = useReducedMotion();

  const handleScrollClick = (e) => {
    e.preventDefault();
    const element = document.getElementById("about");
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <HeroSection id="home" aria-label="Welcome to Sharma Electrical Services">
      <HeroBg role="img" aria-label="Professional electrician at work" />

      {!prefersReducedMotion && (
        <ParticleOverlay aria-hidden="true">
          {particles.map((p) => (
            <Particle
              key={p.id}
              $size={p.size}
              $left={p.left}
              $top={p.top}
              $duration={p.duration}
              $delay={p.delay}
              $opacity={p.opacity}
            />
          ))}
        </ParticleOverlay>
      )}

      <HeroContent>
        <HeroBadge>
          <i className="fas fa-certificate" aria-hidden="true" />
          Licensed & Insured Electricians
        </HeroBadge>

        <HeroTitle>
          Trusted <Highlight>Electrical Solutions</Highlight> Since 2010
        </HeroTitle>

        <HeroDescription>
          From residential wiring to commercial installations, solar setups to
          AC services — Sharma Electrical Services delivers safe, reliable, and
          professional electrical work across Hyderabad. Quality you can trust,
          service you can count on.
        </HeroDescription>

        <HeroButtons>
          <Button
            href="/contact"
            size="lg"
            icon={<i className="fas fa-file-alt" aria-hidden="true" />}
          >
            Request Free Quote
          </Button>
          <Button
            href="/services"
            variant="outline"
            size="lg"
            icon={<i className="fas fa-bolt" aria-hidden="true" />}
          >
            Explore Services
          </Button>
        </HeroButtons>

        <HeroStats role="list" aria-label="Company statistics">
          {stats.map(({ number, suffix, label, icon }) => (
            <StatItem key={label} role="listitem">
              <StatIcon aria-hidden="true">
                <i className={`fas ${icon}`} />
              </StatIcon>
              <StatContent>
                <AnimatedNumber value={number} suffix={suffix} />
                <StatLabel>{label}</StatLabel>
              </StatContent>
            </StatItem>
          ))}
        </HeroStats>
      </HeroContent>

      <ScrollIndicator>
        <ScrollLink
          href="/about"
          onClick={handleScrollClick}
          aria-label="Scroll down to learn more about us"
        >
          <span>Scroll</span>
          <i className="fas fa-chevron-down" aria-hidden="true" />
        </ScrollLink>
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero;
