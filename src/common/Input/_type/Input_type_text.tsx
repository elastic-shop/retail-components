import { withBemMod } from "@bem-react/core";
import { cnInput, IPresenterInputProps } from "../InputBase";
import "./Input_type_text.scss";

export const InputTypeText = withBemMod<IPresenterInputProps>(cnInput(), {type: "text"});
