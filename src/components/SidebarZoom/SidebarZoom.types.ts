export type SidebarZoomProps = {
  /**
   * Id prefix for DOM elements inside SidebarZoom component
   */
  domID?: string;
  /**
   * Test prefix for `data-testid` attribute that will be appended to DOM elements inside SidebarZoom component
   */
  dataTestId?: string;
  /**
   * className that is added to the root element of the SidebarZoom
   */
  className?: string;
  titleText?: string;
  handleZoomIn?: () => void;
  handleZoomOut?: () => void;
  zoomInDisabled?: boolean;
  zoomOutDisabled?: boolean;
};
