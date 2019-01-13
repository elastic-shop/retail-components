import * as React from "react";

export interface InputProps  {
    type: "text" | "number" | "radio" | "checkbox";
    onChange: (e: React.ChangeEvent<HTMLInputElement>, value?: any) => void;
    id: string;
    text?: string;
    name?: string;
    className?: string;
    checked?: boolean;
    focused?: boolean;
    hovered?: boolean;
    value?: number | string;
}

export type Input = React.ComponentType<InputProps>;
