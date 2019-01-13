import * as React from "react";

interface IPresenterRange {
    hovered?: boolean;
    focused?: boolean;
}

interface IPropsRangeController {
    min: number;
    max: number;
    leftVal: number;
    rightVal: number;
}

interface IPropsRange extends IPropsRangeController, IPresenterRange {
    onChange: (key: Partial<keyof IPropsRangeController>, value: string ) => void;
    id: string;
    className?: string;
    callback?: any;
    baseColor: string;
    lightColor: string;
    text?: string;
    tickSize?: number;
}

declare class Range extends React.Component<IPropsRange, any> {};

export default Range;
