import { Dispatch } from "react";

export type CustomSummaryProps = {
  /**
   * Id prefix for DOM elements inside CustomSummary component
   */
  domID?: string;
  /**
   * Test prefix for `data-testid` attribute that will be appended to DOM elements inside CustomSummary component
   */
  dataTestId?: string;
  /**
   * className that is added to the root element of the CustomSummary
   */
  className?: string;
  summary?: string;
  setSummary?: Dispatch<string | null>;
};
