import React, { useId } from 'react';
import clsx from 'clsx';

import ratingClasses from './ratingClasses';
import RatingIcon from './RatingIcon';
import RatingLabel from './RatingLabel';
import VisuallyHiddenInput from './VisuallyHiddenInput';

export interface RatingItemProps {
  /**
   * Radio `input` 요소의 이름 속성값
   */
  name?: string;
  /**
   * 아이콘 활성화 유무
   */
  isActive: boolean;
  /**
   * 읽기전용 여부
   */
  readOnly: boolean;
  /**
   * 비활성화 유무
   */
  disabled: boolean;
  /** */
  itemValue: number;
  /** */
  ratingValue: number | null;
  /** */
  ratingValueRounded: number | null;
  /** */
  size: number;
  /**
   * hover 값.
   */
  hover: number;
  /**
   * focus 값.
   */
  focus: number;
  /**
   * 라벨 속성값.
   */
  labelProps?: {
    style?: React.CSSProperties;
  };
  /**
   * 비어있을 때 표시되는 아이콘.
   */
  emptyIcon: React.ReactNode;
  /**
   * 채워졌을 때 표시되는 아이콘.
   */
  filledIcon: React.ReactNode;
  /**
   *
   */
  IconContainerComponent?: React.ElementType;
  /**
   * 값이 변경되면 호출할 콜백함수.
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * `click` 이벤트 호출할 콜백함수.
   */
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
  /**
   * `focus` 이벤트 호출할 콜백함수.
   */
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * `focus` 이벤트 호출할 콜백함수.
   */
  onBlur: () => void;
}

const RatingItem = (props: RatingItemProps) => {
  const {
    name,
    isActive,
    readOnly,
    disabled,
    itemValue,
    ratingValue,
    ratingValueRounded,
    hover,
    focus,
    labelProps,
    emptyIcon,
    filledIcon,
    // IconContainerComponent,
    onChange,
    onClick,
    onFocus,
    onBlur,
  } = props;

  const id = useId();
  const isFilled = ratingValue !== null && itemValue <= ratingValue;
  const isHovered = itemValue <= hover;
  const isFocused = itemValue <= focus;
  const isChecked = itemValue === ratingValueRounded;

  const RatingIconRender = (
    <RatingIcon
      // as={IconContainerComponent}
      className={clsx(ratingClasses.icon, {
        [ratingClasses.iconEmpty]: !isFilled,
        [ratingClasses.iconFilled]: isFilled,
        [ratingClasses.iconHover]: isHovered,
        [ratingClasses.iconFocus]: isFocused,
        [ratingClasses.iconActive]: isActive,
      })}
      // value={itemValue}
    >
      {emptyIcon && !isFilled ? emptyIcon : filledIcon}
    </RatingIcon>
  );

  if (readOnly) {
    return <span {...labelProps}>{RatingIconRender}</span>;
  }

  return (
    <>
      <RatingLabel htmlFor={id} className={ratingClasses.label} {...labelProps}>
        {RatingIconRender}
      </RatingLabel>
      <VisuallyHiddenInput
        type="radio"
        className={ratingClasses.visuallyHiddenInput}
        id={id}
        name={name}
        value={itemValue}
        disabled={disabled}
        checked={isChecked}
        onChange={onChange}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </>
  );
};

export default RatingItem;
