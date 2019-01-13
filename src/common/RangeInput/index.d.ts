import * as React from "react";

interface IPresenterRangeInput {
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

declare class RangeInput extends React.Component<IPropsRangeController, any>{};

export default RangeInput;