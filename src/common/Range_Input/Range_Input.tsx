import * as React from "react";
import {cn} from "@bem-react/classname";
import {DoubleRange} from "../Range";
import {Input} from "../Input";
import "./Range_Input.scss";
import {IPropsDoubleRangeController} from "../Range/RangeBase";

const cnPriceFilter = cn("Range_Input");

export interface IPropsRangeController {
    min: number;
    max: number;
    leftVal: number;
    rightVal: number;
    onChange: (data: any) => void;
    hovered: boolean;
    focused: boolean;
    tickSize?: number;
    baseColor?: string;
    lightColor?: string;
}

export interface IStateRangeController {
    leftVal: number;
    rightVal: number;
}

export default class Range_Input extends React.Component<IPropsRangeController, IStateRangeController> {
    constructor(props: IPropsRangeController) {
        super(props);
        this.state = {
            leftVal: props.leftVal,
            rightVal: props.rightVal,
        };
        this.applyRange = this.applyRange.bind(this);
    }
    public componentDidUpdate(prevProps: IPropsRangeController) {
        const { leftVal, rightVal } = this.props;
        const { leftVal: oldLeftVal , rightVal: rightLeftVal } = prevProps;
        if (leftVal + rightVal !== oldLeftVal + rightLeftVal) {
            this.setState({
                leftVal,
                rightVal,
            });
        }
    }
    public render() {
        const { hovered,
                focused,
                leftVal: pLeftVal,
                rightVal: pRightVal,
                tickSize,
                min,
                max,
                onChange,
                baseColor,
                lightColor,
                ...otherState } = this.props;
        const { leftVal, rightVal } = this.state;
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
                    <div className={cnPriceFilter(`Container${input.postfix}`)}  key={key}>
                        <Input type="text"
                               id={input.id}
                               name={input.name}
                               onBlur={this.applyRange}
                               value={input.value}
                               className="Range_Input-Input"
                               focused={focused}
                               onChange={this.onInputChange}
                               hovered={hovered}
                               checked={false}
                            />
                    </div>))}
            </div>
            <DoubleRange id="price-double-range"
                         onChange={this.onDoubleChange}
                         className="Range_Input-Range"
                         min={min}
                         max={max}
                         tickSize={tickSize}
                         leftVal={leftVal}
                         rightVal={rightVal}
                         callback={this.applyRange}
                         baseColor={baseColor ? baseColor : "#d8d8d8"}
                         lightColor={lightColor ? lightColor : "#eb6745"}
                         hovered={hovered}
                         focused={focused}/>
        </div>;
    }
    private onChange = (data: IPropsDoubleRangeController) => {
        this.setState(data);
    }
    private onInputChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const data: any = {};
        const value = e.currentTarget.value;
        const field = e.currentTarget.name;
        const withoutLetters = String(value).replace( /\D/g, "");
        data[field] = Number(withoutLetters);
        this.onChange(data);
    }
    private onDoubleChange = (field: Partial<keyof IPropsDoubleRangeController>, value: string ) => {
        const data: any = {};
        const withoutLetters = String(value).replace( /\D/g, "");
        data[field] = Number(withoutLetters);
        this.onChange(data);
    }
    private applyRange() {
        this.props.onChange(this.normalizeValues());
    }
    private readonly normalizeValues = () => {
        const { max, min } = this.props;
        let { leftVal, rightVal } = this.state;
        if (leftVal < min) {
            leftVal = min;
        }
        if (leftVal > max) {
           leftVal = min;
        }
        if (leftVal) {
            if (leftVal > rightVal) {
                rightVal = leftVal;
            }
        }
        if (leftVal > rightVal) {
            rightVal = leftVal;
        }
        if (rightVal > max) {
            rightVal = max;
        }
        if (rightVal < min) {
            rightVal = max;
        }
        return { leftVal, rightVal };
    }
}
