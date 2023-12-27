import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const VARIANT_STYLES = {
  default: {
    text: '',
    display: 'none',
    backgroundColor: 'transparent'
  },

  'on-sale': {
    text: 'Sale',
    display: 'revert',
    backgroundColor: COLORS.primary
  },

  'new-release': {
    text: 'Just Released!',
    display: 'revert',
    backgroundColor: COLORS.secondary
  }
}

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default';

  const variantStyles = VARIANT_STYLES[variant];
  if(!variantStyles){
    throw Error("unknown show card variant");
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <VariantHighlight style={{
            "--display": variantStyles.display,
            "--position": variantStyles.position,
            "--background-color": variantStyles.backgroundColor
          }}>
            {variantStyles.text}
          </VariantHighlight>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const VariantHighlight = styled.p`
  display: var(--display);
  background-color: var(--background-color);
  position: absolute;
  top: 8px;
  right: -8px;
  padding: 11px 9px 9px 7px;
  font-size: ${14/16}rem;
  color: ${COLORS.white};
  font-weight: 600;
  border-radius: 2px;
`

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  padding-bottom: 32px;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;  
`;

const Image = styled.img`
  max-width: 340px;  
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
