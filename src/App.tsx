import * as React from "react"
import ReactDOM, {render} from "react-dom"
import "./App.scss"
import {Input} from "./common/Input"
import DoubleRangeController from "./examples/DoubleRange/DoubleRangeController"
import PriceFilter from "./common/PriceFilter/PriceFilter"

class App extends React.Component {
    public constructor(props: any) {
        super(props)
        this.state = {
            min: 1000,
            max: 5000,
            leftVal: 2000,
            rightVal: 4000,
            mobile: false,
            checkbox: false,
        }
        this.onChange = this.onChange.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
    }
    public onChange = (data: any) => {
        this.setState(data)
    }
    public onInputChange = (field: string, value: any) => {
            this.setState({[field]: value})
    }
    public render() {
        // @ts-ignore
        const { min, max, leftVal, rightVal, mobile, checkbox } = this.state
        return <div className="App">
            <div style={{border: "2px solid #eb6745", padding: 20}}>
                <h1>Library</h1>
                <Input field="123"
                       id="text"
                       type="text"
                       change={this.onInputChange}
                       text="Цена пива"
                       focused={true}
                       hovered={true}
                       key={1}/>
                <h2>Checkbox</h2>
                <Input field="checkbox"
                       id="name" type="checkbox"
                    // @ts-ignore
                       checked={this.state.checkbox}
                       text="Пить пиво"
                       change={this.onInputChange}
                       focused={true}
                       hovered={true}
                       key={2}/>
                <h2>Radio</h2>
                <Input field="123"
                       id="radio"
                       type="radio"
                       change={this.onInputChange}
                       text="Пить пиво"
                       focused={true}
                       hovered={true}
                       key={3}/>
                <h2>Range</h2>
                <DoubleRangeController key={5}/>
            </div>
            <div style={{border: "2px solid #eb6745", padding: 20, marginTop: 20}}>
                <h1>Examples</h1>
                <h3>Price Filter</h3>
                <PriceFilter hovered={true}
                             focused={true}
                             min={min}
                             max={max}
                             leftVal={leftVal}
                             rightVal={rightVal}
                             change={this.onChange} />
            </div>
        </div>
    }
}

const root = document.getElementById("root")

if (root) {
    ReactDOM.render(<App/>,  root)
}
