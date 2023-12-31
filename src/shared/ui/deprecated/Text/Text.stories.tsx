import type { Meta, StoryObj } from "@storybook/react";

import { Text, TextSize, TextTheme } from "./Text";

const meta: Meta<typeof Text> = {
    title: "shared/Text/deprecated",
    component: Text,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Primary: Story = {
    args: {
        title: "Title lorem ipsum",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    },
};

export const OnlyTitle: Story = {
    args: {
        title: "Title lorem ipsum",
    },
};

export const OnlyText: Story = {
    args: {
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    },
};

export const Inverted: Story = {
    args: {
        title: "Title lorem ipsum",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        theme: TextTheme.INVERTED,
    },
};

export const Error: Story = {
    args: {
        title: "Title lorem ipsum",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        theme: TextTheme.ERROR,
    },
};

export const SizeL: Story = {
    args: {
        title: "Title lorem ipsum",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        size: TextSize.L,
    },
};

export const SizeM: Story = {
    args: {
        title: "Title lorem ipsum",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        size: TextSize.M,
    },
};

export const SizeS: Story = {
    args: {
        title: "Title lorem ipsum",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        size: TextSize.S,
    },
};
