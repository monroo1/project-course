import type { Meta, StoryObj } from "@storybook/react";

import { ArticlePageGreeting } from "./ArticlePageGreeting";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";

const meta: Meta<typeof ArticlePageGreeting> = {
    title: "features/ArticlePageGreeting",
    component: ArticlePageGreeting,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ArticlePageGreeting>;

export const Normal: Story = {
    decorators: [StoreDecorator({})],
};
