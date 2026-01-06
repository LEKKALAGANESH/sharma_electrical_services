import styled, { css, keyframes } from "styled-components";
import { useScrollAnimation } from "../../../hooks";

const quickLinks = [
  { href: "/home", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/projects", label: "Recent Projects" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact Us" },
];

const serviceLinks = [
  { href: "/services", label: "Residential Wiring" },
  { href: "/services", label: "Commercial Electrical" },
  { href: "/services", label: "AC Installation" },
  { href: "/services", label: "Solar Panel Setup" },
  { href: "/services", label: "Electrical Repairs" },
  { href: "/services", label: "Safety Inspections" },
];

const socialLinks = [
  {
    href: "https://facebook.com",
    icon: "fab fa-facebook-f",
    label: "Facebook",
    color: "#1877f2",
  },
  {
    href: "https://instagram.com",
    icon: "fab fa-instagram",
    label: "Instagram",
    color: "#e4405f",
  },
  {
    href: "https://wa.me/919876543210",
    icon: "fab fa-whatsapp",
    label: "WhatsApp",
    color: "#25d366",
  },
  {
    href: "https://linkedin.com",
    icon: "fab fa-linkedin-in",
    label: "LinkedIn",
    color: "#0a66c2",
  },
];

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const underlineExpand = keyframes`
  from {
    width: 0;
  }
  to {
    width: 40px;
  }
`;

// Styled Components
const FooterWrapper = styled.footer`
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.gray[800]} 0%,
    ${({ theme }) => theme.colors.gray[900]} 100%
  );
  color: ${({ theme }) => theme.colors.white};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.primary}40,
      transparent
    );
  }
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.layout.containerMax};
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.layout.containerPadding};
`;

const FooterMain = styled.div`
  padding-block: ${({ theme }) => `${theme.space[20]} ${theme.space[12]}`};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => `${theme.space[12]} ${theme.space[8]}`};
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  gap: ${({ theme }) => theme.space[12]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.space[8]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.space[8]};
  }
`;

const FooterBrand = styled.div`
  max-width: 320px;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}

  & > p {
    font-size: ${({ theme }) => theme.fonts.size.sm};
    color: rgba(255, 255, 255, 0.7);
    line-height: ${({ theme }) => theme.fonts.lineHeight.relaxed};
    margin-block-end: ${({ theme }) => theme.space[6]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: 1 / -1;
    max-width: 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
  }
`;

const Logo = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  margin-block-end: ${({ theme }) => theme.space[6]};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }
`;

const LogoIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.gradients.primary};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray[800]};
  font-size: 1.5rem;
  box-shadow: 0 4px 15px rgba(247, 197, 30, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  ${Logo}:hover & {
    transform: rotate(-10deg) scale(1.1);
    box-shadow: 0 6px 20px rgba(247, 197, 30, 0.4);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }

  @media (prefers-reduced-motion: reduce) {
    ${Logo}:hover & {
      transform: none;
    }
  }
`;

const LogoText = styled.div`
  font-size: ${({ theme }) => theme.fonts.size.md};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.2;

  span {
    display: block;
    font-size: ${({ theme }) => theme.fonts.size.xs};
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
    color: ${({ theme }) => theme.colors.primary};
    letter-spacing: 0.05em;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fonts.size.base};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ $color }) => $color};
    transform: scale(0);
    border-radius: inherit;
    transition: transform 0.3s ease;
    z-index: 0;
  }

  i {
    position: relative;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px ${({ $color }) => $color}40;

    &::before {
      transform: scale(1);
    }
  }

  &:active {
    transform: translateY(-2px);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
    &::before {
      transition: none;
    }
  }
`;

const FooterLinksSection = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: ${({ $delay }) => $delay || "0s"};

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
  }
`;

const FooterHeading = styled.h4`
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  color: ${({ theme }) => theme.colors.white};
  margin-block-end: ${({ theme }) => theme.space[6]};
  position: relative;
  padding-block-end: ${({ theme }) => theme.space[4]};

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.gradients.primary};
    border-radius: ${({ theme }) => theme.radius.full};
    transition: width 0.5s ease;
  }

  ${FooterLinksSection}[data-visible="true"] &::after {
    width: 40px;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      width: 40px;
    }
  }
`;

const FooterLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`;

const FooterLink = styled.li`
  a {
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.space[2]};
    font-size: ${({ theme }) => theme.fonts.size.sm};
    color: rgba(255, 255, 255, 0.7);
    padding-block: ${({ theme }) => theme.space[1]};
    position: relative;
    transition: color 0.2s ease, transform 0.2s ease;

    &::before {
      content: "";
      width: 0;
      height: 1px;
      background: ${({ theme }) => theme.colors.primary};
      transition: width 0.2s ease;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      transform: translateX(8px);

      &::before {
        width: 12px;
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    a:hover {
      transform: none;
    }
  }
`;

