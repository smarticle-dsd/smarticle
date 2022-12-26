import React from "react";

export type FeatureTooltipProps = {
  /**
   * Id prefix for DOM elements inside FeatureTooltip component
   */
  domID?: string;
  /**
   * Test prefix for `data-testid` attribute that will be appended to DOM elements inside FeatureTooltip component
   */
  dataTestId?: string;
  /**
   * className that is added to the root element of the FeatureTooltip
   */
  className?: string;
  isVisible?: boolean;
  /**
   * Whether the tooltip has arrow or not and where it is
   */
  arrowType?: "without" | "top" | "right" | "bottom" | "left";
  /**
   * Arrow's position
   */
  title?: string;
  /**
   * Text of tooltip
   */
  text?: string;
  /**
   * First Button
   */
  firstButton?: string;
  /**
   * First Button
   */
  secButton?: string;
  close?: () => void;
  /**
   * Called when a button is clicked
   */
  onFistButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSecButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactElement;
};
