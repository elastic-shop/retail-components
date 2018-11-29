import {IClassNameProps, withBemMod} from "@bem-react/core"
import {cnInput} from "../InputBase"
import "./Input_type_checkbox.scss"

export const InputTypeCheckBox = withBemMod<IClassNameProps>(cnInput(), {type: "checkbox"})
