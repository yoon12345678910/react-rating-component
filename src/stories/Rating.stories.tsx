import { Meta, StoryObj } from '@storybook/react';

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
          <Rating name="default-value-1" {...args} precision={1} value={2} />
        </div>
        <div>
          <Rating name="default-value-2" {...args} precision={0.5} value={3.5} />
        </div>
        <div>
          <Rating name="default-value-1" {...args} size={30} precision={1} />
        </div>
      </>
    );
  },
  args: {
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
    value: 4.5,
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
    value: 8.5,
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
    value: 4.5,
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
    value: 4,
  },
};
