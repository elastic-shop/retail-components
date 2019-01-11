import {cn} from "@bem-react/classname";
import * as React from "react";
import "./RangeBase.scss";
import { IClassNameProps } from "@bem-react/core";

const colors = {
    base: "#d8d8d8",
    light: "#eb6745",
};

type InputValues = "leftVal" | "rightVal";

export interface IPresenterRange extends IClassNameProps {
    hovered?: boolean;
    focused?: boolean;
}

interface IPropsRange extends IPropsDoubleRangeController, IPresenterRange {
    onChange: (key: Partial<keyof IPropsDoubleRangeController>, value: string ) => void;
    id: string;
    className?: string;
    callback?: any;
    baseColor: string;
    lightColor: string;
    text?: string;
    tickSize?: number;
    [key: string]: any;
}

export interface IPropsDoubleRangeController {
    min: number;
    max: number;
    leftVal: number;
    rightVal: number;
}

export interface IStateRange {
    thumbFocused: boolean;
    touchNow: boolean;
}

export const cnRange = cn("Range");

export class RangeBase extends React.Component<IPropsRange, IStateRange> {
    private input?: HTMLInputElement | null;
    constructor(props: IPropsRange) {
        super(props);
        this.state = {
            thumbFocused: false,
            touchNow: false,
        };
    }
    public render() {
        const { id,
                tickSize,
                className,
                text,
                min,
                leftVal,
                rightVal,
                max,
                callback,
                lightColor,
                baseColor,
                onChange,
                hovered,
                focused,
                ...otherProps } = this.props;
        const { thumbFocused } = this.state;
        let firstStopVal = Math.max(
            Math.round((leftVal - min) / (max - min) * 100), 0);
        let secondStopVal = Math.min(
            Math.round((rightVal - min) / (max - min) * 100), 100);
        if (secondStopVal < 0) {
            secondStopVal = 0;
        }
        if (firstStopVal > 100) {
            firstStopVal = 100;
        }
        if (firstStopVal > secondStopVal) {
            secondStopVal = 100;
        }

        return <div className={cnRange({focused: focused && thumbFocused}, [className])}>
            <label htmlFor={id} className={cnRange("Label")}>{text}</label>
            <div className={cnRange("Container")}>
                <div className={cnRange("Gradient")}
                     style={{backgroundColor: `${lightColor}`}}/>
                <div
                    className="Range-Thumb Range-Thumb_left"
                    style={{transform: `translateX(${firstStopVal}%)`}}
                />
                <div
                    className="Range-Thumb Range-Thumb_right"
                    style={{transform: `translateX(${secondStopVal}%)`}}
                />
                <input type="range"
                       ref={(node) => this.input = node}
                       id={`${id}-track`}
                       min={min}
                       max={max}
                       onMouseDown={this.onMouseDown}
                       onMouseUp={this.onMouseUp}
                       onTouchStart={this.onTouchStart}
                       onTouchEnd={this.onTouchEnd}
                       onTouchMove={this.onTouch}
                       onChange={this.onChange}
                       className={cnRange("Track")}
                       {...otherProps}/>
            </div>
        </div>;
    }
    private onTouchStart = (e: React.TouchEvent<HTMLInputElement>) => {
        const { touchNow } = this.state;
        if (!touchNow) {
            this.setState({touchNow: true, thumbFocused: true});
        }
        this.onTouch(e);
    }
    private onTouchEnd = (e: React.TouchEvent<HTMLInputElement>) => {
        const { touchNow } = this.state;
        const { callback } = this.props;
        if (touchNow) {
            this.setState({touchNow: false, thumbFocused: false});
        }
        if (callback) {
            this.props.callback();
        }
    }
    private onMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
        this.setState({thumbFocused: true});
    }
    private onMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
        this.setState({thumbFocused: false});
        const { callback } = this.props;
        if (callback) {
            this.props.callback();
        }
    }
    private onTouch = (e: React.TouchEvent<HTMLInputElement>) => {
        if (this.input) {
            const { max, min, onChange } = this.props;
            const { left, width } = this.input.getBoundingClientRect();
            const positionX = e.targetTouches[0].clientX;
            let value = (positionX - left) / width;
            if (value <= 0) {
                value = 0;
            } else if (value >= 1) {
                value = 1;
            }
            const pointValue = this.roundValue(min + value * (max - min));
            const point = this.defineClosestPoint(pointValue);
            onChange(point, String(pointValue));
        }
    }
    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { touchNow } = this.state;
        const { onChange } = this.props;
        if (!touchNow) {
            const value = this.roundValue(Number(e.target.value));
            const point = this.defineClosestPoint(value);
            onChange(point, String(value));
        }
    }
    private roundValue(value: number) {
        const { min, max, tickSize = 1 } = this.props;
        if (value !== min && value !== max) {
            value = Math.round(value / tickSize) * tickSize;
        }
        return value;
    }
    private defineClosestPoint(value: number): "leftVal" | "rightVal" {
        const { leftVal, rightVal, min, max } = this.props;
        const dLeft = Math.abs(leftVal - value);
        const dRight = Math.abs(rightVal - value);
        let target: InputValues | null = null;
        if ( dLeft > dRight ) {
            target = "rightVal";
        } else if (dLeft < dRight) {
            target = "leftVal";
            /* left and right equal */
        } else {
          if (value > rightVal) {
              target = "rightVal";
          } else {
              target = "leftVal";
          }
        }
        return target;
    }
}
