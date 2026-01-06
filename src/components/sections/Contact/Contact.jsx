import { useState } from 'react';
import styled, { css } from 'styled-components';
import { useScrollAnimation } from '../../../hooks';
import Container from '../../ui/Container';
import SectionHeader from '../../ui/SectionHeader';
import Button from '../../ui/Button';

const contactInfo = [
  {
    icon: 'fas fa-phone-alt',
    title: 'Phone',
    content: <a href="tel:9876543210">+91 9876543210</a>,
  },
  {
    icon: 'fas fa-envelope',
    title: 'Email',
    content: <a href="mailto:info@sharmaelectrical.in">info@sharmaelectrical.in</a>,
  },
  {
    icon: 'fas fa-map-marker-alt',
    title: 'Location',
    content: <p>Hyderabad, Telangana, India</p>,
  },
  {
    icon: 'fas fa-clock',
    title: 'Working Hours',
    content: <p>Monday - Saturday: 8:00 AM - 7:00 PM<br />Sunday: Emergency calls only</p>,
  },
];

const socialLinks = [
  { href: 'https://facebook.com', icon: 'fab fa-facebook-f', label: 'Facebook' },
  { href: 'https://instagram.com', icon: 'fab fa-instagram', label: 'Instagram' },
  { href: 'https://wa.me/919876543210', icon: 'fab fa-whatsapp', label: 'WhatsApp' },
  { href: 'https://linkedin.com', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
];

const services = [
  { value: '', label: 'Select a service...' },
  { value: 'residential', label: 'Residential Wiring' },
  { value: 'commercial', label: 'Commercial Electrical' },
  { value: 'ac', label: 'AC Installation & Repair' },
  { value: 'solar', label: 'Solar Panel Installation' },
  { value: 'other', label: 'Other / Not Sure' },
];

const ContactSection = styled.section`
  padding-block: ${({ theme }) => theme.space[24]};
  background-color: ${({ theme }) => theme.colors.gray[100]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.space[16]};
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: ${({ theme }) => theme.space[12]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.8s ${({ theme }) => theme.easing.out},
              transform 0.8s ${({ theme }) => theme.easing.out};

  ${({ $visible }) => $visible && css`
    opacity: 1;
    transform: translateX(0);
  `}

  h3 {
    font-size: ${({ theme }) => theme.fonts.size.xl};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    color: ${({ theme }) => theme.colors.gray[800]};
    margin-block-end: ${({ theme }) => theme.space[4]};
  }

  & > p {
    font-size: ${({ theme }) => theme.fonts.size.base};
    color: ${({ theme }) => theme.colors.gray[600]};
    line-height: ${({ theme }) => theme.fonts.lineHeight.relaxed};
    margin-block-end: ${({ theme }) => theme.space[8]};
  }
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[6]};
  margin-block-end: ${({ theme }) => theme.space[8]};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space[4]};
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ${({ theme }) => theme.easing.out},
              transform 0.5s ${({ theme }) => theme.easing.out};

  ${({ $visible }) => $visible && css`
    opacity: 1;
    transform: translateY(0);
  `}

  i {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.gradients.primary};
    border-radius: ${({ theme }) => theme.radius.md};
    color: ${({ theme }) => theme.colors.gray[800]};
    font-size: ${({ theme }) => theme.fonts.size.md};
    flex-shrink: 0;
  }
`;

const ContactItemText = styled.div`
  h4 {
    font-size: ${({ theme }) => theme.fonts.size.sm};
    font-weight: ${({ theme }) => theme.fonts.weight.semibold};
    color: ${({ theme }) => theme.colors.gray[800]};
    margin-block-end: ${({ theme }) => theme.space[1]};
  }

  a, p {
    font-size: ${({ theme }) => theme.fonts.size.sm};
    color: ${({ theme }) => theme.colors.gray[600]};
    transition: color ${({ theme }) => theme.transitions.fast};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[4]};

  a {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.gray[800]};
    border-radius: ${({ theme }) => theme.radius.full};
    color: ${({ theme }) => theme.colors.white};
    transition: all ${({ theme }) => theme.transitions.fast};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.gray[800]};
      transform: translateY(-3px);
    }
  }
`;

const FormWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: ${({ theme }) => theme.space[10]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.8s ${({ theme }) => theme.easing.out} 0.2s,
              transform 0.8s ${({ theme }) => theme.easing.out} 0.2s;

  ${({ $visible }) => $visible && css`
    opacity: 1;
    transform: translateX(0);
  `}

  h3 {
    font-size: ${({ theme }) => theme.fonts.size.xl};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    color: ${({ theme }) => theme.colors.gray[800]};
    margin-block-end: ${({ theme }) => theme.space[6]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.space[6]};
  }
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.radius.md};
  margin-block-end: ${({ theme }) => theme.space[6]};
  font-size: ${({ theme }) => theme.fonts.size.sm};

  ${({ $type }) => $type === 'success' && css`
    background-color: #d4edda;
    color: #155724;
  `}

  ${({ $type }) => $type === 'error' && css`
    background-color: #f8d7da;
    color: #721c24;
  `}

  i {
    font-size: 1.2em;
    flex-shrink: 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[6]};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.gray[700]};
