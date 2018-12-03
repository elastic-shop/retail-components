import {compose} from "@bem-react/core"
import {InputBase} from "./InputBase"
import {InputHovered} from "./_hovered/Input_hovered"
import {InputTypeText} from "./_type/Input_type_text"
import {InputTypeCheckBox} from "./_type/Input_type_checkbox"
import {InputTypeRadio} from "./_type/Input_type_radio"
import {InputFocused} from "./_focused/Input_focused"
import PropTypes from "prop-types"

// @ts-ignore
export const Input = compose(InputTypeText, InputTypeCheckBox, InputTypeRadio, InputHovered, InputFocused)(InputBase)
// @ts-ignore
Input.propTypes = {
    type: PropTypes.oneOf(["text", "radio", "checkbox"]).isRequired,
    hovered: PropTypes.bool.isRequired,
    focused: PropTypes.bool.isRequired,
    field: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    text: PropTypes.string,
    className: PropTypes.string,
    checked: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    change: PropTypes.func.isRequired,
}
