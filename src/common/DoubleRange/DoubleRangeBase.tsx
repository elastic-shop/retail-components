import {cn} from "@bem-react/classname"
import * as React from "react"
import "./DoubleRangeBase.scss"

const colors = {
    base: "#d8d8d8",
    light: "#eb6745",
}

type InputValues = "leftVal" | "rightVal"

interface IPropsRange extends IPropsDoubleRangeController {
    change: (key: Partial<keyof IPropsDoubleRangeController>, value: string ) => void,
    id: string,
    className?: string,
    hovered: boolean,
    focused: boolean,
    baseColor: string,
    lightColor: string,
    text?: string,
    [key: string]: any
}

export interface IPropsDoubleRangeController {
    min: number,
    max: number,
    leftVal: number,
    rightVal: number,
}

export interface IStateRange {
    thumbFocused: boolean,
    touchNow: boolean,
    temp: any
}

export const cnRange = cn("DoubleRange")

export class DoubleRangeBase extends React.Component<IPropsRange, IStateRange> {
    private input?: HTMLInputElement | null
    constructor(props: IPropsRange) {
        super(props)
        this.state = {
            thumbFocused: false,
            touchNow: false,
            temp: {},
        }
    }
    public render() {
        const {id, className, leftVal, rightVal, text, min, max, lightColor, baseColor, change, hovered, focused, ...otherProps} = this.props
        let firstStopVal = Math.max(Math.round((leftVal - min) / (max - min) * 100), 0)
        let secondStopVal = Math.min(Math.round((rightVal - min) / (max - min) * 100), 100)
        if (secondStopVal < 0) {
            secondStopVal = 0
        }
        if (firstStopVal > 100) {
            firstStopVal = 100
        }
        if (firstStopVal > secondStopVal) {
            secondStopVal = 100
        }
        const gradient = makeLinearGradient(`(to right, ${colors.base},
                                                    ${colors.base} ${firstStopVal}%,
                                                    ${colors.light} ${firstStopVal}%,
                                                    ${colors.light} ${secondStopVal}%,
                                                    ${colors.base} ${secondStopVal}%)`)
        return <div className={cnRange({hovered, focused: focused && this.state.thumbFocused}, [className])}>
            <label htmlFor={id} className={cnRange("Label")}>{text}</label>
            <div className={cnRange("Container")}>
                <div className={cnRange("Gradient")}
                     style={{backgroundImage: gradient,
                             paddingLeft: `calc(${firstStopVal}% - 14px)`,
                             paddingRight: `calc(${100 - secondStopVal}% - 14px)`}}/>
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
        </div>
    }
    private onTouchStart = (e: React.TouchEvent<HTMLInputElement>) => {
        const { touchNow } = this.state
        if (!touchNow) {
            this.setState({touchNow: true, thumbFocused: true})
        }
        this.onTouch(e)
    }
    private onTouchEnd = (e: React.TouchEvent<HTMLInputElement>) => {
        const { touchNow } = this.state
        if (touchNow) {
            this.setState({touchNow: false, thumbFocused: false})
        }
    }
    private onMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
        this.setState({thumbFocused: true})
    }
    private onMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
        this.setState({thumbFocused: false})
    }
    private onTouch = (e: React.TouchEvent<HTMLInputElement>) => {
        if (this.input) {
            const { max, min, change } = this.props
            const { left, width } = this.input.getBoundingClientRect()
            const positionX = e.targetTouches[0].clientX
            let value = (positionX - left) / width
            if (value <= 0) {
                value = 0
            } else if (value >= 1) {
                value = 1
            }
            const pointValue = Math.round(min + value * (max - min))
            const point = this.defineClosestPoint(pointValue)
            change(point, String(pointValue))
        }
    }
    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { touchNow } = this.state
        const { change } = this.props
        if (!touchNow) {
            const value = Number(e.target.value)
            const point = this.defineClosestPoint(value)
            change(point, String(value))
        }
    }
    private defineClosestPoint(value: number): "leftVal" | "rightVal" {
        /* todo  некорректно определяет левую и правую точку, трудновоспоизводимый баг, редко встречается*/
        const { leftVal, rightVal, min } = this.props
        const dLeft = Math.abs(leftVal - value)
        const dRight = Math.abs(rightVal - value)
        let target: InputValues | null = null
        if ( dLeft > dRight ) {
            target = "rightVal"
        } else if (dLeft < dRight) {
            target = "leftVal"
            /* left and right equal */
        } else {
          const dMaxLeft = Math.abs(min - leftVal)
          if (dMaxLeft < value) {
              target = "rightVal"
          } else {
              target = "leftVal"
          }
        }
        return target
    }
}
const gradientPrefixes = ["linear-gradient", "-moz-linear-gradient", "-ms-linear-gradient", "-o-linear-gradient"]

function makeLinearGradient(gradient: string) {
    return `${getSupportedPropertyName(gradientPrefixes)}${gradient}`
}

function getSupportedPropertyName(properties: any[]) {
    for (let i: number = 0; i < properties.length; i++) {
        if (typeof document.body.style[properties[i]] !== undefined) {
            return properties[i]
        }
    }
    return null
}
