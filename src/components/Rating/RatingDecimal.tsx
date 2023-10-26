import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { iconActiveStyle } from './RatingIcon';

const RatingDecimal = styled('span')<{ styleState: { iconActive: boolean } }>`
  position: relative;
  ${iconActiveStyle.default}
  ${({ styleState }) => ({
    ...(styleState.iconActive &&
      css`
        ${iconActiveStyle.iconActive}
      `),
  })}
`;

export default RatingDecimal;
