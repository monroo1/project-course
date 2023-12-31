import { MutableRefObject, ReactNode, UIEvent, memo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateSchema } from "@/app/providers/StoreProvider";
import { useInfiniteScroll } from "@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useThrottle } from "@/shared/lib/hooks/useThrottle/useThrottle";
import { classNames } from "@/shared/lib/classNames/classNames";
import { scrollRestorationActions } from "../model/slices/scrollRestorationSlice";
import { getScrollRestorationsByPath } from "../model/selectors/scrollRestorationSelectors";
import { PAGE_ID } from "@/shared/const/page";
import { TestProps } from "@/shared/types/tests";
import cls from "./Page.module.scss";
import { toggleFeatures } from "@/shared/lib/features";

interface PageProps extends TestProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
    const { className, children, onScrollEnd } = props;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    const scrollPosition = useSelector((state: StateSchema) =>
        getScrollRestorationsByPath(state, pathname),
    );

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(
            scrollRestorationActions.setScrollPosition({
                position: e.currentTarget.scrollTop,
                path: pathname,
            }),
        );
    }, 500);

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    useInfiniteScroll({
        triggerRef,
        wrapperRef: toggleFeatures({
            name: "isAppRedesigned",
            on: () => undefined,
            off: () => wrapperRef,
        }),
        callback: onScrollEnd,
    });

    return (
        <main
            ref={wrapperRef}
            className={classNames(
                toggleFeatures({
                    name: "isAppRedesigned",
                    on: () => cls.PageRedesigned,
                    off: () => cls.Page,
                }),
                {},
                [className],
            )}
            onScroll={onScroll}
            id={PAGE_ID}
            data-testid={props["data-testid"] ?? "Page"}
        >
            {children}
            {onScrollEnd ? (
                <div className={cls.trigger} ref={triggerRef} />
            ) : null}
        </main>
    );
});
