import {RangeHovered} from "./_hovered/Range_type_hovered"
import {RangeBase} from "./RangeBase"
import {compose} from "@bem-react/core"

export const Range = compose(RangeHovered)(RangeBase)
