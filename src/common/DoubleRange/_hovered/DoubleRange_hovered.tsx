import "./DoubleRange_hovered.scss"

import {cnRange} from "../DoubleRangeBase"
import {IClassNameProps, withBemMod} from "@bem-react/core"

export const DoubleRangeHovered = withBemMod<IClassNameProps>(cnRange(), {hovered: true})
