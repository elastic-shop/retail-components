import { withBemMod } from "@bem-react/core";
import { cnInput, IPresenterInputProps } from "../InputBase";
import "./Input_type_checkbox.scss";

export const InputTypeCheckBox = withBemMod<IPresenterInputProps>(cnInput(), {type: "checkbox"});
