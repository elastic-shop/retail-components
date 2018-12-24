import * as React from "react";
import {Range} from "./index";

interface IStateRangeController {
    value: number;
    min: number;
    max: number;
}

export default class RangeController extends React.Component<{}, IStateRangeController> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: 50,
            min: 10,
            max: 100,
        };
    }
    public render() {
        const { value, min, max } = this.state;

        return <Range id="range"
                          value={value}
                          min={min}
                          max={max}
                          text="Рендж"
                          hovered={true}
                          focused={true}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              this.setState({value: Number(e.target.value)})}/>;
    }
}
