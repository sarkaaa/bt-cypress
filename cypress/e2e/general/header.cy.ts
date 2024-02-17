describe('Check layout header', () => {
  before(() => {
    cy.visit("/");
  })
  it('Header part', () => {
    cy.step("Top navbar");
    cy.log("Logo is loaded");
    cy.get('[data-cy="btLogo"]').should("exist").and("be.visible");

    cy.log("Navigation is loaded");
    cy.fixture('navigation').then((navigationLinks) => {
      cy.get('[data-cy="navLink"]').each((navigationLinkLi, idx: number) => {
        cy.wrap(navigationLinkLi)
          .find('[data-cy="link"]')
          .then((navigationLink) => {
            cy.wrap(navigationLink)
              .should("exist")
              .and("have.text", navigationLinks[idx].title)
              .should('have.attr', 'href', navigationLinks[idx].link)
          });
      });
    })
  })
})