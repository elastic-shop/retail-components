import {IClassNameProps, withBemMod} from "@bem-react/core"
import {cnInput} from "../InputBase"
import "./Input_type_radio.scss"

export const InputTypeRadio = withBemMod<IClassNameProps>(cnInput(), {type: "radio"})