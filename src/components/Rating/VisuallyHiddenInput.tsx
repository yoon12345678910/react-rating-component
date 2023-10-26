import styled from '@emotion/styled';

const VisuallyHiddenInput = styled('input')`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export default VisuallyHiddenInput;
