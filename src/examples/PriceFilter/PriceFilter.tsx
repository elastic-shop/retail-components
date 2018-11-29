import * as React from "react"
import {cn} from "@bem-react/classname"
import {DoubleRange} from "../../common/DoubleRange"
import {Input} from "../../common/Input"
import "./PriceFilter.scss"
import {IPropsDoubleRangeController} from "../../common/DoubleRange/DoubleRangeBase"

const cnPriceFilter = cn("PriceFilter")

export interface IStateRangeController {
    min: number,
    max: number,
    leftVal: number,
    rightVal: number,
    mobile?: boolean
}

export default class PriceFilter extends React.Component<{}, IStateRangeController> {
    constructor(state: IStateRangeController) {
        super(state)
        this.state = {
            min: 1000,
            max: 10000,
            leftVal: 1000,
            rightVal: 1500,
            mobile: true,
        }
        this.normalizeValues = this.normalizeValues.bind(this)
    }

    public onChange = (field: Partial<keyof IPropsDoubleRangeController>, value: string ) => {
        const data: any = {}
        const withoutLetters = String(value).replace( /\D/g, "")
        data[field] = Number(withoutLetters)
        this.setState(data)
    }
    public normalizeValues = () => {
        const {leftVal, rightVal, max, min} = this.state
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
           this.setState(data)
        }
    }
    public render() {
        const {mobile, leftVal, rightVal, ...otherState} = this.state
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
                {inputs.map((input) => (
                    <div className={cnPriceFilter(`Container${input.containerName}`)}>
                        <Input type="text"
                               id={input.id}
                               value={input.value}
                               onBlur={this.normalizeValues}
                               className="PriceFilter-Input"
                               focused={true}
                               change={this.onChange}
                               hovered={!mobile}
                               checked={false}
                               field={input.field}/>
                    </div>))}
            </div>
            <DoubleRange id="price-double-range"
                         change={this.onChange}
                         className="PriceFilter-Range"
                         leftVal={leftVal}
                         rightVal={rightVal}
                         baseColor="#d8d8d8"
                         lightColor="#eb6745"
                         {...otherState}
                         hovered={!mobile}
                         focused={true}/>
        </div>
    }
}
