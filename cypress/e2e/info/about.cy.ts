describe("About page", () => {
  before(() => {
    cy.visit("/o-webu");

    cy.fixture('aboutPage').then((about) => {
      this.about = about
    })
  });

  it("Page - about", () => {
    cy.step("Category header");
    cy.log("Header's size is lower than on homepage");
    cy.get('[data-cy="headerWrapper"]')
      .invoke("outerHeight")
      .should("be.lt", 750);

    cy.log("Header title");
    cy.get('[data-cy="headerTitle"]').should("have.text", this.about.pageTitle);

    cy.step("Sections");
    cy.log("Info section exists");
    cy.get('[data-cy="aboutInfo"]').scrollIntoView().should("be.visible");

    cy.log("About - image");
    cy.get('[data-cy="aboutInfoImage"]').should("be.visible");

    cy.log("About - email link");
    cy.get('[data-cy="aboutInfo"]')
      .find('[data-cy="link"]')
      .first()
      .should(
        "have.attr",
        "href",
        this.about.emailLink
      );

    cy.log("About - personal website link");
    cy.get('[data-cy="aboutInfo"]').then((aboutInfoWrapper) => {
      cy.wrap(aboutInfoWrapper)
        .find('[data-cy="link"]')
        .eq(1)
        .should(
          "have.attr",
          "href",
          this.about.pandacodeLink
        );
    });

    cy.log("Technical info section exists");
    cy.get('[data-cy="aboutTechnicalInfo"]')
      .scrollIntoView()
      .and("be.visible");

    cy.log("Technical info - links");
    cy.fixture("infoLinks").then((infoLinks) => {
      cy.get('[data-cy="aboutTechnicalInfo"]').then(
        (aboutTechnicalInfoWrapper) => {
          cy.wrap(aboutTechnicalInfoWrapper)
            .find('[data-cy="link"]')
            .each((linkEl, idx: number) => {
              cy.wrap(linkEl)
                .should("have.text", infoLinks[idx].title)
                .and("have.attr", "href", infoLinks[idx].link);
            });
        }
      );
    });
  });
});
