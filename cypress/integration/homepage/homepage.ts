context('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Top navbar', () => {
    it('Logo is loaded', () => {
      cy.get('[data-cy="btLogo"]')
        .should('exist')
        .and('be.visible')
    })

    it('Navigation is loaded', () => {
      const navigationTitles = ['Hlavní stránka', 'Trasy', 'O webu']

      cy.get('[data-cy="navLink"]')
        .each((navigationLinkLi, idx: number) => {
          cy.wrap(navigationLinkLi)
            .find('[data-cy="link"]')
            .then(navigationLink => {
              cy.wrap(navigationLink)
                .should('exist')
                .and('have.text', navigationTitles[idx])
            })
        })
    })

    it('Title is exist', () => {
      const title = 'Beskydské túry'

      cy.get('[data-cy="headerTitle"]')
        .should('exist')
        .and('have.text', title)
    })

    it('Subitle is exist', () => {
      const subtitle = 'Pěší trasy v Beskydech'

      cy.get('[data-cy="headerSubtitle"]')
        .should('exist')
        .and('have.text', subtitle)
    })

    it('Header chevron is exist', () => {
      cy.get('[data-cy="headerSubtitle"]')
        .should('exist')
        .and('be.visible')
        .then(chevronDown => {
          cy.wrap(chevronDown)
            .click()
        })
    })
  })

  describe('Main section', () => {
    it('Section title', () => {
      const title = 'O čem jsou Beskydské túry?'

      cy.get('[data-cy="mainInfoTitle"]')
        .should('exist')
        .and('have.text', title)
    })

    it('Section content exists', () => {
      cy.get('[data-cy="mainInfoContent"]')
        .should('exist')
    })

    it('Section button exists and redirects', () => {
      const urlName = 'about'

      cy.get('[data-cy="mainInfo"]')
        .find('[data-cy="button"]')
        .then(btn => {
          cy.wrap(btn)
            .click()
            .then(() => {
              cy.url()
                .should('contain', urlName)
            })
        })
    })
  })

  describe('How it works section', () => {
    it('Steps', () => {
      cy.get('[data-cy="findTrail"]')
        .find('[data-cy="infoContainer"]')
        .each(infoContainer => {
          cy.wrap(infoContainer)
            .should('exist')
            .and('be.visible')
          
          cy.wrap(infoContainer)
            .find('[data-cy="infoContainerImg"]')
            .then(trailImg => {
              cy.wrap(trailImg)
                .should('exist')
                .and('be.visible')
            })

          cy.wrap(infoContainer)
            .find('[data-cy="infoContainerTitle"]')
            .then(trailTitle => {
              cy.wrap(trailTitle)
                .should('exist')
                .and('be.visible')
            })

          cy.wrap(infoContainer)
            .find('[data-cy="infoContainerDescription"]')
            .then(trailDescription => {
              cy.wrap(trailDescription)
                .should('exist')
                .and('be.visible')
            })
        })
      
      
    })

    it('Section button exists and redirects', () => {
      const urlName = 'trasy'
      cy.get('[data-cy="findTrail"]')
        .next()
        .find('[data-cy="button"]')
        .then(btn => {
          cy.wrap(btn)
            .click()
            .then(() => {
              cy.url()
                .should('contain', urlName)
            })
        })
    })
  })

  describe('Instagram feed', () => {
    it('Feed wrapper', () => {
      cy.get('[data-cy="igWrapper"]')
        .should('exist')
        .and('be.visible')
        .find('[data-cy="igTile"]')
        .then(igTile => {
          expect(igTile.length).be.eq(10)
        })
        .each(igTile => {
          const igLink = 'https://www.instagram.com/'
          cy.wrap(igTile)
            .should('be.visible')
            .then(() => {
              cy.wrap(igTile)
                .find('[data-cy="igTileInner"]')
                .then(igTileInner => {
                  cy.wrap(igTileInner)
                    .should('have.attr', 'href')
                    .should('not.be.empty')
                    .and('contain', igLink)
                })

              cy.wrap(igTile)
                .find('[data-cy="igTileOverlay"]')
                .then(igTileOverlay => {
                  cy.wrap(igTileOverlay)
                    .invoke('attr', 'style', 'opacity: 1')
                    .should('exist')
                    .and('be.visible')
                    .then(() => {
                      cy.wrap(igTileOverlay)
                        .find('[data-cy="igTileDescription"]')
                        .should('exist')
                        .and('be.visible')
                    })
                })
            })
        })
    })
  })

  describe('Footer', () => {
    it('Footer exists and is visible', () => {
      cy.get('[data-cy="footer"]')
        .should('exist')
        .and('be.visible')
    })

    it('Icons', () => {
      const links = [
        'mailto:info@beskydsketury.cz',
        'https://github.com/sarkaaa/beskydske-tury',
        'https://www.instagram.com/beskydsketury/'
      ]

      cy.get('[data-cy="footer"]')
        .find('[data-cy="iconLink"]')
        .each((iconLink, idx: number) => {
          cy.wrap(iconLink)
            .should('exist')
            .should('have.attr', 'href')
            .should('not.be.empty')
            .and('contain', links[idx])
        })
    })
  })
})
