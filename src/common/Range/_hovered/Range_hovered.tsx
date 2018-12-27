import "./Range_hovered.scss";

import {cnRange} from "../RangeBase";
import {IClassNameProps, withBemMod} from "@bem-react/core";

export const RangeHovered = withBemMod<IClassNameProps>(cnRange(), {hovered: true});
