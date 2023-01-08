export type FeatureTooltipHandlerProps = {
  /**
   * Id prefix for DOM elements inside FeatureTooltipHandler component
   */
  domID?: string;
  /**
   * Test prefix for `data-testid` attribute that will be appended to DOM elements inside FeatureTooltipHandler component
   */
  dataTestId?: string;
  /**
   * className that is added to the root element of the FeatureTooltipHandler
   */
  className?: string;
  isVisible?: boolean;
  close?: () => void;
};
