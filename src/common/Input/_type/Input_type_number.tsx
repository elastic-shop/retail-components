import { withBemMod } from "@bem-react/core";
import { cnInput, IPresenterInputProps } from "../InputBase";
import "./Input_type_number.scss";

export const InputTypeNumber = withBemMod<IPresenterInputProps>(cnInput(), {type: "number"});
