import * as React from "react";
import { cn } from "@bem-react/classname";
import "./ButtonBase.scss";
import { IClassNameProps } from "@bem-react/core";

export const cnButton = cn("Button");

export interface IPresenterButton extends IClassNameProps {
    size?: "s" | "m";
    hovered?: boolean;
    focused?: boolean;
    type?: "inverted";
}

export interface IButtonProps extends IPresenterButton {
    text: string;
    onClick?: () => void;
    size: "s" | "m";
    className?: string;
    before?: React.ComponentType;
    after?: React.ComponentType;
}

export class ButtonBase extends React.PureComponent<IButtonProps> {
    public render() {
        const {
            text,
            before: Before = () => null,
            after: After = () => null,
            onClick,
            className
        } = this.props;
        return (
            <button
                className={cnButton(null, [className, "BoldText"])}
                onClick={onClick}>
                <Before/>
                    {text}
                <After/>
            </button>);
    }
}
