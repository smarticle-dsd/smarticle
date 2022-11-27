export type TestToolProps = {
  /**
   * Id prefix for DOM elements inside TestTool component
   */
  domID?: string;
  /**
   * Test prefix for `data-testid` attribute that will be appended to DOM elements inside TestTool component
   */
  dataTestId?: string;
  /**
   * className that is added to the root element of the TestTool
   */
  className?: string;
};
