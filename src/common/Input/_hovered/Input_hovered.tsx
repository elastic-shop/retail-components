import {IClassNameProps, withBemMod} from "@bem-react/core"
import {cnInput} from "../InputBase"
import "./Input_hovered.scss"

export const InputHovered = withBemMod<IClassNameProps>(cnInput(), {hovered: true})