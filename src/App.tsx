import * as React from "react"
import ReactDOM from "react-dom"
import "./App.scss"
import {Input} from "./common/Input"
import DoubleRangeController from "./examples/DoubleRange/DoubleRangeController"
import PriceFilter from "./examples/PriceFilter/PriceFilter"

const App: React.FunctionComponent = () => {
    return <div className="App">
                <div style={{border: "2px solid #eb6745", padding: 20}}>
                    <h1>Library</h1>
                    <Input field="123" id="text" type="text" text="Цена пива" focused={true} hovered={true} key={1}/>
                    <h2>Checkbox</h2>
                    <Input field="123"
                           id="name" type="checkbox" text="Пить пиво"  focused={true} hovered={true} key={2}/>
                    <h2>Radio</h2>
                    <Input field="123" id="radio" type="radio" text="Пить пиво" focused={true} hovered={true} key={3}/>
                    <h2>Range</h2>
                    <DoubleRangeController key={5}/>
                </div>
                <div style={{border: "2px solid #eb6745", padding: 20, marginTop: 20}}>
                    <h1>Examples</h1>
                    <h3>Price Filter</h3>
                    <PriceFilter/>
                </div>
           </div>
}

const root = document.getElementById("root")

if (root) {
    ReactDOM.render(<App/>,  root)
}
