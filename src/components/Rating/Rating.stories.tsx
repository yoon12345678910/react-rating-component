import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Rating, { RatingProps } from './Rating';

import { HeartBorderIcon, HeartIcon } from '../HeartIcon';
import FaceIcon from '..//FaceIcon';

const meta: Meta<RatingProps> = {
  title: 'Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    name: { control: { type: null } },
    emptyIcon: { control: { type: null } },
    filledIcon: { control: { type: null } },
    IconContainerComponent: { control: { type: null } },
    onChange: { control: { type: null } },
  },
};

export default meta;
type Story = StoryObj<RatingProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <div>
          <Rating name="default-value-1" defaultValue={3} {...args} />
        </div>
      </>
    );
  },
  parameters: {
    controls: {
      include: ['precision', 'max', 'size', 'prefix', 'readOnly', 'disabled', 'className', 'onChange'],
    },
  },
  argTypes: {
    value: { control: { type: null } },
  },
  args: {
    precision: 0.5,
    max: 5,
    size: 24,
  },
};

/**
 * `value` 또는 `defaultValue` 속성을 사용하여 부동 소수점 숫자를 표시할 수 있습니다.
 * 허용되는 최소 증분 값을 변경하려면 `precision` 속성을 사용하세요.
 */
export const RatingPrecision: Story = {
  render: (args) => {
    return (
      <>
        <div>
          <Rating name="readyOnly-value-1" size={36} defaultValue={4.5} {...args} />
        </div>
      </>
    );
  },
  parameters: {
    controls: {
      include: ['precision'],
    },
  },
  args: {
    precision: 0.5,
  },
};

/**
 * 읽기 전용이며 마우스와 키보드를 사용하여 상호 작용할 수 없습니다.
 */
export const ReadOnly: Story = {
  render: (args) => {
    return (
      <>
        <div>
          <Rating name="readyOnly-value-1" size={36} defaultValue={4.5} {...args} />
        </div>
      </>
    );
  },
  parameters: {
    controls: {
      include: ['readOnly'],
    },
  },
  args: {
    readOnly: true,
  },
};

/**
 * 비활성 상태이며 마우스와 키보드를 사용하여 상호 작용할 수 없습니다.
 * 커서 모양이 변경됩니다.
 */
export const Disabled: Story = {
  render: (args) => {
    return (
      <>
        <div>
          <Rating name="disabled-value-1" size={36} defaultValue={4.5} {...args} />
        </div>
      </>
    );
  },
  parameters: {
    controls: {
      include: ['disabled'],
    },
  },
  args: {
    disabled: true,
  },
};

/**
 * `size` 속성을 통해서 등급 사이즈를 설정할 수 있습니다.
 * `"sm"` | `"md"` | `"lg"` | `number` 값으로 설정 가능합니다.
 */
export const Size: Story = {
  render: (args) => {
    return (
      <>
        <div>
          <Rating name="disabled-value-1" {...args} />
        </div>
      </>
    );
  },
  parameters: {
    controls: {
      include: ['size'],
    },
  },
  args: {
    size: 100,
  },
};

/**
 * `max` 속성을 통해서 등급 최대값을 설정할 수 있습니다.
 */
export const Max: Story = {
  render: (args) => {
    return (
      <>
        <div>
          <Rating name="disabled-value-1" size={36} {...args} />
        </div>
      </>
    );
  },
  parameters: {
    controls: {
      include: ['max'],
    },
  },
  args: {
    max: 10,
  },
};

/**
 * `value` 와 `onChange` 속성을 사용하여 Rating을 제어할 수 있습니다.
 */
export const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<number | null>(3);
    const onChange: RatingProps['onChange'] = (event, value) => {
      console.log('onChange: ', event, value);
      setValue(value);
    };

    return (
      <>
        <div>
          <Rating name="controlled-value-1" value={value} onChange={onChange} />
        </div>
      </>
    );
  },
  parameters: {
    controls: {
      exclude: /.*/g,
    },
  },
};

/**
 * `emptyIcon`와 `filledIcon` 속성을 통해서 아이콘을 재정의할 수 있습니다.
 */
export const CustomIcon: Story = {
  render: () => {
    return (
      <>
        <div>
          <Rating
            name="custom-icon-value-1"
            size={42}
            defaultValue={5}
            emptyIcon={<HeartBorderIcon />}
            filledIcon={<HeartIcon />}
          />
        </div>
      </>
    );
  },
};

/**
 * Rating 컴포넌트는 Radio Group 으로 구현되며, 자연스러운 동작을 위해서 `highlightSelectedOnly` 설정해야합니다.
 */
export const RadioGroup: Story = {
  render: (args) => {
    return (
      <>
        <div>
          <Rating
            name="icon-container-component-1"
            max={5}
            size={42}
            defaultValue={4}
            IconContainerComponent={FaceIcon}
            {...args}
          />
        </div>
      </>
    );
  },
  parameters: {
    controls: {
      include: ['highlightSelectedOnly'],
    },
  },
  args: {
    highlightSelectedOnly: true,
  },
};
