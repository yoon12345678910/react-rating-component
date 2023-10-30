import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Rating, { RatingProps } from '../components/Rating';
import { HeartBorderIcon, HeartIcon } from '../components/HeartIcon';
import FaceIcon from '../components/FaceIcon';

const meta: Meta<RatingProps> = {
  title: 'Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    name: { control: { type: null } },
    highlightSelectedOnly: { control: { type: null } },
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
          <Rating name="default-value-1" {...args} />
        </div>
      </>
    );
  },
  argTypes: {
    value: { control: { type: null } },
  },
  args: {
    precision: 0.5,
    max: 5,
    size: 24,
    defaultValue: 3,
  },
};

export const ParentControlled: Story = {
  decorators: [
    (_Rating, context) => {
      const [value, setValue] = useState<number | null>(3);
      const onChange: RatingProps['onChange'] = (_, value) => {
        setValue(value);
      };
      return <_Rating args={{ ...context.args, value, onChange }} />;
    },
  ],
  render: (args) => {
    return (
      <>
        <div>
          <Rating name="controlled-value-1" {...args} />
        </div>
      </>
    );
  },
  argTypes: {
    defaultValue: { control: { type: null } },
    value: { control: { type: null } },
  },
  args: {
    precision: 0.5,
    max: 5,
    size: 24,
  },
};

export const ReadOnly: Story = {
  render: (args) => {
    return (
      <>
        <div>
          <Rating name="readyOnly-value-1" {...args} readOnly />
        </div>
      </>
    );
  },
  args: {
    precision: 0.5,
    max: 5,
    size: 18,
    defaultValue: 4.5,
  },
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <>
        <div>
          <Rating name="disabled-value-1" {...args} disabled />
        </div>
      </>
    );
  },
  args: {
    precision: 0.5,
    max: 10,
    size: 18,
    defaultValue: 8.5,
  },
};

export const CustomIcon: Story = {
  render: (args) => {
    return (
      <>
        <div>
          <Rating name="custom-icon-value-1" {...args} emptyIcon={<HeartBorderIcon />} filledIcon={<HeartIcon />} />
        </div>
      </>
    );
  },
  args: {
    precision: 0.5,
    max: 5,
    size: 42,
    defaultValue: 4.5,
  },
};

export const IconContainerComponent: Story = {
  render: (args) => {
    return (
      <>
        <div>
          <Rating
            name="icon-container-component-1"
            {...args}
            max={5}
            IconContainerComponent={FaceIcon}
            highlightSelectedOnly
          />
        </div>
      </>
    );
  },
  argTypes: {
    max: { control: { type: null } },
  },
  args: {
    size: 42,
    defaultValue: 4,
  },
};
