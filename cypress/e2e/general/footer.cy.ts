describe("Check layout footer", () => {
  const links = [
    "mailto:info@beskydsketury.cz",
    "https://github.com/sarkaaa/beskydske-tury",
    "https://www.instagram.com/beskydsketury/",
  ];

  before(() => {
    cy.visit("/");
  })
  it('Footer', () => {
    cy.step("Footer");
    cy.log("Footer exists and is visible");

    cy.get('[data-cy="footer"]').should("exist").and("be.visible");
    cy.log("Footer icons");    

    cy.get('[data-cy="footer"]')
      .find('[data-cy="iconLink"]')
      .each((iconLink, idx: number) => {
        cy.wrap(iconLink)
          .should("exist")
          .should("have.attr", "href", links[idx]);
      });
  })
})