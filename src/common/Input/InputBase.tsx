import {cn} from "@bem-react/classname"
import React from "react"
import "./InputBase.scss"

export const cnInput = cn("Input")

export interface InputProps {
    type: "text" | "radio" | "checkbox",
    hovered: boolean,
    field: string,
    id: string,
    text?: string,
    className?: string,
    checked?: boolean,
    focused: boolean,
    value?: number | string,
    change: (key: any, value: any) => void,
    [key: string]: any
}

export class InputBase extends React.Component<InputProps, any> {
    public onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { change, field} = this.props
        const target = e.target
        const value = target.type === "checkbox" ? target.checked : target.value
        if (change) {
            change(field, value)
        }
    }
    public render() {
        const {
            type,
            hovered,
            focused,
            value,
            field,
            id,
            text,
            className,
            checked,
            change,
            ...otherProps } = this.props
        return <div className={cnInput({
            checked,
            hovered,
            focused,
            type,
        }, [className])}>
            <input type={type} id={id} className={cnInput("Inner")}

                   onChange={this.onChange}
                   value={value} {...otherProps}/>
            <label htmlFor={id} className={cnInput("Label")}>{text}</label>
        </div>
    }
}
