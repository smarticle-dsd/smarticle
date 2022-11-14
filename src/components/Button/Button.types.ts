import React from "react";

export type ButtonProps = {
  /**
   * Id prefix for DOM elements inside Button component
   */
  domID?: string;
  /**
   * Test prefix for `data-testid` attribute that will be appended to DOM elements inside Button component
   */
  dataTestId?: string;
  /**
   * className that is added to the root element of the Button
   */
  className?: string;
  /**
   * One of the three types of button
   */
  type?: "primary" | "secondary" | "link";
  /**
   * Size of the button
   */
  size?: "extralarge" | "large" | "medium" | "small";
  /**
   * Whether the button is disabled or not
   */
  disabled?: boolean;
  /**
   * Whether the button action is dangerous or not
   */
  dangerous?: boolean;
  /**
   * Called when the button is clicked
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Children of the button element
   */
  children?: React.ReactNode;
};
