// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace jasmine {
  interface AsyncMatchers {
    toBeA11y(
      config?: import('../a11y/to-be-accessible-config').SkyAsyncMatcherToBeAccessibleConfig
    ): Promise<jasmine.CustomMatcherResult>;
  }
}
