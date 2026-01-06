import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';
import { FloatingElements } from '../../ui';
import { useScrollProgress } from '../../../hooks';

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding-top: ${({ theme }) => theme.layout.headerHeight};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: ${({ theme }) => theme.layout.headerHeightMobile};
  }
`;

const SkipLink = styled.a`
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.gray[800]};
  padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[6]};
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  z-index: ${({ theme }) => theme.zIndex.max};
  transition: top 0.3s ease;
  text-decoration: none;

  &:focus {
    top: ${({ theme }) => theme.space[4]};
  }
`;

const ScrollProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: ${({ theme }) => theme.gradients.primary};
  z-index: ${({ theme }) => theme.zIndex.max};
  transition: width 0.1s linear;
  width: ${({ $progress }) => `${$progress * 100}%`};
`;

const Layout = ({ children }) => {
  const location = useLocation();
  const scrollProgress = useScrollProgress();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle hash navigation
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <LayoutWrapper>
      <SkipLink href="#main-content">
        Skip to main content
      </SkipLink>
      <ScrollProgressBar $progress={scrollProgress} aria-hidden="true" />
      <Header />
      <Main id="main-content" role="main">
        {children}
      </Main>
      <Footer />
      <FloatingElements />
    </LayoutWrapper>
  );
};

export default Layout;
