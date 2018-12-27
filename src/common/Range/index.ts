import {RangeHovered} from "./_hovered/Range_hovered";
import "./_focused/Range_focused.scss";
import {RangeBase} from "./RangeBase";
import {compose} from "@bem-react/core";

export const DoubleRange = compose(RangeHovered)(RangeBase);
