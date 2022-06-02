describe('lists-storybook', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=components-lists--infinite-scroll&args=')
  );
  it('should render the component', () => {
    cy.get('app-infinite-scroll-visual')
      .should('exist')
      .should('be.visible')
      .screenshot()
      .percySnapshot('lists-infinite-scroll');
  });
});