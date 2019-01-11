import "./Range_hovered.scss";

import { cnRange, IPresenterRange } from "../RangeBase";
import { withBemMod } from "@bem-react/core";

export const RangeHovered = withBemMod<IPresenterRange>(cnRange(), {hovered: true});
