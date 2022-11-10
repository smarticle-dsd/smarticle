import React, { useMemo, FC } from "react";
import cs from "classnames";

import { ButtonProps } from "./Button.types";

const Button: FC<ButtonProps> = ({
  domID = "button",
  dataTestId = "test-button",
  className,
  type = "primary",
  size = "medium",
  disabled = false,
  dangerous = false,
  onClick,
  children,
}): JSX.Element => {
  const domIDs = useMemo(
    () => ({
      root: domID,
    }),
    [domID],
  );

  const dataTestIDs = useMemo(
    () => ({
      root: dataTestId,
    }),
    [dataTestId],
  );

  return (
    <button
      id={domIDs.root}
      className={cs(
        "sa-button",
        className,
        type,
        size,
        dangerous && "dangerous",
      )}
      data-testid={dataTestIDs.root}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
