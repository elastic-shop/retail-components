import "./Button_hovered.scss";
import { withBemMod } from "@bem-react/core";
import { cnButton, IPresenterButton } from "../ButtonBase";

export const ButtonHovered = withBemMod<IPresenterButton>(cnButton(), {hovered: true});