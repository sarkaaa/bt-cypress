context('Homepage', () => {
    before(() => {
      cy.visit('/o-webu')
    })

    describe('Category header', () => {
      it('Header\'s size is lower than on homepage', () => {
        cy.get('[data-cy="headerWrapper"]')
          .should('exist')
          .invoke('outerHeight')
          .should('be.lt', 750);
      })

      it('Header title', () => {
        const title = 'O Beskydských túrách'
        cy.get('[data-cy="headerTitle"]')
          .should('have.text', title)
      })
    })

    describe.only('Sections', () => {
      it('Info section exists', () => {
        cy.get('[data-cy="aboutInfo"]')
          .scrollIntoView()
          .should('exist')
          .and('be.visible')
      })

      it('About - image', () => {
        cy.get('[data-cy="aboutInfoImage"]')
          .should('exist')
          .and('be.visible')
      })

      it('About - email link', () => {
        cy.get('[data-cy="aboutInfo"]')
          .then(aboutInfoWrapper => {
            cy.wrap(aboutInfoWrapper)
              .find('[data-cy="link"]')
              .each(linkEl => {
                if (linkEl.text() === 'info@beskydsketury.cz') {
                  cy.wrap(linkEl)
                    .should('have.attr', 'href')
                    .then((href) => {
                      expect(href).to.be.eq('mailto:info@beskydsketury.cz')
                    })
                }
              })
          })

        
      })

      it('About - personal website link', () => {
        cy.get('[data-cy="aboutInfo"]')
          .then(aboutInfoWrapper => {
            cy.wrap(aboutInfoWrapper)
              .find('[data-cy="link"]')
              .each(linkEl => {
                if (linkEl.text() === 'programuju') {
                  cy.wrap(linkEl)
                    .should('have.attr', 'href')
                    .then((href) => {
                      expect(href).to.be.eq('https://pandacode.cz/')
                    })
                }
              })
          })
      })     

      it('Technical info section exists', () => {
        cy.get('[data-cy="aboutTechnicalInfo"]')
          .scrollIntoView()
          .should('exist')
          .and('be.visible')
      })

      it('Technical info - links', () => {
        cy.fixture('infoLinks')
          .then(infoLinks => {
            cy.get('[data-cy="aboutTechnicalInfo"]')
              .then(aboutTechnicalInfoWrapper => {
                cy.wrap(aboutTechnicalInfoWrapper)
                  .find('[data-cy="link"]')
                  .each((linkEl, idx: number) => {
                    cy.wrap(linkEl)
                      .should('have.text', infoLinks[idx].title)
                      .and('have.attr', 'href')
                      .then((href) => {
                        expect(href).to.be.eq(infoLinks[idx].link)
                      })
                  })
              })
          })
      })
    })
  })