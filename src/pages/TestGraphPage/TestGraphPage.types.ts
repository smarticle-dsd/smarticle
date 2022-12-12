export type TestGraphPageProps = {
  /**
   * Id prefix for DOM elements inside TestGraphPage component
   */
  domID?: string;
  /**
   * Test prefix for `data-testid` attribute that will be appended to DOM elements inside TestGraphPage component
   */
  dataTestId?: string;
  /**
   * className that is added to the root element of the TestGraphPage
   */
  className?: string;
};
