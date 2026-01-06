import styled, { css } from 'styled-components';
import { useScrollAnimation } from '../../../hooks';
import Container from '../../ui/Container';
import SectionHeader from '../../ui/SectionHeader';

const testimonials = [
  {
    stars: 5,
    text: '"Sharma Electrical rewired our entire 3BHK apartment in just 4 days. The team was professional, clean, and their attention to detail was impressive. Highly recommended for any electrical work!"',
    initials: 'RK',
    name: 'Rajesh Kumar',
    role: 'Homeowner, Kondapur',
  },
  {
    stars: 5,
    text: '"We hired them for our office electrical installation. They handled everything from power distribution to network cabling flawlessly. The project was completed on time and within budget."',
    initials: 'PS',
    name: 'Priya Sharma',
    role: 'Business Owner, HITEC City',
  },
  {
    stars: 5,
    text: '"Our solar panel installation was handled expertly by the Sharma team. They explained everything clearly, helped with subsidy paperwork, and the system is performing even better than expected!"',
    initials: 'VM',
    name: 'Venkat Murthy',
    role: 'Homeowner, Jubilee Hills',
  },
];

const TestimonialsSection = styled.section`
  padding-block: ${({ theme }) => theme.space[24]};
  background-color: ${({ theme }) => theme.colors.gray[100]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.space[16]};
  }
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space[8]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled.article`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.space[8]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ${({ theme }) => theme.easing.out},
              transform 0.6s ${({ theme }) => theme.easing.out},
              box-shadow 0.3s ${({ theme }) => theme.easing.out};

  ${({ $visible }) => $visible && css`
    opacity: 1;
    transform: translateY(0);
  `}

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.space[6]};
  }
`;

const Stars = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[1]};
  margin-block-end: ${({ theme }) => theme.space[4]};

  i {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fonts.size.sm};
  }
`;

const TestimonialText = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.base};
  color: ${({ theme }) => theme.colors.gray[600]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.relaxed};
  font-style: italic;
  margin-block-end: ${({ theme }) => theme.space[6]};
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.gradients.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.gray[800]};
`;

const AuthorInfo = styled.div`
  h5 {
    font-size: ${({ theme }) => theme.fonts.size.sm};
    font-weight: ${({ theme }) => theme.fonts.weight.semibold};
    color: ${({ theme }) => theme.colors.gray[800]};
    margin-block-end: ${({ theme }) => theme.space[1]};
  }

  span {
    font-size: ${({ theme }) => theme.fonts.size.xs};
    color: ${({ theme }) => theme.colors.gray[500]};
  }
`;

const Testimonials = () => {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <TestimonialsSection id="testimonials" ref={sectionRef}>
      <Container size="xl">
        <SectionHeader
          title="What Our <span>Clients Say</span>"
          subtitle="Don't just take our word for it. Here's what our valued customers have to say about their experience with Sharma Electrical Services."
        />

        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              $visible={isVisible}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <Stars aria-label={`${testimonial.stars} out of 5 stars`}>
                {[...Array(testimonial.stars)].map((_, i) => (
                  <i key={i} className="fas fa-star" aria-hidden="true" />
                ))}
              </Stars>
              <TestimonialText>{testimonial.text}</TestimonialText>
              <Author>
                <Avatar aria-hidden="true">{testimonial.initials}</Avatar>
                <AuthorInfo>
                  <h5>{testimonial.name}</h5>
                  <span>{testimonial.role}</span>
                </AuthorInfo>
              </Author>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </Container>
    </TestimonialsSection>
  );
};

export default Testimonials;
