export type InputTextProps = {
  /**
   * Id prefix for DOM elements inside InputText component
   */
  domID?: string;
  /**
   * Test prefix for `data-testid` attribute that will be appended to DOM elements inside InputText component
   */
  dataTestId?: string;
  /**
   * className that is added to the root element of the InputText.
   */
  className?: string;
  /**
   * value defines the initial (default) value of the input field
   */
  value?: string;
  /**
   *  placeholder attribute specifies a short hint that describes the expected value of an input field
   */
  placeholder?: string;
  /**
   * The onInput event occurs when a text field gets user input.
   */
  onInput?: () => void;
  /**
   * The The onchange event occurs when the value of a text field has been changed.
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};
