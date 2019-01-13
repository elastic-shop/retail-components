import { ButtonBase } from "./ButtonBase";
import { compose } from "@bem-react/core";
import { ButtonSizeM } from "./_size/Button_size_m";
import { ButtonSizeS } from "./_size/Button_size_s";
import { ButtonHovered } from "./_hovored/Button_hovered";
import { ButtonTypeInverted } from "./_type/Button_type_inverted";

const Button = compose(
    ButtonSizeS,
    ButtonSizeM,
    ButtonHovered,
    ButtonTypeInverted
)(ButtonBase);

export default Button;
