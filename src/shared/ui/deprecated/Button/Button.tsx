import {
    ButtonHTMLAttributes,
    ForwardedRef,
    ReactNode,
    forwardRef,
} from "react";
import { Mods, classNames } from "@/shared/lib/classNames/classNames";

import cls from "./Button.module.scss";

export enum ButtonTheme {
    CLEAR = "clear",
    CLEAR_INVERTED = "clearInverted",
    OUTLINE = "outline",
    OUTLINE_RED = "outlineRed",
    BACKGROUND = "background",
    BACKGROUND_INVERTED = "backgroundInverted",
}

export enum ButtonSize {
    M = "size_m",
    L = "size_l",
    XL = "size_xl",
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
    disable?: boolean;
    children?: ReactNode;
    fullWidth?: boolean;
}
/**
 * @deprecated
 */
export const Button = forwardRef(
    (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
        const {
            children,
            className,
            theme = ButtonTheme.OUTLINE,
            square,
            disable,
            fullWidth = false,
            size = ButtonSize.M,
            ...otherProps
        } = props;

        const mods: Mods = {
            [cls[theme]]: true,
            [cls.square]: square,
            [cls[size]]: true,
            [cls.disabled]: disable,
            [cls.fullWidth]: fullWidth,
        };

        return (
            <button
                ref={ref}
                type="button"
                className={classNames(cls.Button, mods, [
                    className,
                    cls[theme],
                ])}
                disabled={disable}
                {...otherProps}
            >
                {children}
            </button>
        );
    },
);
