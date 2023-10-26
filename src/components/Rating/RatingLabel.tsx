import { css } from '@emotion/react';
import styled from '@emotion/styled';

const RatingLabel = styled('label')<{ styleState?: { labelEmptyValueActive?: boolean } }>`
  cursor: inherit;
  ${({ styleState }) => ({
    ...(styleState?.labelEmptyValueActive &&
      css`
        top: 0;
        bottom: 0;
        position: absolute;
        outline: 1px solid #999;
        width: 100%;
      `),
  })}
`;

export default RatingLabel;
