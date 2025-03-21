import { fn } from "@storybook/test";

import type { Meta, StoryObj } from "@storybook/react";

import { AntButton } from "./";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
// export default {
//   title: 'Example/Button',
//   component: AntButton,
//   parameters: {
//     // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
//     layout: 'centered',
//   },
//   // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
//   tags: ['autodocs'],
//   // More on argTypes: https://storybook.js.org/docs/api/argtypes
//   argTypes: {
//     backgroundColor: { control: 'color' },
//   },
//   // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
//   args: { onClick: fn() },
// };

const meta: Meta<typeof AntButton> = {
  title: "Example/AntButton",
  component: AntButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof AntButton>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    type: "primary",
    children: "Primary Button",
  },
};

export const Default: Story = {
  args: {
    children: "Default Button",
  },
};

export const Dashed: Story = {
  args: {
    type: "dashed",
    children: "Dashed Button",
  },
};

export const Text: Story = {
  args: {
    type: "text",
    children: "Text Button",
  },
};

export const Link: Story = {
  args: {
    type: "link",
    children: "Link Button",
  },
};
