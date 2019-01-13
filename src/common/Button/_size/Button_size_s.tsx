import "./Button_size_s.scss";
import { withBemMod } from "@bem-react/core";
import { cnButton, IPresenterButton } from "../ButtonBase";

export const ButtonSizeS = withBemMod<IPresenterButton>(cnButton(), {size: "s"});
