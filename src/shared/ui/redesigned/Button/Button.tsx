import { ButtonHTMLAttributes, ReactNode, memo } from "react";
import { Mods, classNames } from "@/shared/lib/classNames/classNames";

import cls from "./Button.module.scss";

export type ButtonVariant = "clear" | "outline" | "filled";

export type ButtonSize = "m" | "l" | "xl";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    children?: ReactNode;
    fullWidth?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
}
export const Button = memo((props: ButtonProps) => {
    const {
        children,
        className,
        variant = "outline",
        square,
        disabled,
        fullWidth = false,
        size = "m",
        addonLeft,
        addonRight,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth,
        [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [
                className,
                cls[variant],
                cls[size],
            ])}
            disabled={disabled}
            {...otherProps}
        >
            <div className={cls.addonLeft}>{addonLeft}</div>
            {children}
            <div className={cls.addonRight}>{addonRight}</div>
        </button>
    );
});