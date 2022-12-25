import React, { useMemo, FC } from "react";
import cs from "classnames";

import { InputTextProps } from "./InputText.types";

const InputText: FC<InputTextProps> = ({
  domID = "input-text",
  dataTestId = "test-input-text",
  className,
  value,
  placeholder,
  onInput,
  onChange,
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
    <input
      id={domIDs.root}
      className={cs("sa-input-text", className)}
      data-testid={dataTestIDs.root}
      type="text"
      value={value}
      placeholder={placeholder}
      onInput={onInput}
      onChange={onChange}
    />
  );
};

export default InputText;
