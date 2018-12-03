import * as React from "react"
import {cn} from "@bem-react/classname"
import {DoubleRange} from "../DoubleRange"
import {Input} from "../Input"
import PropTypes from "prop-types"
import "./PriceFilter.scss"
import {IPropsDoubleRangeController} from "../DoubleRange/DoubleRangeBase"

const cnPriceFilter = cn("PriceFilter")

export interface IPropsRangeController {
    min: number,
    max: number,
    leftVal: number,
    rightVal: number,
    baseColor?: string,
    lightColor?: string,
    change: (data: any) => void
    hovered: boolean,
    focused: boolean
}

export interface IStateRangeController {
    leftTempVal: number,
    rightTempVal: number,
}

export default class PriceFilter extends React.Component<IPropsRangeController, IStateRangeController> {
    public static propTypes = {
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        leftVal: PropTypes.number.isRequired,
        rightVal: PropTypes.number.isRequired,
        baseColor: PropTypes.string,
        lightColor: PropTypes.string,
        hovered: PropTypes.bool.isRequired,
        focused: PropTypes.bool.isRequired,
        change: PropTypes.func.isRequired,
    }
    constructor(props: IPropsRangeController) {
        super(props)
        this.state = {
            leftTempVal: props.leftVal,
            rightTempVal: props.rightVal,
        }
        this.normalizeValues = this.normalizeValues.bind(this)
    }

    public onChange = (field: Partial<keyof IPropsDoubleRangeController>, value: string ) => {
        const data: any = {}
        const withoutLetters = String(value).replace( /\D/g, "")
        data[field] = Number(withoutLetters)
        this.props.change(data)
    }
    public normalizeValues = () => {
        const {leftVal, rightVal, max, min} = this.props
        const data: any = {}
        if (leftVal < min) {
            data.leftVal = min
        }
        if (leftVal > max) {
            data.leftVal = min
        }
        if (data.leftVal) {
            if (data.leftVal > rightVal) {
                data.rightVal = leftVal
            }
        } else if (leftVal > rightVal) {
            data.rightVal = leftVal
        }
        if (rightVal > max) {
            data.rightVal = max
        }
        if (rightVal < min) {
            data.rightVal = max
        }
        if (Object.keys(data).length > 0) {
            this.props.change(data)
        }
    }
    public render() {
        const {hovered, focused, leftVal, rightVal, change, baseColor, lightColor, ...otherState} = this.props
        const inputs = [
            {
                value: leftVal,
                containerName: "Left",
                id: "price-left-value",
                field: "leftVal",
            },
            {
                value: rightVal,
                id: "price-right-value",
                containerName: "Right",
                field: "rightVal",
            },
        ]
        return <div className={cnPriceFilter()}>
            <div className={cnPriceFilter("Inputs")}>
                {inputs.map((input, key) => (
                    <div className={cnPriceFilter(`Container${input.containerName}`)}  key={key}>
                        <Input type="text"
                               id={input.id}
                               value={input.value}
                               onBlur={this.normalizeValues}
                               className="PriceFilter-Input"
                               focused={focused}
                               change={this.onChange}
                               hovered={hovered}
                               checked={false}
                               field={input.field}/>
                    </div>))}
            </div>
            <DoubleRange id="price-double-range"
                         change={this.onChange}
                         className="PriceFilter-Range"
                         leftVal={leftVal}
                         rightVal={rightVal}
                         baseColor={baseColor ? baseColor : "#d8d8d8"}
                         lightColor={lightColor ? lightColor : "#eb6745"}
                         {...otherState}
                         hovered={hovered}
                         focused={focused}/>
        </div>
    }
}
