import { withBemMod } from "@bem-react/core";
import { cnInput, IPresenterInputProps } from "../InputBase";
import "./Input_type_radio.scss";

export const InputTypeRadio = withBemMod<IPresenterInputProps>(cnInput(), {type: "radio"});
