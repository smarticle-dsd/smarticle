export type ReferenceProps = {
  /**
   * Id prefix for DOM elements inside Reference component
   */
  domID?: string;
  /**
   * Test prefix for `data-testid` attribute that will be appended to DOM elements inside Reference component
   */
  dataTestId?: string;
  /**
   * className that is added to the root element of the Reference
   */
  className?: string;
};
