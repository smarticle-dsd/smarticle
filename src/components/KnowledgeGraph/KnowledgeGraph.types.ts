export type KnowledgeGraphProps = {
  /**
   * Id prefix for DOM elements inside KnowledgeGraph component
   */
  domID?: string;
  /**
   * Test prefix for `data-testid` attribute that will be appended to DOM elements inside KnowledgeGraph component
   */
  dataTestId?: string;
  /**
   * className that is added to the root element of the KnowledgeGraph
   */
  className?: string;
  paperTitle: string;
};
