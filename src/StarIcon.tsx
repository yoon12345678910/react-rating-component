import styled from '@emotion/styled';

interface IconProps {
  size?: number;
}

const Star = styled.span`
  display: flex;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  color: ${({ color }) => color};
  pointer-events: none;
`;

const Svg = styled.svg`
  display: inline-block;
  fill: currentColor;
  flex-shrink: 0;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  user-select: none;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

export const StarIcon = ({ size = 24 }: IconProps) => {
  return (
    <Star color="rgb(250, 175, 0)">
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          fill="currentColor"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </Svg>
    </Star>
  );
};

export const StarBorderIcon = ({ size = 24 }: IconProps) => {
  return (
    <Star color="rgba(0, 0, 0, 0.26)">
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <path
          d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
          fill="currentColor"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </Svg>
    </Star>
  );
};
