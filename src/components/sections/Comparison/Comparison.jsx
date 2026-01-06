import { useCallback, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";

const processSteps = [
  { icon: "fas fa-clipboard-list", title: "Consultation & Assessment" },
  { icon: "fas fa-drafting-compass", title: "Planning & Design" },
  { icon: "fas fa-tools", title: "Professional Installation" },
  { icon: "fas fa-check-circle", title: "Testing & Handover" },
];

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ComparisonSection = styled.section`
  padding-block: ${({ theme }) => theme.space[24]};
  background-color: ${({ theme }) => theme.colors.gray[100]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.space[16]};
  }
`;

const Container = styled.div`
  max-width: ${({ theme }) => theme.layout.containerMax};
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.layout.containerPadding};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space[16]};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.space[12]};
  }
`;

const WorkSection = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fonts.size["2xl"]};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.gray[800]};
  margin-block-end: ${({ theme }) => theme.space[4]};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fonts.size.xl};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.base};
  color: ${({ theme }) => theme.colors.gray[600]};
  margin-block-end: ${({ theme }) => theme.space[8]};
`;

const ComparisonContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: ${({ theme }) => theme.radius.xl};
  overflow: hidden;
  cursor: ew-resize;
  user-select: none;
  box-shadow: ${({ theme }) => theme.shadows.lg};

  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  ${({ $active }) =>
    $active &&
    css`
      cursor: grabbing;
    `}
`;

const ImgContainer = styled.div`
  position: absolute;
  inset: 0;
`;

const ImgAfter = styled.div`
  position: absolute;
  inset: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImgBefore = styled.div`
  position: absolute;
  inset: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SliderHandle = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HandleCircle = styled.div`
  width: 52px;
  height: 52px;
  background: ${({ theme }) => theme.gradients.primary};
  border-radius: ${({ theme }) => theme.radius.full};
  box-shadow: ${({ theme }) => theme.shadows.lg}, 0 0 20px rgba(247, 197, 30, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[1]};
  cursor: grab;
  transition: transform ${({ theme }) => theme.transitions.fast},
              box-shadow ${({ theme }) => theme.transitions.fast};

  &:active {
    cursor: grabbing;
    transform: scale(1.05);
  }

  i {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.gray[800]};
  }
`;

const Instructions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
  margin-top: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.gray[500]};

  i {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProcessSection = styled.section`
  padding: ${({ theme }) => theme.space[8]};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const ProcessTitle = styled.h2`
  font-size: ${({ theme }) => theme.fonts.size.xl};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.gray[800]};
  text-align: center;
  margin-block-end: ${({ theme }) => theme.space[8]};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProcessContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[6]};
  padding-left: ${({ theme }) => theme.space[10]};
`;

const ProgressLine = styled.div`
  position: absolute;
  left: calc(${({ theme }) => theme.space[10]} + 20px);
  top: 20px;
  bottom: 20px;
  width: 3px;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  border-radius: 2px;
  transform: translateX(-50%);
`;

const ProgressLineFill = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.gradients.primary};
  border-radius: 2px;
  transition: height 0.5s ${({ theme }) => theme.easing.out};
`;

const ProcessItem = styled.div`
  position: relative;
  display: flex;
  gap: ${({ theme }) => theme.space[4]};
  opacity: 0;
  transform: translateX(-20px);

  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${fadeInUp} 0.5s ${({ theme }) => theme.easing.out} forwards;
    `}

  ${({ $active }) =>
    $active &&
    css`
      & > div:first-child {
        background: ${({ theme }) => theme.gradients.primary};
        transform: scale(1.1);

        i {
          color: ${({ theme }) => theme.colors.gray[800]};
        }
      }
    `}
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.radius.full};
  flex-shrink: 0;
  transition: all ${({ theme }) => theme.transitions.normal};

  i {
    font-size: ${({ theme }) => theme.fonts.size.sm};
    color: ${({ theme }) => theme.colors.gray[500]};
    transition: color ${({ theme }) => theme.transitions.normal};
  }
`;

const ProcessContent = styled.div`
  flex: 1;
  padding-top: ${({ theme }) => theme.space[1]};
`;

const StepBadge = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.fonts.size.xs};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-block-end: ${({ theme }) => theme.space[1]};
`;

const StepTitle = styled.h4`
  font-size: ${({ theme }) => theme.fonts.size.sm};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  color: ${({ theme }) => theme.colors.gray[800]};
`;

const Comparison = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const [processRef, isProcessVisible] = useIntersectionObserver({
    threshold: 0.15,
  });
  const [activeStep, setActiveStep] = useState(-1);
  const [direction, setDirection] = useState(1);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      updatePosition(e.clientX);
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, updatePosition]);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    updatePosition(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      updatePosition(e.touches[0].clientX);
    };

    const handleTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, updatePosition]);

  const handleKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - step));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + step));
    }
  };

  useEffect(() => {
    if (!isProcessVisible) return;

    const stepDuration = 1200;

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        let next = prev + direction;
        if (next >= processSteps.length) {
          setDirection(-1);
          return prev;
        } else if (next < 0) {
          setDirection(1);
          return prev;
        }
        return next;
      });
    }, stepDuration);

    if (activeStep === -1) {
      setActiveStep(0);
    }

    return () => clearInterval(interval);
  }, [isProcessVisible, direction, activeStep]);

  const getProgressHeight = () => {
    if (activeStep < 0) return 0;
    return (activeStep / (processSteps.length - 1)) * 100;
  };

  return (
    <ComparisonSection>
      <Container>
        <WorkSection>
          <Title>
            Our <span>Electrical Work</span>
          </Title>
          <Subtitle>
            Drag the slider to see the before and after transformation
          </Subtitle>

          <ComparisonContainer
            ref={containerRef}
            $active={isDragging}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="slider"
            aria-label="Before and after comparison slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPosition)}
          >
            <ImgContainer>
              <ImgAfter>
                <img
                  src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=900&q=80"
                  alt="After - Professional electrical installation completed"
                  draggable="false"
                />
              </ImgAfter>

              <ImgBefore
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900&q=80"
                  alt="Before - Old electrical setup"
                  draggable="false"
                />
              </ImgBefore>
            </ImgContainer>

            <SliderHandle style={{ left: `${sliderPosition}%` }}>
              <HandleCircle>
                <i className="fas fa-chevron-left" aria-hidden="true" />
                <i className="fas fa-chevron-right" aria-hidden="true" />
              </HandleCircle>
            </SliderHandle>
          </ComparisonContainer>

          <Instructions>
            <i className="fas fa-arrows-left-right" aria-hidden="true" />
            Drag to compare
          </Instructions>
        </WorkSection>

        <ProcessSection ref={processRef}>
          <ProcessTitle>
            Our <span>Work Process</span>
          </ProcessTitle>

          <ProcessContainer>
            <ProgressLine>
              <ProgressLineFill style={{ height: `${getProgressHeight()}%` }} />
            </ProgressLine>

            {processSteps.map((step, index) => (
              <ProcessItem
                key={step.title}
                $visible={isProcessVisible}
                $active={index <= activeStep}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <StepNumber>
                  <i className={step.icon} aria-hidden="true" />
                </StepNumber>
                <ProcessContent>
                  <StepBadge>Step {index + 1}</StepBadge>
                  <StepTitle>{step.title}</StepTitle>
                </ProcessContent>
              </ProcessItem>
            ))}
          </ProcessContainer>
        </ProcessSection>
      </Container>
    </ComparisonSection>
  );
};

export default Comparison;
