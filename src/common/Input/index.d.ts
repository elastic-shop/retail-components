import * as React from "react";

interface InputProps  {
    type: "text" | "number" | "radio" | "checkbox";
    onChange: (e: React.ChangeEvent<HTMLInputElement>, value?: any) => void;
    id: string;
    value?: number | string;
    text?: string;
    hovered?: boolean;
    name?: string;
    className?: string;
    checked?: boolean;
    focused?: boolean;
}

declare class Input extends React.Component<InputProps, any> {};

export default Input;