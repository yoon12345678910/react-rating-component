import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import styled from '@emotion/styled';

import generatePrefixClasses from './generatePrefixClasses';
import ratingClasses from './ratingClasses';
import RatingDecimal from './RatingDecimal';
import RatingItem from './RatingItem';
import RatingLabel from './RatingLabel';
import VisuallyHiddenInput from './VisuallyHiddenInput';
import { StarIcon, StarBorderIcon } from './StarIcon';

export interface IconContainerProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
}

export interface RatingProps {
  /**
   * Rating 정밀도, 증가 또는 감소 값.
   * @default 1
   */
  precision?: number;
  /**
   * 최대 Rating 값.
   * @default 5
   */
  max?: number;
  /**
   * Radio `input` 요소의 이름 속성값으로 양식 내에서 고유한 값.
   */
  name?: string;
  /**
   * 읽기전용 여부
   *`true` 인 경우 모든 hover 및 focus event 제거.
   * @default false
   */
  readOnly?: boolean;
  /**
   * 비활성화 여부.
   * @default false
   */
  disabled?: boolean;
  /**
   * 아이콘 사이즈.
   * @default 24
   */
  size?: number;
  /**
   * Rating 값.
   */
  value?: number | null;
  /**
   * prefix className.
   */
  prefix?: string;
  /**
   * 비어있을 때 표시되는 아이콘.
   * @default <StarBorderIcon size="24" />
   */
  emptyIcon?: React.ReactNode;
  /**
   * 채워졌을 때 표시되는 아이콘.
   * @default <StarIcon size="24" />
   */
  filledIcon?: React.ReactNode;
  /**
   * 아이콘을 포함하는 컴포넌트.
   * @default function IconContainer(props) {
   *   const { value, ...other } = props;
   *   return <span {...other} />;
   * }
   */
  IconContainerComponent?: React.ElementType<IconContainerProps>;
  /**
   * 값이 변경되면 호출할 콜백함수.
   * @param {React.SyntheticEvent} event 콜백 이벤트
   * @param {number|null} value 새로운값
   */
  onChange?: (e: React.SyntheticEvent, value: number | null) => void;
}

/**
 * `precision` 에 따라 가장 가까운 숫자 찾기.
 * @see https://stackoverflow.com/questions/43890561/how-to-round-number-to-the-closest-50-in-javascript
 */
function roundValueToPrecision(value: number | null, precision: number) {
  if (value === null) return value;

  const nearest = Math.round(value / precision) * precision;
  const decimalPart = precision.toString().split('.')[1]?.length || 0;
  return Number(nearest.toFixed(decimalPart));
}

const RatingRoot = styled('span')<{ size: number; readOnly: boolean; disabled: boolean }>`
  display: inline-flex;
  position: relative;
  text-align: left;
  font-size: ${({ size }) => `${size}px`};
  opacity: ${({ disabled }) => (disabled ? '.38' : undefined)};
  cursor: pointer;
  pointer-events: ${({ readOnly, disabled }) => (readOnly || disabled ? 'none' : undefined)};
`;

