import { withBemMod } from "@bem-react/core";
import { cnInput, IPresenterInputProps } from "../InputBase";
import "./Input_focused.scss";

export const InputFocused = withBemMod<IPresenterInputProps>(cnInput(), {focused: true});
