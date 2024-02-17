describe("Trail detail page", () => {
  before(() => {
    cy.visit("/trasy");

    cy.fixture('trailDetail').then((trail) => {
      this.trail = trail
    })
  });

  it('Trails', () => {
    cy.intercept({ method: 'GET', url: '/page-data/na-lysou-horu-od-sance/page-data.json' }).as('trailDetail')
    cy.intercept({ method: 'POST', url: 'https://api.mapy.cz/v0/route' }).as('mapycz')
    
    cy.step('Enter the trail');
    cy.contains(this.trail.trailTitle)
      .click()

    cy.wait('@trailDetail')
    cy.wait('@mapycz')
    cy.step('Check trail tile detail');

    cy.log('Back to all trails link')
    cy.get('[class*="trasa__BackLinkWrapper"]')
      .find('[data-cy="link"]')
      .should('have.attr', 'href', '/trasy')

    cy.step('Trail detail')
    cy.get('[class*="trasa__MapWrapper"]')
      .should('be.visible')

    cy.get('[class*="trasa__InfoWrapper"]').as('trailInfoPanel');

    cy.log('Trail distance')
    cy.get('@trailInfoPanel')
      .eq(0)
      .should('be.visible')
      .and('contain', this.trail.distance)

    cy.log('Trail altitude')
    cy.get('@trailInfoPanel')
      .eq(1)
      .should('be.visible')
      .and('contain', this.trail.altitude)

    cy.log('Trail travel type')
    cy.get('@trailInfoPanel')
      .eq(2)
      .should('be.visible')
      .and('contain', this.trail.travelType)

    cy.log('Trail type')
    cy.get('@trailInfoPanel')
      .eq(3)
      .should('be.visible')
      .and('contain', this.trail.trailType)
    

    cy.get('[class*="trasa__Content"]')
      .should('be.visible')
      .and('contain', this.trail.descriptionPrimary)
      .and('contain', this.trail.descriptionSecondary)
      

    cy.get('[class*="trasa__LinkWrapper"]')
      .find('[data-cy="link"]')
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', 'https://mapy.cz/?planovani-trasy')
      
  })
});