const Rating = (props?: RatingProps) => {
  const {
    name,
    precision = 1,
    max = 5,
    readOnly = false,
    disabled = false,
    size = 24,
    value: valueProp = null,
    prefix,
    emptyIcon = <StarBorderIcon />,
    filledIcon = <StarIcon />,
    IconContainerComponent,
    onChange,
  } = props ?? {};

  const [valueState, setValueState] = useState(valueProp);
  const [{ hover, focus }, setState] = useState({ hover: -1, focus: -1 });
  const [isFocused, setIsFocused] = useState(false);
  const [emptyValueFocused, setEmptyValueFocused] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);

  const selectedValue = roundValueToPrecision(valueState, precision);
  let value = selectedValue;
  if (hover !== -1) value = hover;
  if (focus !== -1) value = focus;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value === '' ? null : parseFloat(e.target.value);

    if (hover !== -1) newValue = hover;

    setValueState(newValue);

    if (onChange) onChange(e, newValue);
  };

  const handleClear = (e: React.MouseEvent<HTMLInputElement>) => {
    // 클릭이 마우스에 의한 것인지 키보드에 의한 것인지 구별
    // 키보드 이벤트 무사하기
    if (e.clientX === 0 && e.clientY === 0) return;

    const newHover = -1;

    setState({ hover: newHover, focus: newHover });
    setIsFocused(false);
    setValueState(null);

    if (onChange) onChange(e, null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rootNode = rootRef.current;

    if (!rootNode) return;

    const { width, left } = rootNode.getBoundingClientRect();
    const percent = (e.clientX - left) / width;
    // `precision/2` 아이콘 사이에 마우스를 가져가면 정밀도 규칙에 따라 가장 가까운 숫자가 선택.
    const newHover = roundValueToPrecision(max * percent + precision / 2, precision) as number;

    setEmptyValueFocused(false);
    setIsFocused(false);
    setState((prev) =>
      prev.hover === newHover && prev.focus === newHover
        ? prev
        : {
            hover: newHover,
            focus: newHover,
          },
    );
  };

  const handleMouseLeave = () => {
    const newHover = -1;

    setState({ hover: newHover, focus: newHover });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const newFocus = parseFloat(e.currentTarget.value);

    setIsFocused(true);
    setState((prev) => ({ hover: prev.hover, focus: newFocus }));
  };

  const handleBlur = () => {
    if (hover !== -1) return;

    const newFocus = -1;

    setIsFocused(false);
    setState((prev) => ({ hover: prev.hover, focus: newFocus }));
  };

  const classes = generatePrefixClasses(ratingClasses, prefix);

  const ratingItemProps = {
    classes,
    name,
    readOnly,
    disabled,
    activeRatingValue: value,
    selectedRatingValue: selectedValue,
    size,
    hover,
    focus,
    emptyIcon,
    filledIcon,
    IconContainerComponent,
    onChange: handleChange,
    onClick: handleClear,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  return (
    <RatingRoot
      ref={rootRef}
      size={size}
      readOnly={readOnly}
      disabled={disabled}
      onMouseMove={readOnly ? undefined : handleMouseMove}
      onMouseLeave={readOnly ? undefined : handleMouseLeave}
      className={clsx(classes.root, { [classes.focusVisible]: isFocused })}
    >
      {[...new Array(max)].map((_, index) => {
        const itemValue = index + 1;
        const isActive = value !== null && itemValue === Math.ceil(value) && (hover !== -1 || focus !== -1);

        if (precision < 1) {
          const items = Array.from(new Array(1 / precision));

          return (
            <RatingDecimal key={index} state={{ iconActive: isActive }} classes={classes}>
              {items.map((_, indexDecimal) => {
                const itemDecimalValue = roundValueToPrecision(
                  itemValue - 1 + (indexDecimal + 1) * precision,
                  precision,
                ) as number;

                return (
                  <RatingItem
                    {...ratingItemProps}
                    key={itemDecimalValue}
                    isActive={false}
                    itemValue={itemDecimalValue}
                    labelProps={{
                      style:
                        items.length - 1 === indexDecimal
                          ? {}
                          : {
                              width: itemDecimalValue === value ? `${(indexDecimal + 1) * precision * 100}%` : '0%',
                              overflow: 'hidden',
                              position: 'absolute',
                            },
                    }}
                  />
                );
              })}
            </RatingDecimal>
          );
        }

        return <RatingItem key={index} {...ratingItemProps} isActive={isActive} itemValue={itemValue} />;
      })}
      {!readOnly && !disabled && (
        <RatingLabel
          className={clsx(classes.label, classes.labelEmptyValueActive)}
          state={{ labelEmptyValueActive: emptyValueFocused }}
        >
          <VisuallyHiddenInput
            type="radio"
            className={classes.visuallyHiddenInput}
            id={`${name}-empty`}
            name={name}
            checked={selectedValue == null}
            onFocus={() => setEmptyValueFocused(true)}
            onBlur={() => setEmptyValueFocused(false)}
            onChange={handleChange}
          />
        </RatingLabel>
      )}
    </RatingRoot>
  );
};

export default Rating;
