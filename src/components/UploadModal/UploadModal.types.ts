export type UploadModalProps = {
  /**
   * Id prefix for DOM elements inside Upload Modal component
   */
  domID?: string;
  /**
   * Test prefix for `data-testid` attribute that will be appended to DOM elements inside Upload Modal component
   */
  dataTestId?: string;
  /**
   * className that is added to the root element of the Upload Modal
   */
  className?: string;

  /**
   * Boolean that indetify status of Upload Modal
   */
  isVisible: boolean;
  /**
   * Toggle function that set the visibility of Upload Modal
   * @returns
   */
  toggle: () => void;
};
