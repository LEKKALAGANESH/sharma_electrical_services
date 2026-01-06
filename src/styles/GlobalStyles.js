import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* CSS Reset - Modern */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    scroll-padding-top: 120px;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.family};
    font-size: ${({ theme }) => theme.fonts.size.base};
    line-height: ${({ theme }) => theme.fonts.lineHeight.normal};
    color: ${({ theme }) => theme.colors.gray[800]};
    background-color: ${({ theme }) => theme.colors.white};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
    height: auto;
  }

  input, button, textarea, select {
    font: inherit;
    color: inherit;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    touch-action: manipulation;
  }

  a {
    color: inherit;
    text-decoration: none;
    touch-action: manipulation;
  }

  ul, ol {
    list-style: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    line-height: ${({ theme }) => theme.fonts.lineHeight.tight};
    text-wrap: balance;
    color: ${({ theme }) => theme.colors.gray[800]};
  }

  p {
    text-wrap: pretty;
    max-width: 75ch;
  }

  /* Improved Focus Styles for Accessibility */
  :focus {
    outline: none;
  }

  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
    border-radius: ${({ theme }) => theme.radius.sm};
  }

  /* Skip link for accessibility */
  .skip-link {
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

    &:focus {
      top: ${({ theme }) => theme.space[4]};
    }
  }

  /* Selection */
  ::selection {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.gray[800]};
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray[400]};
    border-radius: ${({ theme }) => theme.radius.full};
    border: 2px solid ${({ theme }) => theme.colors.gray[100]};

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
    }
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors.gray[400]} ${({ theme }) => theme.colors.gray[100]};
  }

  /* ========== Keyframe Animations ========== */

  /* Fade animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Scale animations */
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes scaleOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.9);
    }
  }

  @keyframes popIn {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    70% {
      transform: scale(1.05);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Slide animations */
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Bounce animations */
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes bounceDown {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(10px);
    }
    60% {
      transform: translateY(5px);
    }
  }

  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Pulse animations */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes pulseRing {
    0% {
      transform: scale(0.8);
      opacity: 0.8;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  @keyframes heartbeat {
    0%, 100% {
      transform: scale(1);
    }
    14% {
      transform: scale(1.1);
    }
    28% {
      transform: scale(1);
    }
    42% {
      transform: scale(1.1);
    }
    70% {
      transform: scale(1);
    }
  }

  /* Spin animations */
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes spinReverse {
    to {
      transform: rotate(-360deg);
    }
  }

  /* Shake animation */
  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: translateX(-5px);
    }
    20%, 40%, 60%, 80% {
      transform: translateX(5px);
    }
  }

  /* Wiggle animation */
  @keyframes wiggle {
    0%, 100% {
      transform: rotate(-3deg);
    }
    50% {
      transform: rotate(3deg);
    }
  }

  /* Float animation */
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  /* Glow animation */
  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(247, 197, 30, 0.4),
                  0 0 10px rgba(247, 197, 30, 0.3),
                  0 0 15px rgba(247, 197, 30, 0.2);
    }
    50% {
      box-shadow: 0 0 10px rgba(247, 197, 30, 0.6),
                  0 0 20px rgba(247, 197, 30, 0.4),
                  0 0 30px rgba(247, 197, 30, 0.3);
    }
  }

  /* Shimmer animation */
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  /* Progress line animation */
  @keyframes progressLine {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  /* Typing animation */
  @keyframes blink {
    0%, 50% {
      opacity: 1;
    }
    51%, 100% {
      opacity: 0;
    }
  }

  /* Draw animation for SVG */
  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }

  /* Reveal animation */
  @keyframes reveal {
    from {
      clip-path: inset(0 100% 0 0);
    }
    to {
      clip-path: inset(0 0 0 0);
    }
  }

  /* Gradient shift animation */
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  /* Counter animation helper */
  @property --num {
    syntax: '<integer>';
    initial-value: 0;
    inherits: false;
  }

  /* ========== Utility Classes ========== */

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .no-scroll {
    overflow: hidden;
  }

  /* Main content wrapper */
  main {
    flex: 1;
  }

  /* Reduced Motion - Accessibility */
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* High contrast mode */
  @media (prefers-contrast: high) {
    :focus-visible {
      outline-width: 4px;
    }
  }

  /* Print styles */
  @media print {
    body {
      background: white;
      color: black;
    }

    a {
      text-decoration: underline;
    }

    .no-print {
      display: none !important;
    }
  }
`;

export default GlobalStyles;
