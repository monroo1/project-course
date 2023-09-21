import type { Meta, StoryObj } from "@storybook/react";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Button, ButtonSize, ButtonTheme } from "./Button";
import { Theme } from "@/shared/const/theme";

const meta: Meta<typeof Button> = {
    title: "shared/Button",
    component: Button,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: "button",
    },
};

export const Clear: Story = {
    args: {
        children: "Button",
        theme: ButtonTheme.CLEAR,
    },
};

export const ClearInverted: Story = {
    args: {
        children: "Button",
        theme: ButtonTheme.CLEAR_INVERTED,
    },
};

export const Outline: Story = {
    args: {
        children: "Button",
        theme: ButtonTheme.OUTLINE,
    },
};

export const OutlineRed: Story = {
    args: {
        children: "Button",
        theme: ButtonTheme.OUTLINE_RED,
    },
};

export const OutlineSizeL: Story = {
    args: {
        children: "Button",
        theme: ButtonTheme.OUTLINE,
        size: ButtonSize.L,
    },
};

export const OutlineSizeXL: Story = {
    args: {
        children: "Button",
        theme: ButtonTheme.OUTLINE,
        size: ButtonSize.XL,
    },
};

export const BackgroundTheme: Story = {
    args: {
        children: "button",
        theme: ButtonTheme.BACKGROUND,
    },
};

export const BackgroundInverted: Story = {
    args: {
        children: "button",
        theme: ButtonTheme.BACKGROUND_INVERTED,
    },
};

export const SquareSizeM: Story = {
    args: {
        children: ">",
        theme: ButtonTheme.BACKGROUND_INVERTED,
        square: true,
    },
};

export const SquareSizeL: Story = {
    args: {
        children: ">",
        theme: ButtonTheme.BACKGROUND_INVERTED,
        square: true,
        size: ButtonSize.L,
    },
};

export const SquareSizeXL: Story = {
    args: {
        children: ">",
        theme: ButtonTheme.BACKGROUND_INVERTED,
        square: true,
        size: ButtonSize.XL,
    },
};

export const PrimaryDark: Story = {
    args: {
        children: "button",
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const ClearDark: Story = {
    args: {
        children: "Button",
        theme: ButtonTheme.CLEAR,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const OutlineDark: Story = {
    args: {
        children: "Button",
        theme: ButtonTheme.OUTLINE,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const OutlineRedDark: Story = {
    args: {
        children: "Button",
        theme: ButtonTheme.OUTLINE_RED,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const Disabled: Story = {
    args: {
        children: "Button",
        theme: ButtonTheme.OUTLINE,
        disabled: true,
    },
};