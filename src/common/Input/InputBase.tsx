import {cn} from "@bem-react/classname"
import React, {FunctionComponent} from "react"
import "./InputBase.scss"

export const cnInput = cn("Input")

export interface InputProps {
    type: "text" | "range" | "radio" | "checkbox",
    hovered?: boolean,
    field: string,
    id: string,
    text?: string,
    className?: string,
    checked?: boolean,
    focused?: boolean,
    value?: number | string,
    change?: (key: any, value: string ) => void,
    [key: string]: any
}

export const InputBase: FunctionComponent<InputProps> = ({type,
                                                      hovered,
                                                      focused,
                                                      value,
                                                      field,
                                                      id,
                                                      text,
                                                      className,
                                                      checked,
                                                      change,
                                                      ...otherProps}) => {
    return <div className={cnInput({
        checked,
        hovered,
        focused,
        type,
    }, [className])}>
        <input type={type} id={id} className={cnInput("Inner")} checked={checked}
            // @ts-ignore
               onChange={(e) => change ? change(field, e.target.value)  : null } value={value} {...otherProps}/>
        <label htmlFor={id} className={cnInput("Label")}>{text}</label>
    </div>
}
