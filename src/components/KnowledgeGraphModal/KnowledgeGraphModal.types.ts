export type KnowledgeGraphModalProps = {
  /**
   * Id prefix for DOM elements inside KnowledgeGraphModal component
   */
  domID?: string;
  /**
   * Test prefix for `data-testid` attribute that will be appended to DOM elements inside KnowledgeGraphModal component
   */
  dataTestId?: string;
  /**
   * className that is added to the root element of the KnowledgeGraphModal
   */
  className?: string;
  isVisible: boolean;
  toggle: () => void;
  elements: Array<Record<string, Record<string, string>>> | null;
};
