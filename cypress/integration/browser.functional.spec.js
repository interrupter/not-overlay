describe('notOverlay browser testing', function() {
  before(async () => {
    await cy.exec('npm run buildtest');
  });

  it('basic test', () => {
    cy.visit('http://localhost:7357/overlay.ui.html');
    cy.get('#create-overlay').click().then(()=>{
      cy.get('.not-overlay').should('exist');
      cy.get('.close-btn').should('exist');
      cy.get('.close-btn').click().then(()=>{
        cy.get('.not-overlay').should('not.exist')
      });
    });

    cy.get('#create-overlay-w-btn').click().then(()=>{
      cy.get('.not-overlay').should('exist');
      cy.get('.close-btn').should('not.exist');
      cy.get('.not-overlay').click().then(()=>{
        cy.get('.not-overlay').should('not.exist')
      });
    });
  });
});
