import {IClassNameProps, withBemMod} from "@bem-react/core"
import {cnInput} from "../InputBase"
import "./Input_type_text.scss"

export const InputTypeText = withBemMod<IClassNameProps>(cnInput(), {type: "text"})
