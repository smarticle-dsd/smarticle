export type PDFViewerProps = {
  /**
   * Id prefix for DOM elements inside RedCircle component
   */
  domID?: string;
  /**
   * Test prefix for `data-testid` attribute that will be appended to DOM elements inside RedCircle component
   */
  dataTestId?: string;
  /**
   * className that is added to the root element of the RedCircle
   */
  className?: string;
  /**
   * Text inside the red circle
   */
  url?: string;
};
