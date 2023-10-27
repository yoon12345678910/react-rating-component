import { css } from '@emotion/react';
import styled from '@emotion/styled';

import type { RatingClasses } from './ratingClasses';
import { iconActiveStyle } from './RatingIcon';

const RatingDecimal = styled('span')<{ state: { iconActive: boolean }; classes: RatingClasses }>`
  position: relative;
  ${iconActiveStyle.default}
  ${({ state, classes }) => ({
    ...(state.iconActive &&
      css`
        ${iconActiveStyle.iconActive({ classes })}
      `),
  })}
`;

export default RatingDecimal;
