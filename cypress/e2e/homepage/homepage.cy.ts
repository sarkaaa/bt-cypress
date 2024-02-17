describe("Homepage", () => {
  before(() => {
    cy.visit("/");

    cy.fixture('page').then((page) => {
      this.page = page
    })
  });

  it("Homepage page", () => {
    cy.log("Title exists");
    cy.get('[data-cy="headerTitle"]')
      .should("exist")
      .and("have.text", this.page.title);

    cy.log("Subitle is exist");
    cy.get('[data-cy="headerSubtitle"]')
      .should("exist")
      .and("have.text", this.page.subtitle);

    cy.log("Header chevron is exist");
    cy.get('[data-cy="headerSubtitle"]')
      .should("exist")
      .and("be.visible")
      .then((chevronDown) => {
        cy.wrap(chevronDown).click();
      });

    cy.step("Main section");
    cy.log("Section title");
    cy.get('[data-cy="mainInfoTitle"]')
      .should("exist")
      .and("have.text", this.page.titleSecondary);

    cy.log("Section content exists");
    cy.get('[data-cy="mainInfoContent"]').should("exist");
    
    cy.fixture('navigation').then((navigationLinks) => {
      cy.log("Section button exists and redirects");
      cy.get('[data-cy="mainInfo"]')
        .find('[data-cy="button"]')
        .should('have.attr', 'href', navigationLinks[2].link)
    })

    cy.step("How it works section");
    cy.log("Steps");
    cy.get('[data-cy="findTrail"]')
      .scrollIntoView()
      .find('[data-cy="infoContainer"]')
      .each((infoContainer) => {
        cy.wrap(infoContainer).should("be.visible");

        cy.wrap(infoContainer)
          .find('[data-cy="infoContainerImg"]')
          .then((trailImg) => {
            cy.wrap(trailImg).should("be.visible");
          });

        cy.wrap(infoContainer)
          .find('[data-cy="infoContainerTitle"]')
          .then((trailTitle) => {
            cy.wrap(trailTitle).should("be.visible");
          });

        cy.wrap(infoContainer)
          .find('[data-cy="infoContainerDescription"]')
          .then((trailDescription) => {
            cy.wrap(trailDescription).should("be.visible");
          });
      });

    cy.log("Section button exists and redirects");
    cy.fixture('navigation').then((navigationLinks) => {
      cy.get('[data-cy="findTrail"]')
        .next()
        .find('[data-cy="button"]')
        .should('have.attr', 'href', navigationLinks[1].link)
    })

    cy.step("Instagram feed");
    cy.log("Feed wrapper");
    cy.get('[data-cy="igWrapper"]')
      .should("exist")
      .and("be.visible")
      .find('[data-cy="igTile"]')
      .then((igTile) => {
        expect(igTile.length).be.eq(10);
      })
      .each((igTile) => {
        cy.wrap(igTile)
          .should("be.visible")
          .then(() => {
            cy.wrap(igTile)
              .find('[data-cy="igTileInner"]')
              .then((igTileInner) => {
                cy.wrap(igTileInner)
                  .should("have.attr", "href")
                  .and('contain', 'https://www.instagram.com/');
              });

            cy.wrap(igTile)
              .find('[data-cy="igTileOverlay"]')
              .then((igTileOverlay) => {
                cy.wrap(igTileOverlay)
                  .invoke("attr", "style", "opacity: 1")
                  .should("exist")
                  .and("be.visible")
                  .then(() => {
                    cy.wrap(igTileOverlay)
                      .find('[data-cy="igTileDescription"]')
                      .should("exist")
                      .and("be.visible");
                  });
              });
          });
      });
  });
});
