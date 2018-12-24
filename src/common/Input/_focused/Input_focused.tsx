import {IClassNameProps, withBemMod} from "@bem-react/core";
import {cnInput} from "../InputBase";
import "./Input_focused.scss";

export const InputFocused = withBemMod<IClassNameProps>(cnInput(), {focused: true});
