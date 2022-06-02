describe('tabs-showcase', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=components-tabs-sectioned-form--sectioned-form&args='
    )
  );
  it('should render the component', () => {
    cy.get('app-sectioned-form-visual')
      .should('exist')
      .should('be.visible')
      .should('include.text', 'Address form')
      .screenshot()
      .percySnapshot('sectioned-form');
  });
});
