import { css } from '@emotion/react';
import styled from '@emotion/styled';

import ratingClasses from './ratingClasses';

export const iconActiveStyle = {
  default: css`
    cursor: inherit;
    transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  `,
  iconActive: css`
    transform: scale(1.2);

    ${`.${ratingClasses.focusVisible}`} & {
      outline: 1px solid #999;
    }
  `,
};

const RatingIcon = styled.span`
  display: flex;
  pointer-events: none;

  ${iconActiveStyle.default}

  &${`.${ratingClasses.iconEmpty}`} > svg {
    color: rgba(0, 0, 0, 0.26);
  }

  &${`.${ratingClasses.iconActive}`} {
    ${iconActiveStyle.iconActive}
  }

  > svg {
    display: inline-block;
    flex-shrink: 0;
    width: 1em;
    height: 1em;
    fill: currentColor;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    user-select: none;
  }
`;

export default RatingIcon;
