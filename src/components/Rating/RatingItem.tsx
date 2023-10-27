import React, { useId } from 'react';
import clsx from 'clsx';

import type { IconContainerProps } from './Rating';
import type { RatingClasses } from './ratingClasses';
import RatingIcon from './RatingIcon';
import RatingLabel from './RatingLabel';
import VisuallyHiddenInput from './VisuallyHiddenInput';

export interface RatingItemProps {
  /**
   * 재정의된 className.
   */
  classes: RatingClasses;
  /**
   * Radio `input` 요소의 이름 속성값.
   */
  name?: string;
  /**
   * 아이콘 활성화 유무.
   */
  isActive: boolean;
  /**
   * 읽기전용 여부.
   */
  readOnly: boolean;
  /**
   * 비활성화 유무.
   */
  disabled: boolean;
  /**
   * 아이콘 Rating 인덱스.
   */
  itemValue: number;
  /**
   * 활성 Rating 값, 동작에 따라 `selected` | `hover` | `focus` 값을 할당.
   */
  activeRatingValue: number | null;
  /**
   * 선택된 Rating 값.
   */
  selectedRatingValue: number | null;
  /**
   * 아이콘 사이즈.
   */
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
   * 아이콘을 포함하는 컴포넌트.
   */
  IconContainerComponent?: React.ElementType<IconContainerProps>;
  /**
   * 값이 변경되면 호출할 콜백함수.
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * 아이콘 `click` 이벤트 발생시 호출할 콜백함수.
   */
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
  /**
   * 아이콘 `focus` 이벤트 발생시 호출할 콜백함수.
   */
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * 아이콘 `blur` 이벤트 발생시 호출할 콜백함수.
   */
  onBlur: () => void;
}

const RatingItem = (props: RatingItemProps) => {
  const {
    classes,
    name,
    isActive,
    readOnly,
    disabled,
    itemValue,
    activeRatingValue,
    selectedRatingValue,
    hover,
    focus,
    labelProps,
    emptyIcon,
    filledIcon,
    IconContainerComponent,
    onChange,
    onClick,
    onFocus,
    onBlur,
  } = props;

  const id = useId();
  const isFilled = activeRatingValue !== null && itemValue <= activeRatingValue;
  const isHovered = itemValue <= hover;
  const isFocused = itemValue <= focus;
  const isChecked = itemValue === selectedRatingValue;

  const RatingIconRender = (
    <RatingIcon
      as={
        IconContainerComponent ? (iconProps) => <IconContainerComponent value={itemValue} {...iconProps} /> : undefined
      }
      className={clsx(classes.icon, {
        [classes.iconEmpty]: !isFilled,
        [classes.iconFilled]: isFilled,
        [classes.iconHover]: isHovered,
        [classes.iconFocus]: isFocused,
        [classes.iconActive]: isActive,
      })}
      state={{
        iconEmpty: !isFilled,
        iconActive: isActive,
      }}
      classes={classes}
    >
      {emptyIcon && !isFilled ? emptyIcon : filledIcon}
    </RatingIcon>
  );

  if (readOnly) {
    return <span {...labelProps}>{RatingIconRender}</span>;
  }

  return (
    <>
      <RatingLabel htmlFor={id} className={classes.label} {...labelProps}>
        {RatingIconRender}
      </RatingLabel>
      <VisuallyHiddenInput
        type="radio"
        className={classes.visuallyHiddenInput}
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
