import { withBemMod } from "@bem-react/core";
import { cnInput, IPresenterInputProps } from "../InputBase";
import "./Input_hovered.scss";

export const InputHovered = withBemMod<IPresenterInputProps>(cnInput(), {hovered: true});
