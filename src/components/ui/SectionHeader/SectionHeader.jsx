import styled, { css } from 'styled-components';

const alignStyles = {
  left: css`
    text-align: left;
  `,
  center: css`
    text-align: center;

    p {
      margin-inline: auto;
    }
  `,
  right: css`
    text-align: right;

    p {
      margin-inline-start: auto;
    }
  `,
};

const Header = styled.header`
  margin-block-end: ${({ theme }) => theme.space[12]};
  ${({ $align }) => alignStyles[$align || 'center']}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-block-end: ${({ theme }) => theme.space[8]};
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fonts.size['2xl']};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ $dark, theme }) => $dark ? theme.colors.white : theme.colors.gray[800]};
  margin-block-end: ${({ theme }) => theme.space[4]};
  line-height: ${({ theme }) => theme.fonts.lineHeight.tight};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fonts.size.xl};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fonts.size.base};
  color: ${({ $dark, theme }) => $dark ? 'rgba(255, 255, 255, 0.7)' : theme.colors.gray[500]};
  max-width: 600px;
  line-height: ${({ theme }) => theme.fonts.lineHeight.relaxed};
`;

const SectionHeader = ({ title, subtitle, align = 'center', dark = false, className, id }) => {
  return (
    <Header $align={align} className={className}>
      <Title $dark={dark} dangerouslySetInnerHTML={{ __html: title }} id={id} />
      {subtitle && <Subtitle $dark={dark}>{subtitle}</Subtitle>}
    </Header>
  );
};

export default SectionHeader;
