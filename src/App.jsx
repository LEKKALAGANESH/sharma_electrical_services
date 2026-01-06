import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import {
  Hero,
  Comparison,
  About,
  Services,
  WhyUs,
  Projects,
  Testimonials,
  CTA,
  Contact,
} from './components/sections';

/**
 * Home Page Component
 * Composes all sections for the landing page
 */
const HomePage = () => (
  <>
    <Hero />
    <Comparison />
    <About />
    <Services />
    <WhyUs />
    <Projects />
    <Testimonials />
    <CTA />
    <Contact />
  </>
);

/**
 * Main Application Component
 * Sets up routing and layout structure
 */
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      {/* Future routes can be added here */}
      {/* <Route path="/services" element={<Layout><ServicesPage /></Layout>} /> */}
      {/* <Route path="/about" element={<Layout><AboutPage /></Layout>} /> */}
      {/* <Route path="/contact" element={<Layout><ContactPage /></Layout>} /> */}
    </Routes>
  );
}

export default App;
