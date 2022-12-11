import React, { useMemo, FC } from "react";
import cs from "classnames";
import { Link } from "react-router-dom";
import myLogo from "./logo.png";
import { HeaderProps } from "./Header.types";

const Header: FC<HeaderProps> = ({
  domID = "header",
  dataTestId = "test-header",
  className,
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
    <div
      id={domIDs.root}
      className={cs("sa-header", className)}
      data-testid={dataTestIDs.root}
    >
      <nav className={cs("header-wrapper", className)}>
        <div className={cs("logo", className)}>
          <Link to="/" className={cs("brand", className)}>
            <img src={myLogo} alt="Smarticle Logo" />
            <div className={cs("brand-name", className)}>smarticle</div>
          </Link>
        </div>
        <div className={cs("navigation", className)}>
          <Link to="/about">About</Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
