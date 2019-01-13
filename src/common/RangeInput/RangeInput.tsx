import * as React from "react";
import { cn } from "@bem-react/classname";
import Range from "../Range";
import Input from "../Input";
import "./RangeInput.scss";
import { IPropsDoubleRangeController } from "../Range/RangeBase";
import { IClassNameProps } from "@bem-react/core";

const cnPriceFilter = cn("RangeInput");

interface IPresenterRangeInput extends IClassNameProps {
    hovered?: boolean;
    focused?: boolean;
}

interface IPropsRangeController extends IPresenterRangeInput {
    min: number;
    max: number;
    leftVal: number;
    rightVal: number;
    onChange: (data: any) => void;
    tickSize?: number;
    baseColor?: string;
    lightColor?: string;
    inputTimeout?: number;
}

interface IStateRangeController {
    leftVal: number;
    rightVal: number;
}

export default class RangeInput extends React.Component<IPropsRangeController, IStateRangeController> {
    private timer?: number;
    constructor(props: IPropsRangeController) {
        super(props);
        this.state = {
            leftVal: props.leftVal,
            rightVal: props.rightVal
        };
    }

    public componentDidUpdate(prevProps: IPropsRangeController) {
        const {leftVal, rightVal} = this.props;
        const {leftVal: oldLeftVal, rightVal: rightLeftVal} = prevProps;
        if (leftVal + rightVal !== oldLeftVal + rightLeftVal) {
            this.setState({
                leftVal,
                rightVal
            });
        }
    }

    public render() {
        const {
            hovered = false,
            focused = false,
            leftVal: pLeftVal,
            rightVal: pRightVal,
            tickSize,
            min,
            max,
            onChange,
            baseColor,
            lightColor,
            ...otherState
        } = this.props;
        const {leftVal, rightVal} = this.state;
        const inputs = [
            {
                value: leftVal,
                name: "leftVal",
                postfix: "Left",
                id: "price-left-value"
            },
            {
                value: rightVal,
                name: "rightVal",
                postfix: "Right",
                id: "price-right-value"
            }
        ];
        return <div className={cnPriceFilter()}>
            <div className={cnPriceFilter("Inputs")}>
                {inputs.map((input, key) => (
                    <div className={cnPriceFilter(`Container${input.postfix}`)} key={key}>
                        <Input type="text"
                               id={input.id}
                               name={input.name}
                               onBlur={this.applyRange}
                               value={input.value}
                               className="RangeInput-Input"
                               focused={focused}
                               onChange={this.onInputChange}
                               hovered={hovered}
                               checked={false}
                        />
                    </div>))}
            </div>
            <Range id="price-double-range"
                   onChange={this.onRangeChange}
                   className="RangeInput-Range"
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
    private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { inputTimeout } = this.props;
        const data: any = {};
        const value = e.currentTarget.value;
        const field = e.currentTarget.name;
        const withoutLetters = String(value).replace(/\D/g, "");
        data[field] = Number(withoutLetters);
        this.onChange(data);
        if (inputTimeout) {
            clearTimeout(this.timer);
            this.timer = window.setTimeout(this.applyRange, inputTimeout);
        }
    }
    private onRangeChange = (field: Partial<keyof IPropsDoubleRangeController>, value: string) => {
        const data: any = {};
        data[field] = Number(value);
        this.onChange(data);
    }

    private applyRange = () => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        const normalized = this.normalizeValues();
        this.props.onChange(normalized);
        this.setState(normalized);
    }

    private readonly normalizeValues = () => {
        const {max, min} = this.props;
        let {leftVal, rightVal} = this.state;
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
        return {leftVal, rightVal};
    }
}
