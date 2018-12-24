import {cn} from "@bem-react/classname";
import React, { PureComponent } from "react";
import "./InputBase.scss";

export const cnInput = cn("Input");

export interface InputProps {
    type: "text" | "radio" | "checkbox";
    hovered: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, value?: any) => void;
    id: string;
    text?: string;
    changeField?: string;
    name: string;
    className?: string;
    checked?: boolean;
    focused: boolean;
    value?: number | string;
    [key: string]: any;
}

export class InputBase extends PureComponent<InputProps, any> {
    public render() {
        const {
            type,
            hovered,
            focused,
            value,
            id,
            text,
            className,
            checked,
            onChange,
            ...otherProps } = this.props;
        return <div className={cnInput({
            checked,
            hovered,
            focused,
            type,
        }, [className])}>
            <input type={type} id={id} className={cnInput("Inner")}
                   checked={checked}
                   onChange={onChange}
                   value={value} {...otherProps}/>
            <label htmlFor={id} className={cnInput("Label")}>{text}</label>
        </div>;
    }
}
