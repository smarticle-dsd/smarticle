export type LoaderProps = {
  /**
   * Id prefix for DOM elements inside Loader component
   */
  domID?: string;
  /**
   * Test prefix for `data-testid` attribute that will be appended to DOM elements inside Loader component
   */
  dataTestId?: string;
  /**
   * className that is added to the root element of the Loader
   */
  className?: string;
};
