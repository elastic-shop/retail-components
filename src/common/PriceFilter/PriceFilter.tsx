import * as React from "react";
import {cn} from "@bem-react/classname";
import {DoubleRange} from "../DoubleRange";
import {Input} from "../Input";
import "./PriceFilter.scss";
import {IPropsDoubleRangeController} from "../DoubleRange/DoubleRangeBase";

const cnPriceFilter = cn("PriceFilter");

export interface IPropsRangeController {
    min: number;
    max: number;
    leftVal: number;
    rightVal: number;
    baseColor?: string;
    lightColor?: string;
    onChange: (data: any) => void;
    hovered: boolean;
    focused: boolean;
}

export interface IStateRangeController {
    leftTempVal: number;
    rightTempVal: number;
}

export default class PriceFilter extends React.Component<IPropsRangeController, IStateRangeController> {
    constructor(props: IPropsRangeController) {
        super(props);
        this.normalizeValues = this.normalizeValues.bind(this);
    }

    public onInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const data: any = {};
        const value = e.currentTarget.value;
        const field = e.currentTarget.name;
        const withoutLetters = String(value).replace( /\D/g, "");
        data[field] = Number(withoutLetters);
        this.props.onChange(data);
    }

    public onDoubleChange = (field: Partial<keyof IPropsDoubleRangeController>, value: string ) => {
        const data: any = {};
        const withoutLetters = String(value).replace( /\D/g, "");
        data[field] = Number(withoutLetters);
        this.props.onChange(data);
    }
    public normalizeValues = () => {
        const {leftVal, rightVal, max, min} = this.props;
        const data: any = {};
        if (leftVal < min) {
            data.leftVal = min;
        }
        if (leftVal > max) {
            data.leftVal = min;
        }
        if (data.leftVal) {
            if (data.leftVal > rightVal) {
                data.rightVal = leftVal;
            }
        } else if (leftVal > rightVal) {
            data.rightVal = leftVal;
        }
        if (rightVal > max) {
            data.rightVal = max;
        }
        if (rightVal < min) {
            data.rightVal = max;
        }
        if (Object.keys(data).length > 0) {
            this.props.onChange(data);
        }
    }
    public render() {
        const { hovered,
                focused,
                leftVal,
                rightVal,
                min,
                max,
                onChange,
                baseColor,
                lightColor,
                ...otherState } = this.props;
        const inputs = [
            {
                value: leftVal,
                name: "leftVal",
                postfix: "Left",
                id: "price-left-value",
            },
            {
                value: rightVal,
                name: "rightVal",
                postfix: "Right",
                id: "price-right-value",
            },
        ];
        return <div className={cnPriceFilter()}>
            <div className={cnPriceFilter("Inputs")}>
                {inputs.map((input, key) => (
                    <div className={cnPriceFilter(`Container${<input type="text" className="postfix"/>}`)}  key={key}>
                        <Input type="text"
                               id={input.id}
                               name={input.name}
                               value={input.value}
                               onBlur={this.normalizeValues}
                               className="PriceFilter-Input"
                               focused={focused}
                               onChange={this.onInputChange}
                               hovered={hovered}
                               checked={false}
                            />
                    </div>))}
            </div>
            <DoubleRange id="price-double-range"
                         onChange={this.onDoubleChange}
                         className="PriceFilter-Range"
                         min={min}
                         max={max}
                         leftVal={leftVal}
                         rightVal={rightVal}
                         baseColor={baseColor ? baseColor : "#d8d8d8"}
                         lightColor={lightColor ? lightColor : "#eb6745"}
                         hovered={hovered}
                         focused={focused}/>
        </div>;
    }
}
