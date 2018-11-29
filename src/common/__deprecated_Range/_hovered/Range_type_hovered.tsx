import {IClassNameProps, withBemMod} from "@bem-react/core"
import "./Range_type_hovered.scss"
import {cnRange} from "../RangeBase"

export const RangeHovered = withBemMod<IClassNameProps>(cnRange(), {hovered: true})
