export type SidebarErrorProps = {
  /**
   * Id prefix for DOM elements inside SidebarError component
   */
  domID?: string;
  /**
   * Test prefix for `data-testid` attribute that will be appended to DOM elements inside SidebarError component
   */
  dataTestId?: string;
  /**
   * className that is added to the root element of the SidebarError
   */
  className?: string;
  message?: string;
  paperTitle?: string;
  severity?: string;
  // Function to get data for summary and knowledge graph
  getData?: (id: string | null, title: string | null) => void;
};
