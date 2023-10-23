import { css } from '@emotion/react';
import React, { useState, useRef, useCallback } from 'react';
import { StarIcon, StarBorderIcon } from './StarIcon';

interface RatingProps {
  precision?: number;
  totalStars?: number;
  disabled?: boolean;
  size?: number;
  emptyIcon?: React.ElementType;
  filledIcon?: React.ElementType;
}

type ElementType = HTMLSpanElement;

const UnMemorizedRating = (props?: RatingProps) => {
  const { precision = 1, totalStars = 5, size = 42, emptyIcon = StarBorderIcon, filledIcon = StarIcon } = props ?? {};

  const [activeStar, setActiveStar] = useState(-1);
  const [hoverActiveStar, setHoverActiveStar] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);
  const ratingContainerRef = useRef<ElementType>(null);

  const calculateRating = useCallback(
    (e: React.MouseEvent<ElementType>) => {
      if (!ratingContainerRef.current) return 0;

      const { width, left } = ratingContainerRef.current.getBoundingClientRect();

      const percent = (e.clientX - left) / width;
      const numberInStars = percent * totalStars;
      const nearestNumber = Math.round((numberInStars + precision / 2) / precision) * precision;

      return Number(nearestNumber.toFixed(precision.toString().split('.')[1]?.length || 0));
    },
    [precision, totalStars],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<ElementType>) => {
      setIsHovered(false);
      setActiveStar(calculateRating(e));
    },
    [calculateRating],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<ElementType>) => {
      setIsHovered(true);
      setHoverActiveStar(calculateRating(e));
    },
    [calculateRating],
  );

  const handleMouseLeave = useCallback(() => {
    setHoverActiveStar(-1);
    setIsHovered(false);
  }, []);

  const EmptyIcon = emptyIcon;
  const FilledIcon = filledIcon;

  return (
    <span
      role="button"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={ratingContainerRef}
      css={css`
        display: inline-flex;
        position: relative;
        cursor: pointer;
        text-align: left;
        /* pointer-events: none; */
      `}
    >
      {[...new Array(totalStars)].map((_, index) => {
        const activeState = isHovered ? hoverActiveStar : activeStar;

        const showEmptyIcon = activeState === -1 || activeState < index + 1;

        const isActiveRating = activeState !== 1;
        const isRatingWithPrecision = activeState % 1 !== 0;
        const isRatingEqualToIndex = Math.ceil(activeState) === index + 1;
        const showRatingWithPrecision = isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;

        return (
          <span
            key={index}
            css={css`
              position: relative;
              &:hover {
                transform: scale(1.2);
              }
            `}
          >
            <div
              style={{
                width: showRatingWithPrecision ? `${(activeState % 1) * 100}%` : '0%',
                overflow: 'hidden',
                position: 'absolute',
              }}
            >
              <FilledIcon size={size} />
            </div>
            <div>{showEmptyIcon ? <EmptyIcon size={size} /> : <FilledIcon size={size} />}</div>
          </span>
        );
      })}
    </span>
  );
};

export const Rating = React.memo(UnMemorizedRating) as typeof UnMemorizedRating;
