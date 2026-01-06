import { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import Button from "../../ui/Button";

const navLinks = [
  { to: "/home", label: "Home", section: "home" },
  { to: "/about", label: "About Us", section: "about" },
  { to: "/services", label: "Services", section: "services" },
  { to: "/projects", label: "Our Work", section: "projects" },
  { to: "/testimonials", label: "Reviews", section: "testimonials" },
  { to: "/contact", label: "Contact", section: "contact" },
];

// Animations
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  transition: transform ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal};

  ${({ $hidden }) =>
    $hidden &&
    css`
      transform: translateY(-100%);
    `}
`;

const TopBar = styled.div`
  background: ${({ theme }) => theme.gradients.dark};
  padding-block: ${({ theme }) => theme.space[2]};
  transition: transform ${({ theme }) => theme.transitions.normal},
    opacity ${({ theme }) => theme.transitions.normal},
    max-height ${({ theme }) => theme.transitions.normal};
  max-height: 50px;
  overflow: hidden;

  ${({ $scrolled }) =>
    $scrolled &&
    css`
      max-height: 0;
      padding-block: 0;
      opacity: 0;
    `}
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: 0;
  }
`;

const TopBarContent = styled.div`
  max-width: ${({ theme }) => theme.layout.containerMax};
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.layout.containerPadding};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
    gap: ${({ theme }) => theme.space[2]};
    text-align: center;
  }
`;

const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[8]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.space[2]};
  }
`;

const WelcomeText = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.xs};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  letter-spacing: ${({ theme }) => theme.fonts.letterSpacing.wide};
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const TopBarPhone = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fonts.size.xs};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  transition: color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.white};
    transform: scale(1.02);
  }

  i {
    font-size: 0.875em;
  }
`;

const TopBarRight = styled.p`
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: ${({ theme }) => theme.fonts.size.xs};
  font-style: italic;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const HeaderMain = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(${({ theme }) => theme.blur.lg});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.blur.lg});
  transition: all ${({ theme }) => theme.transitions.normal};
  border-bottom: 1px solid transparent;

  ${({ $scrolled }) =>
    $scrolled &&
    css`
      background-color: rgba(255, 255, 255, 0.98);
      box-shadow: ${({ theme }) => theme.shadows.md};
      border-bottom-color: ${({ theme }) => theme.colors.gray[100]};
    `}
`;

const HeaderContainer = styled.div`
  max-width: ${({ theme }) => theme.layout.containerMax};
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.layout.containerPadding};
  padding-block: ${({ theme }) => theme.space[4]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-block: ${({ theme }) => theme.space[3]};
  }
`;

const Logo = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  text-decoration: none;
  outline-offset: 4px;
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
  transition: transform ${({ theme }) => theme.transitions.spring},
    box-shadow ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  ${Logo}:hover &,
  ${Logo}:focus-visible & {
    transform: scale(1.08) rotate(-5deg);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 42px;
    height: 42px;
    font-size: 1.25rem;
  }
`;

const LogoText = styled.div`
  font-size: ${({ theme }) => theme.fonts.size.md};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.gray[800]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.tight};

  span {
    display: block;
    font-size: ${({ theme }) => theme.fonts.size.xs};
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
    color: ${({ theme }) => theme.colors.primary};
    letter-spacing: ${({ theme }) => theme.fonts.letterSpacing.wide};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fonts.size.base};
  }
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const StyledNavLink = styled.a`
  position: relative;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.gray[700]};
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[4]}`};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: color ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.gradients.primary};
    border-radius: ${({ theme }) => theme.radius.full};
    transition: width ${({ theme }) => theme.transitions.normal},
      left ${({ theme }) => theme.transitions.normal};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.gray[800]};
    background-color: ${({ theme }) => theme.colors.gray[50]};
  }

  &:hover::after {
    width: 60%;
    left: 20%;
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  }

  &.active::after {
    width: 60%;
    left: 20%;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const HeaderCta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const HeaderPhone = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.colors.gray[700]};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  padding: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: color ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }

  i {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.1em;
  }
`;

const MobileToggle = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  cursor: pointer;
  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }

  i {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.gray[800]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
  }
`;

const MobileMenuOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(${({ theme }) => theme.blur.sm});
  z-index: ${({ theme }) => theme.zIndex.modal - 1};
  opacity: 0;
  visibility: hidden;
  transition: opacity ${({ theme }) => theme.transitions.normal},
    visibility ${({ theme }) => theme.transitions.normal};

  ${({ $open }) =>
    $open &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: min(350px, 90vw);
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.space[6]};
  padding-top: ${({ theme }) => theme.space[20]};
  transform: translateX(100%);
  transition: transform ${({ theme }) => theme.transitions.slow};
  z-index: ${({ theme }) => theme.zIndex.modal};
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.shadows["2xl"]};

  ${({ $open }) =>
    $open &&
    css`
      transform: translateX(0);
    `}
`;

const MobileCloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.space[4]};
  right: ${({ theme }) => theme.space[4]};
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.gray[100]};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.gray[200]};
  }

  i {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.gray[800]};
  }
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
`;

const MobileNavLink = styled.a`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.size.md};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.gray[700]};
  padding: ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.radius.lg};
  transition: color ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};
  animation: ${slideDown} 0.3s ease backwards;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
    transform: translateX(8px);
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primaryLight};
    font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  }
`;

const MobileContact = styled.div`
  margin-top: ${({ theme }) => theme.space[8]};
  padding-top: ${({ theme }) => theme.space[8]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
`;

const MobilePhone = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fonts.size.md};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  color: ${({ theme }) => theme.colors.gray[800]};
  padding: ${({ theme }) => theme.space[3]};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }

  i {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.gradients.primary};
    border-radius: ${({ theme }) => theme.radius.md};
    color: ${({ theme }) => theme.colors.gray[800]};
  }
`;

const MobileSocial = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
  margin-top: ${({ theme }) => theme.space[4]};
`;

const SocialLink = styled.a`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  color: ${({ theme }) => theme.colors.gray[600]};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 1.125rem;
  transition: background-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.gray[800]};
    transform: translateY(-2px);
  }
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const location = useLocation();

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);

      // Hide/show header on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => link.section);
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection(sections[0]);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle nav click with smooth scroll
  const handleNavClick = useCallback((e, section) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const element = document.getElementById(section);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <HeaderWrapper $hidden={isHidden && !isMobileMenuOpen}>
      <TopBar $scrolled={isScrolled}>
        <TopBarContent>
          <TopBarLeft>
            <WelcomeText>Welcome to Sharma Electrical</WelcomeText>
            <TopBarPhone
              href="tel:+919876543210"
              aria-label="Call us at +91 9876543210"
            >
              <i className="fas fa-phone-alt" aria-hidden="true" />
              <span>+91 9876543210</span>
            </TopBarPhone>
          </TopBarLeft>
          <TopBarRight>"Always Committed to Integrity"</TopBarRight>
        </TopBarContent>
      </TopBar>

      <HeaderMain $scrolled={isScrolled}>
        <HeaderContainer>
          <Logo
            to="/home"
            onClick={(e) => handleNavClick(e, "home")}
            aria-label="Sharma Electrical Services - Home"
          >
            <LogoIcon>
              <i className="fas fa-bolt" aria-hidden="true" />
            </LogoIcon>
            <LogoText>
              Sharma Electrical
              <span>Services</span>
            </LogoText>
          </Logo>

          <NavMenu role="navigation" aria-label="Main navigation">
            {navLinks.map(({ to, label, section }) => (
              <StyledNavLink
                key={section}
                href={to}
                onClick={(e) => handleNavClick(e, section)}
                className={activeSection === section ? "active" : ""}
                aria-current={activeSection === section ? "page" : undefined}
              >
                {label}
              </StyledNavLink>
            ))}
          </NavMenu>

          <HeaderCta>
            <Button
              href="/contact"
              size="sm"
              onClick={(e) => handleNavClick(e, "contact")}
            >
              Get Quote
            </Button>
          </HeaderCta>

          <MobileToggle
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <i className="fas fa-bars" aria-hidden="true" />
          </MobileToggle>
        </HeaderContainer>
      </HeaderMain>

      <MobileMenuOverlay
        $open={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <MobileMenu
        $open={isMobileMenuOpen}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <MobileCloseButton
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close navigation menu"
          tabIndex={isMobileMenuOpen ? 0 : -1}
        >
          <i className="fas fa-xmark" aria-hidden="true" />
        </MobileCloseButton>

        <MobileNav role="navigation" aria-label="Mobile navigation">
          {navLinks.map(({ to, label, section }, index) => (
            <MobileNavLink
              key={section}
              href={to}
              onClick={(e) => handleNavClick(e, section)}
              className={activeSection === section ? "active" : ""}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              style={{ animationDelay: `${index * 0.05}s` }}
              aria-current={activeSection === section ? "page" : undefined}
            >
              {label}
            </MobileNavLink>
          ))}
        </MobileNav>

        <MobileContact>
          <MobilePhone
            href="tel:+919876543210"
            tabIndex={isMobileMenuOpen ? 0 : -1}
            aria-label="Call us at +91 9876543210"
          >
            <i className="fas fa-phone-alt" aria-hidden="true" />
            <span>+91 9876543210</span>
          </MobilePhone>

          <Button
            href="/contact"
            fullWidth
            onClick={(e) => handleNavClick(e, "contact")}
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            Get Free Quote
          </Button>

          <MobileSocial>
            <SocialLink
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              <i className="fab fa-facebook-f" aria-hidden="true" />
            </SocialLink>
            <SocialLink
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram page"
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              <i className="fab fa-instagram" aria-hidden="true" />
            </SocialLink>
            <SocialLink
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on WhatsApp"
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              <i className="fab fa-whatsapp" aria-hidden="true" />
            </SocialLink>
          </MobileSocial>
        </MobileContact>
      </MobileMenu>
    </HeaderWrapper>
  );
};

export default Header;
