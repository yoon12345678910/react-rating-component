import { css } from '@emotion/react';
import styled from '@emotion/styled';

import type { RatingClasses } from './ratingClasses';

export const iconActiveStyle = {
  default: css`
    cursor: inherit;
    transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  `,
  iconActive: ({ classes }: { classes: RatingClasses }) => css`
    transform: scale(1.2);
    ${`.${classes.focusVisible}`} & {
      outline: 1px solid #999;
    }
  `,
};

const RatingIcon = styled.span<{
  state: { iconActive: boolean; iconEmpty: boolean };
  classes: RatingClasses;
}>`
  display: flex;
  pointer-events: none;
  > svg {
    display: inline-block;
    flex-shrink: 0;
    width: 1em;
    height: 1em;
    fill: currentColor;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    user-select: none;
  }
  ${iconActiveStyle.default}
  ${({ state, classes }) => ({
    ...css`
      &${`.${classes.iconEmpty}`} > svg {
        color: rgba(0, 0, 0, 0.26);
      }
    `,
    ...(state.iconActive &&
      css`
        ${iconActiveStyle.iconActive({ classes })}
      `),
  })}
`;

export default RatingIcon;
