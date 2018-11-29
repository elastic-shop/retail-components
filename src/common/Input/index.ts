import {compose} from "@bem-react/core"
import {InputBase} from "./InputBase"
import {InputHovered} from "./_hovered/Input_hovered"
import {InputTypeText} from "./_type/Input_type_text"
import {InputTypeCheckBox} from "./_type/Input_type_checkbox"
import {InputTypeRadio} from "./_type/Input_type_radio"
import {InputFocused} from "./_focused/Input_focused"

export const Input = compose(InputTypeText, InputTypeCheckBox, InputTypeRadio, InputHovered, InputFocused)(InputBase)
