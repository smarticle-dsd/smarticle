export type PdfViewerPageProps = {
  /**
   * Id prefix for DOM elements inside PdfViewerPage component
   */
  domID?: string;
  /**
   * Test prefix for `data-testid` attribute that will be appended to DOM elements inside PdfViewerPage component
   */
  dataTestId?: string;
  /**
   * className that is added to the root element of the PdfViewerPage
   */
  className?: string;
};
