import {cn} from "@bem-react/classname";
import * as React from "react";
import "./RangeBase.scss";

export interface IPropsRange {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id: string;
    className?: string;
    hovered: boolean;
    focused: boolean;
    value: number;
    min: number;
    max: number;
    text?: string;
    [key: string]: any;
}

export interface IStateRange {
    thumbFocused: boolean;
}

export const cnRange = cn("Range");

export class RangeBase extends React.Component<IPropsRange, IStateRange> {
    constructor(props: IPropsRange) {
        super(props);
        this.state = {
            thumbFocused: false,
        };
    }
    public render() {
        const {id, className, value, text, min, max, onChange, hovered, focused, ...otherProps} = this.props;
        return <div className={cnRange({hovered, focused: this.state.thumbFocused}, [className])}>
                    <label htmlFor={id} className={cnRange("Label")}>{text}</label>
                    <div className={cnRange("Container")}
                         onTouchStart={() => this.toggleThumbColor()}
                         onTouchEnd={() => this.toggleThumbColor()}
                         onMouseDown={() => this.toggleThumbColor()}
                         onMouseUp={() => this.toggleThumbColor()}>
                        <input type="range"
                               min={min}
                               max={max}
                               id={`${id}-track`}
                               readOnly={true}
                               className={cnRange("Track")}
                               value={value} {...otherProps}/>
                        <input type="range" min={min} max={max} className={cnRange("Thumb")}
                              onChange={(e) => onChange(e)} value={value} {...otherProps}/>
                    </div>
               </div>;
    }
    private toggleThumbColor() {
        if (this.props.focused) {
            this.setState({thumbFocused: !this.state.thumbFocused});
        }
    }
}
