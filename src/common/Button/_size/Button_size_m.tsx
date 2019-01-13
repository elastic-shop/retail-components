import "./Button_size_m.scss";
import { withBemMod } from "@bem-react/core";
import { cnButton, IPresenterButton } from "../ButtonBase";

export const ButtonSizeM = withBemMod<IPresenterButton>(cnButton(), {size: "m"});
