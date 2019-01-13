import "./Button_type_inverted.scss";
import { withBemMod } from "@bem-react/core";
import { cnButton, IPresenterButton } from "../ButtonBase";

export const ButtonTypeInverted = withBemMod<IPresenterButton>(cnButton(), {type: "inverted"});
