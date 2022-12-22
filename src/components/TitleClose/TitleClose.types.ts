export type TitleCloseProps = {
  /**
   * Id prefix for DOM elements inside TitleClose component
   */
  domID?: string;
  /**
   * Test prefix for `data-testid` attribute that will be appended to DOM elements inside TitleClose component
   */
  dataTestId?: string;
  /**
   * className that is added to the root element of the TitleClose
   */
  className?: string;
  titleText?: string;
  handleClose?: () => void;
};
