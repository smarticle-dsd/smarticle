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
  /**
   * Whether the tooltip has arrow or not and where it is
   */
  arrowType?: "without" | "top" | "right" | "bottom" | "left";
  /**
   * Arrow's position
   */
  title?: string;
  /**
   * First Button of tooltip
   */
  firstButton?: string;
  /**
   * Second Button of tooltip
   */
  secButton?: string;
  /**
   * Close function of the tooltip
   */
  close?: () => void;
  /**
   * Called when First Button is clicked
   */
  onFistButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Called when Second Button is clicked
   */
  onSecButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Children of Tooltip
   */
  children?: React.ReactElement;
};
