import styled, { css } from 'styled-components';
import { useScrollAnimation } from '../../../hooks';
import Container from '../../ui/Container';
import SectionHeader from '../../ui/SectionHeader';

const projects = [
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    alt: 'Residential complex electrical wiring project in Gachibowli, Hyderabad',
    category: 'Residential',
    title: 'Luxury Apartments, Gachibowli',
    description: 'Complete electrical wiring for 200 units',
  },
  {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    alt: 'IT office electrical installation in HITEC City, Hyderabad',
    category: 'Commercial',
    title: 'Tech Park Office, HITEC City',
    description: '50,000 sq.ft commercial installation',
  },
  {
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
    alt: 'Solar panel installation on rooftop in Jubilee Hills',
    category: 'Solar',
    title: 'Solar Setup, Jubilee Hills',
    description: '15kW rooftop solar system',
  },
  {
    image: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=600&q=80',
    alt: 'AC installation at Banjara Hills shopping complex',
    category: 'AC Installation',
    title: 'Shopping Complex, Banjara Hills',
    description: 'Central AC & VRF system installation',
  },
  {
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
    alt: 'Hospital emergency power systems in Secunderabad',
    category: 'Commercial',
    title: 'Multi-Specialty Hospital, Secunderabad',
    description: 'Emergency power & backup systems',
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    alt: 'Smart home electrical installation in Madhapur villa',
    category: 'Residential',
    title: 'Smart Villa, Madhapur',
    description: 'Complete smart home electrical system',
  },
];

const ProjectsSection = styled.section`
  padding-block: ${({ theme }) => theme.space[24]};
  background-color: ${({ theme }) => theme.colors.white};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.space[16]};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space[8]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.article`
  position: relative;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ${({ theme }) => theme.easing.out},
              transform 0.6s ${({ theme }) => theme.easing.out};

  ${({ $visible }) => $visible && css`
    opacity: 1;
    transform: translateY(0);
  `}

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const ProjectImage = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ${({ theme }) => theme.easing.out};
  }

  ${ProjectCard}:hover & img {
    transform: scale(1.1);
  }
`;

const ProjectCategory = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.space[4]};
  left: ${({ theme }) => theme.space[4]};
  background: ${({ theme }) => theme.gradients.primary};
  color: ${({ theme }) => theme.colors.gray[800]};
  padding: ${({ theme }) => `${theme.space[1]} ${theme.space[4]}`};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fonts.size.xs};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  z-index: 1;
`;

const ProjectOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(49, 49, 49, 0.95) 0%,
    rgba(49, 49, 49, 0.6) 50%,
    transparent 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.space[6]};
  opacity: 0;
  transition: opacity 0.4s ${({ theme }) => theme.easing.out};

  ${ProjectCard}:hover &,
  ${ProjectCard}:focus & {
    opacity: 1;
  }

  h4 {
    font-size: ${({ theme }) => theme.fonts.size.md};
    font-weight: ${({ theme }) => theme.fonts.weight.semibold};
    color: ${({ theme }) => theme.colors.white};
    margin-block-end: ${({ theme }) => theme.space[2]};
  }

  span {
    font-size: ${({ theme }) => theme.fonts.size.sm};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Projects = () => {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <ProjectsSection id="projects" ref={sectionRef}>
      <Container size="xl">
        <SectionHeader
          title="Our Recent <span>Projects</span>"
          subtitle="A glimpse of our completed electrical installations across Hyderabad. From residential homes to commercial complexes."
        />

        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              $visible={isVisible}
              style={{ transitionDelay: `${index * 0.1}s` }}
              tabIndex={0}
              role="figure"
              aria-label={`${project.title} - ${project.description}`}
            >
              <ProjectImage>
                <img src={project.image} alt={project.alt} loading="lazy" />
              </ProjectImage>
              <ProjectCategory>{project.category}</ProjectCategory>
              <ProjectOverlay>
                <h4>{project.title}</h4>
                <span>{project.description}</span>
              </ProjectOverlay>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
