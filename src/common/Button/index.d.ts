import * as React from "react";

interface IButtonProps  {
    text: string;
    onClick?: () => void;
    size: "s" | "m";
    className?: string;
    before?: React.ComponentType;
    after?: React.ComponentType;
    hovered?: boolean;
    focused?: boolean;
    type?: "inverted";
}

declare class Button extends React.Component<IButtonProps, any> {};

export default Button;