import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const CustomButton = ({
  children,
  onClick,
  btnClassName,
  tooltipClassName,
  tooltip,
  tooltipPlacement,
}) => (
  <Tooltip
    title={tooltip}
    className={tooltipClassName}
    placement={tooltipPlacement}
  >
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </Tooltip>
);

export default CustomButton;