const FooterContact = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: 0.3s;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space[4]};
  margin-block-end: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  i {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.radius.md};
    font-size: ${({ theme }) => theme.fonts.size.sm};
    flex-shrink: 0;
    transition: transform 0.2s ease, background 0.2s ease;
  }

  &:hover i {
    transform: scale(1.1);
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.gray[800]};
  }

  a,
  p {
    font-size: ${({ theme }) => theme.fonts.size.sm};
    color: rgba(255, 255, 255, 0.7);
    transition: color 0.2s ease;
    padding-top: 6px;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover i {
      transform: none;
    }
  }
`;

const FooterBottom = styled.div`
  padding-block: ${({ theme }) => theme.space[6]};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
`;

const FooterBottomContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.space[6]};
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  color: rgba(255, 255, 255, 0.5);

  span {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
  }
`;

const BackToTop = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  color: rgba(255, 255, 255, 0.6);
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: rgba(255, 255, 255, 0.05);
  }

  i {
    transition: transform 0.2s ease;
  }

  &:hover i {
    transform: translateY(-3px);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover i {
      transform: none;
    }
  }
`;

const Footer = () => {
  const [footerRef, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FooterWrapper role="contentinfo" ref={footerRef}>
      <FooterMain>
        <Container>
          <FooterGrid>
            <FooterBrand $visible={isVisible}>
              <Logo href="/home" aria-label="Sharma Electrical Services - Home">
                <LogoIcon>
                  <i className="fas fa-bolt" aria-hidden="true" />
                </LogoIcon>
                <LogoText>
                  Sharma Electrical
                  <span>Services</span>
                </LogoText>
              </Logo>
              <p>
                Trusted electrical solutions since 2010. We provide reliable,
                safe, and professional electrical services for residential and
                commercial clients across Hyderabad.
              </p>
              <SocialLinks>
                {socialLinks.map(({ href, icon, label, color }) => (
                  <SocialLink
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${label}`}
                    $color={color}
                  >
                    <i className={icon} aria-hidden="true" />
                  </SocialLink>
                ))}
              </SocialLinks>
            </FooterBrand>

            <FooterLinksSection
              $visible={isVisible}
              $delay="0.1s"
              data-visible={isVisible}
            >
              <FooterHeading>Quick Links</FooterHeading>
              <FooterLinks>
                {quickLinks.map(({ href, label }) => (
                  <FooterLink key={label}>
                    <a href={href}>{label}</a>
                  </FooterLink>
                ))}
              </FooterLinks>
            </FooterLinksSection>

            <FooterLinksSection
              $visible={isVisible}
              $delay="0.2s"
              data-visible={isVisible}
            >
              <FooterHeading>Our Services</FooterHeading>
              <FooterLinks>
                {serviceLinks.map(({ href, label }) => (
                  <FooterLink key={label}>
                    <a href={href}>{label}</a>
                  </FooterLink>
                ))}
              </FooterLinks>
            </FooterLinksSection>

            <FooterContact $visible={isVisible}>
              <FooterHeading>Contact Us</FooterHeading>
              <ContactItem>
                <i className="fas fa-phone-alt" aria-hidden="true" />
                <a href="tel:9876543210">+91 9876543210</a>
              </ContactItem>
              <ContactItem>
                <i className="fas fa-envelope" aria-hidden="true" />
                <a href="mailto:info@sharmaelectrical.in">
                  info@sharmaelectrical.in
                </a>
              </ContactItem>
              <ContactItem>
                <i className="fas fa-map-marker-alt" aria-hidden="true" />
                <p>Hyderabad, Telangana, India</p>
              </ContactItem>
              <ContactItem>
                <i className="fas fa-clock" aria-hidden="true" />
                <p>Mon - Sat: 8AM - 7PM</p>
              </ContactItem>
            </FooterContact>
          </FooterGrid>
        </Container>
      </FooterMain>

      <FooterBottom>
        <Container>
          <FooterBottomContent>
            <Copyright>
              &copy; {currentYear} <span>Sharma Electrical Services</span>. All
              Rights Reserved.
            </Copyright>
            <BackToTop onClick={scrollToTop} aria-label="Back to top">
              <span>Back to Top</span>
              <i className="fas fa-arrow-up" aria-hidden="true" />
            </BackToTop>
          </FooterBottomContent>
        </Container>
      </FooterBottom>
    </FooterWrapper>
  );
};

export default Footer;