`;

const Required = styled.span`
  color: ${({ theme }) => theme.colors.error};
`;

const inputStyles = css`
  width: 100%;
  padding: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.gray[800]};
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.radius.md};
  transition: all ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const Input = styled.input`
  ${inputStyles}
`;

const Select = styled.select`
  ${inputStyles}
  cursor: pointer;
`;

const Textarea = styled.textarea`
  ${inputStyles}
  resize: vertical;
  min-height: 120px;
`;

const Contact = () => {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/mwvezjbz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', phone: '', email: '', service: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <ContactSection id="contact" ref={sectionRef}>
      <Container size="xl">
        <SectionHeader
          title="Get in <span>Touch</span>"
          subtitle="Have a question or need a quote? Reach out to us and our team will respond within 24 hours."
        />

        <ContactGrid>
          <ContactInfo $visible={isVisible}>
            <h3>Contact Information</h3>
            <p>
              We're here to help with all your electrical needs. Contact us through any of the following
              channels or fill out the form to get started.
            </p>

            <ContactDetails>
              {contactInfo.map((item, index) => (
                <ContactItem
                  key={item.title}
                  $visible={isVisible}
                  style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                >
                  <i className={item.icon} aria-hidden="true" />
                  <ContactItemText>
                    <h4>{item.title}</h4>
                    {item.content}
                  </ContactItemText>
                </ContactItem>
              ))}
            </ContactDetails>

            <SocialLinks>
              {socialLinks.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${label} page`}
                >
                  <i className={icon} aria-hidden="true" />
                </a>
              ))}
            </SocialLinks>
          </ContactInfo>

          <FormWrapper $visible={isVisible}>
            <h3>Send Us a Message</h3>

            {formStatus === 'success' && (
              <Message $type="success" role="alert">
                <i className="fas fa-check-circle" aria-hidden="true" />
                <span>Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.</span>
              </Message>
            )}

            {formStatus === 'error' && (
              <Message $type="error" role="alert">
                <i className="fas fa-exclamation-circle" aria-hidden="true" />
                <span>Oops! Something went wrong. Please try again or call us directly.</span>
              </Message>
            )}

            <Form onSubmit={handleSubmit} noValidate>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="name">Full Name <Required>*</Required></Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    autoComplete="name"
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="phone">Phone Number <Required>*</Required></Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    autoComplete="tel"
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email (optional)"
                  autoComplete="email"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="service">Service Required</Label>
                <Select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  {services.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Message <Required>*</Required></Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about your electrical needs..."
                  required
                />
              </FormGroup>

              <Button
                type="submit"
                size="lg"
                icon={<i className="fas fa-paper-plane" aria-hidden="true" />}
              >
                Send Message
              </Button>
            </Form>
          </FormWrapper>
        </ContactGrid>
      </Container>
    </ContactSection>
  );
};

export default Contact;
