import type { Meta, StoryObj } from "@storybook/react";
import { ListBox } from "./ListBox";

const meta: Meta<typeof ListBox> = {
    title: "shared/ListBox",
    component: ListBox,
    tags: ["autodocs"],
};

const options = [
    { value: "Armenia", content: "Armenia" },
    { value: "Belarus", content: "Belarus" },
    { value: "Kazakhstan", content: "Kazakhstan" },
    { value: "Russia", content: "Russia" },
    { value: "Ukraine", content: "Ukraine" },
];

export default meta;
type Story = StoryObj<typeof ListBox>;

export const Normal: Story = {
    args: {
        items: options,
        value: "Armenia",
    },
};

export const NoValue: Story = {
    args: {
        items: options,
        defaultValue: "укажите страну",
    },
};

export const OptionsTopLeft: Story = {
    args: {
        items: options,
        value: "Armenia",
        direction: "top left",
    },
};

export const OptionsTopRight: Story = {
    args: {
        items: options,
        value: "Armenia",
        direction: "top right",
    },
};

export const OptionsBottomLeft: Story = {
    args: {
        items: options,
        value: "Armenia",
        direction: "bottom left",
    },
};

export const OptionsBottomRight: Story = {
    args: {
        items: options,
        value: "Armenia",
        direction: "bottom right",
    },
};

export const Label: Story = {
    args: {
        items: options,
        value: "Armenia",
        label: "Укажите страну",
    },
};

export const LabelWithDisabled: Story = {
    args: {
        items: options,
        value: "Armenia",
        label: "Укажите страну",
        readonly: true,
    },
};
