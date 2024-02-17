describe("Trails page", () => {
  before(() => {
    cy.visit("/trasy");
  });

  it('Trails', () => {
    cy.step("List if trail tiles exists");
    cy.log('Trails wrapper exists');
    cy.get('[class*="trasy__TrailsWrapper"]')
      .should('be.visible')
    
    cy.log('Trails tiles exist');
    cy.get('[class*="trasy__TrailsWrapper"]')
      .should('be.visible')
      .and('have.length.gt', 0)

    cy.step('Check trail tile detail');
    cy.get('[class*="trailTile__TileWrapper"]')
      .first()
      .as('trailType')

    cy.log('Trail tile title exists');
    cy.get('@trailType')
      .find('[class*="trailTile__Title"]')
      .invoke('text').should('not.be.empty')  

    cy.log('Trail tile trail type exists');
    cy.get('@trailType')
      .find('[class*="trailTile__TrailTypeWrapper"]')
      .within(trailType => {
        cy.wrap(trailType)
          .find('[class*="icon__IconWrapper"]')
          .should('be.visible')

        cy.wrap(trailType)
          .find('[class*="trailTile__InfoText"]')
          .should('be.visible')
      })

    cy.log('Trail tile distance exists');
    cy.get('@trailType')
      .find('[class*="trailTile__TrailLengthAvailabilityContent"]')
      .first()
      .within(trailType => {
        cy.wrap(trailType)
            .find('[class*="icon__IconWrapper"]')
            .should('be.visible')

        cy.wrap(trailType)
          .find('[class*="trailTile__InfoText"]')
          .should('be.visible')
    })
    
    cy.log('Trail tile travel type exists');
    cy.get('@trailType')
      .find('[class*="trailTile__TrailLengthAvailabilityContent"]')
      .last()
      .within(trailType => {
        cy.wrap(trailType)
            .find('[class*="icon__IconWrapper"]')
            .should('be.visible')
      })
  })
});
