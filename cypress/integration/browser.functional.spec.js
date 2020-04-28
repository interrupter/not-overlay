describe('notOverlay browser testing', function() {
  before(async () => {
    await cy.exec('npm run buildtest');
  });

  it('basic test', () => {
    cy.visit('http://localhost:7357/overlay.ui.html');
    cy.get('.not-overlay').should('exist');
  });
});
