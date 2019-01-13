import * as React from "react";
import ReactDOM, { render } from "react-dom";
import "./App.scss";
import { Input } from "./common/Input";
import DoubleRangeController from "./examples/DoubleRange/DoubleRangeController";
import RangeInput from "./common/RangeInput/RangeInput";
import Button from "./common/Button";

interface IStateApp {
    min: number;
    max: number;
    leftVal: number;
    rightVal: number;
    mobile: false;
    checkbox1: boolean;
}

class App extends React.Component<any, IStateApp> {
    public constructor(props: any) {
        super(props);
        this.state = {
            min: 898,
            max: 1000,
            leftVal: 800,
            rightVal: 1000,
            mobile: false,
            checkbox1: false
        };
        this.onChange = this.onChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    public onChange = (data: any) => {
        this.setState(data);
    }
    public onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === "checkbox"
            ? e.target.checked
            : e.target.value;
        const name = e.target.name;
        // @ts-ignore
        this.setState({[name]: value});
    }

    public render() {
        // @ts-ignore
        const {min, max, leftVal, rightVal, mobile, checkbox} = this.state;
        return <div className="App">
            <div style={{border: "2px solid #eb6745", padding: 20}}>
                <h1>Library</h1>
                <Input name="Field1"
                       id="text"
                       type="text"
                       onChange={this.onInputChange}
                       text="Цена пива"
                       focused={true}
                       hovered={true}
                       key={1}/>
                <h2>Checkbox</h2>
                <Input id="name"
                       type="checkbox"
                       name="checkbox1"
                       checked={this.state.checkbox1}
                       onChange={this.onInputChange}
                       text="Пить пиво"
                       focused={true}
                       hovered={true}
                       key={2}/>
                <h2>Radio</h2>
                <Input field="123"
                       id="radio"
                       type="radio"
                       name="radio1"
                       onChange={this.onInputChange}
                       text="Пить пиво"
                       focused={true}
                       hovered={true}
                       key={3}/>
                <h2>Range</h2>
                <DoubleRangeController key={5}/>
                <h2>Button</h2>
                <Button text="Кнопка тест"
                        size="s"
                        hovered={true}
                        />
            </div>
            <div style={{border: "2px solid #eb6745", padding: 20, marginTop: 20}}>
                <h1>Examples</h1>
                <h3>Price Filter</h3>
                <RangeInput hovered={true}
                            focused={true}
                            min={min}
                            inputTimeout={3000}
                            lightColor="#d91624"
                            tickSize={10}
                            max={max}
                            leftVal={leftVal}
                            rightVal={rightVal}
                            onChange={this.onChange}/>
            </div>
        </div>;
    }
}

const root = document.getElementById("root");

if (root) {
    ReactDOM.render(<App/>, root);
}