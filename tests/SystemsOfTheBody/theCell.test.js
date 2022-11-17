const theCell = require('../../theCell').theCell

const organelles = theCell.organelles
const newCell = theCell.createCell(organelles)

describe('1. Cells & Tissues (p. 6)', () => {
  describe('a. generalized cell...', () => {
    it('  i. should contain organelles', () => {
      expect(theCell.organelles).toBeDefined()
    })

    it(` ii. cell organelles should consist of a cell membrane, 
    nuclear membrane, nucleoplasm, nucleolus, cytoplasm, endoplasmic 
    reticulum (rough and smooth), ribosome, golgi complex, 
    mitochrondrion, vacuole, lysosome, centriole, microtubule, 
    microfilament`, () => {
      const cellOrganelles = [
        'cellMembrane',
        'nuclearMembrane',
        'nucleoplasm',
        'nucleolus',
        'cytoplasm',
        { endoplasmicReticulum: ['rough', 'smooth'] },
        'ribosome',
        'golgiComplex',
        'mitochrondrion',
        'vacuole',
        'lysosome',
        'centrioles',
        'microtubule',
        'microfilament'
      ]

      cellOrganelles.forEach((cellOrganellePart, index) => {
        const theCellCellOrganelles = theCell.organelles

        if (typeof cellOrganellePart === 'string') {
          expect(theCellCellOrganelles).toContain(cellOrganellePart)
        } else {
          // organelle is an object

          const organelleName = Object.keys(cellOrganellePart)[0]
          let hasPartBeenFoundInBody = false

          for (let i = 0; i < theCellCellOrganelles.length; i++) {
            const bodyOrganelle = theCellCellOrganelles[i]
            const bodyPartIsAlsoAnObject = typeof bodyOrganelle !== 'string'

            if (bodyPartIsAlsoAnObject) {
              const bodyPartName = Object.keys(bodyOrganelle)[0]
              const bodyPartsAreTheSame = organelleName === bodyPartName

              if (bodyPartsAreTheSame) {
                expect(bodyOrganelle).toMatchObject(cellOrganellePart)
                hasPartBeenFoundInBody = true
                break
              }
            }
          }

          expect(hasPartBeenFoundInBody).toEqual(true)
        }
      })
    })

    it('iii. cell organelles should contain chromatin (a diffuse network of DNA and related protein)', () => {
      expect(theCell.organelles).toContain('chromatin')
    })
  })
})

describe('2. processes', () => {
  const mitosis = theCell.mitosis

  it('a. should be defined', () => {
    expect(mitosis).toBeDefined()
  })

  describe('b. createCell()... (p.6)', () => {
    it(' i. should be defined', () => {
      expect(theCell.createCell).toBeDefined()
    })

    it(' ii. should contain the following properties: shape, organelles', () => {
      const cellProperties = ['organelles', 'shape']
      const cell = theCell.createCell(organelles)

      cellProperties.forEach(property => {
        expect(cell).toHaveProperty(property)
      })
    })

    it(`iii. should create a cell object from the generalized cell's organelles`, () => {
      const cell = theCell.createCell(organelles)

      // console.log(JSON.stringify(cell, '', ' '))

      let expectedCell = {
        shape: null
      }

      let expectedOrganelles = getExpectedOrganelles()

      expect(cell.organelles).toEqual(
        expect.objectContaining(expectedOrganelles)
      )

      function getExpectedOrganelles () {
        let expectedOrganelles = {}

        organelles.forEach(organelle => {
          if (typeof organelle === 'string') {
            if (organelle === 'centrioles') {
              const motherId = expect.anything()
              const daughterId = expect.anything()

              expectedOrganelles[organelle] = [
                {
                  id: motherId,
                  isMother: true,
                  isDaughter: false,
                  cellAlignment: null,
                  chromosomeCount: 0,
                  daughterId: daughterId,
                  motherId: null,
                  hasAsters: false,
                  astersHaveSpreadAcrossCell: false
                },
                {
                  id: daughterId,
                  isMother: false,
                  isDaughter: true,
                  cellAlignment: null,
                  chromosomeCount: 0,
                  daughterId: null,
                  motherId: motherId,
                  hasAsters: false,
                  astersHaveSpreadAcrossCell: false
                }
              ]
            } else {
              expectedOrganelles[organelle] = {
                count: 1
              }
            }
          }

          if (typeof organelle === 'object') {
            const key = Object.keys(organelle)
            expectedOrganelles[key] = {}

            if (Array.isArray(organelle[key])) {
              const subOrganelleArray = organelle[key]

              subOrganelleArray.forEach(subOrganelle => {
                expectedOrganelles[key][subOrganelle] = {
                  count: 1
                }
              })
            }
          }
        })

        // console.log(JSON.stringify(expectedCell, '', ' '))

        return expectedOrganelles
      }
    })

    it.todo(' add proper counts')
  })

  describe('c. mitosis()... (p. 7)', () => {
    debugger

    const cell = JSON.parse(JSON.stringify(newCell))
    const mitosis = theCell.mitosis

    const enterInterphase = mitosis().enterInterphase
    const enterProphase = mitosis().enterProphase
    const enterMetaphase = mitosis().enterMetaphase
    const enterAnaphase = mitosis().enterAnaphase
    const enterTelophase = mitosis().enterTelophase

    it('i. should be defined', () => {
      expect(theCell.mitosis).toBeDefined()
    })

    describe(' ii. integrated test:', () => {
      it(`should take in a new cell and return an array of two daughter cells`, () => {
        const { daughterCells } = mitosis(newCell)
        const expectedDaughterCells = getDaughterCells()

        expect(daughterCells).toMatchObject(expectedDaughterCells)
      })
    })

    describe('iii. enterInterphase()...', () => {
      it('A. should be defined', () => {
        expect(enterInterphase).toBeDefined()
      })

      it('B. should duplicate DNA (in chromatin)', () => {
        const { cellAfterInterphase } = enterInterphase(cell)

        const chromatinCount = cellAfterInterphase.organelles.chromatin.count

        expect(chromatinCount).toEqual(2 * cell.organelles.chromatin.count)
      })

      it('C. should divide paired centrioles in centrosome', () => {
        const { cellAfterInterphase } = enterInterphase(cell)
        const centrioleCount = cellAfterInterphase.organelles.centrioles.length
        const centrioles = cellAfterInterphase.organelles.centrioles
        let areCentriolesUniqueObj = { areUnique: true }

        expect(centrioleCount).toEqual(2 * cell.organelles.centrioles.length)

        centrioles.forEach(centriole => {
          const centrioleId = centriole.id

          if (!areCentriolesUniqueObj[centrioleId]) {
            areCentriolesUniqueObj[centrioleId] = true
          } else {
            areCentriolesUniqueObj.areUnique = false
          }
        })

        expect(areCentriolesUniqueObj.areUnique).toBe(true)
      })
    })

    describe(' iv. enterProphase()...', () => {
      it('A. should be defined', () => {
        expect(enterProphase).toBeDefined()
      })

      it('B. should thicken, shorten, and coil dispersed chromatin to form condensed chromatin chromosomes', () => {
        const scenarios = [
          // isNewCell
          true,
          false
        ]

        let mockCell = JSON.parse(JSON.stringify(cell))

        scenarios.forEach(scenario => {
          const isNewCell = scenario
          const expectedChromosomeCount = 46

          if (!isNewCell) {
            const mockChromosomes = getMockChromosomesWoMeres()
            mockCell.organelles.chromatin = JSON.stringify(mockChromosomes)
          }

          const { cellAfterProphase } = enterProphase(mockCell)

          expect(cellAfterProphase.organelles.chromosomes.length).toEqual(
            expectedChromosomeCount
          )
        })
      })

      it('C. should ensure each chromosome is composed of two chromatids connected by a centromere', () => {
        const { cellAfterProphase } = enterProphase(cell)

        // console.log(JSON.stringify(cellAfterProphase, '', ' '))

        const chromosomes = cellAfterProphase.organelles.chromosomes
        const chromosomeObj = {
          centromeres: {
            count: 1,
            attachedToSpindleFiber: false,
            kinetochores: expect.anything()
          },
          chromatids: {
            cellAlignment: null,
            count: 2,
            leftSideCount: 0,
            rightSideCount: 0
          }
        }

        expect(Array.isArray(chromosomes)).toBe(true)

        chromosomes.forEach(chromosome => {
          expect(chromosome).toMatchObject(chromosomeObj)
        })
      })

      it.todo(
        'D. each chromatid should have the equivalent amount of DNA of a chromosome'
      )

      it('E. should break up/dissolve the nuclear membrane and nucleolus', () => {
        const { cellAfterProphase } = enterProphase(cell)
        const { nucleolus, nuclearMembrane } = cellAfterProphase.organelles

        expect(nucleolus.count).toEqual(0)
        expect(nuclearMembrane.count).toEqual(0)
      })

      it('F. should separate centrioles and move them to the opposite poles of the cell where they project microtubules (spindle fibers) called asters', () => {
        const { cellAfterProphase } = enterProphase(cell)
        const { centrioles } = cellAfterProphase.organelles

        centrioles.forEach(centriole => {
          expect(centriole.hasAsters).toBe(true)
          expect(centriole.astersHaveSpreadAcrossCell).toBe(true)
        })
      })

      it('G. should form kinetochores on the centromeres', () => {
        const { cellAfterProphase } = enterProphase(cell)
        const { chromosomes } = cellAfterProphase.organelles
        const kinetochoreCount = 2

        chromosomes.forEach(chromosome => {
          expect(chromosome.centromeres.kinetochores).toEqual(kinetochoreCount)
        })
      })

      it.todo('add chromosomes to list of standard cell properties')
    })

    describe('  v. enterMetaphase()...', () => {
      cell.organelles.chromosomes = [
        {
          centromeres: {
            count: 1,
            attachedToSpindleFiber: false,
            kinetochores: 1
          },
          chromatids: { count: 2 }
        },
        {
          centromeres: {
            count: 1,
            attachedToSpindleFiber: false,
            kinetochores: 1
          },
          chromatids: { count: 2 }
        }
      ]

      it('A. should be defined', () => {
        expect(enterMetaphase).toBeDefined()
      })

      it('B. should develop strands of microtubes across the cell center from paired centrioles', () => {
        let cell = JSON.parse(JSON.stringify(newCell))
        let cellCentrioles = cell.organelles.centrioles

        cellCentrioles.forEach(centriole => {
          centriole.hasAsters = true
        })

        const { centrioles } = enterMetaphase(cell)

        centrioles.forEach(centriole => {
          expect(centriole.astersHaveSpreadAcrossCell).toEqual(true)
        })
      })

      it('C. should attach chromatids to spindle fibers at centromere', () => {
        const { chromosomes, cellAfterMetaphase } = enterMetaphase(cell)

        // console.log(JSON.stringify(cellAfterMetaphase, '', ' '))

        chromosomes.forEach(chromosome => {
          const isChromatidAttachedToSpindleFiber =
            chromosome.centromeres.attachedToSpindleFiber

          expect(isChromatidAttachedToSpindleFiber).toBe(true)
        })
      })

      it('D. should align chromatids in the center of the cell with half (46 chromatids) on one side and half on the other', () => {
        let cell = getCellAfterProphase(newCell)

        const initialChromosomes = cell.organelles.chromosomes

        const totalChromatids = initialChromosomes.reduce(
          (prevValue, currValue) => prevValue + currValue.chromatids.count,
          0
        )

        expect(totalChromatids).toEqual(92)

        const {
          cellAfterMetaphase,
          chromatidsOnLeftside,
          chromatidsOnRightside,
          chromosomes
        } = enterMetaphase(cell)

        // console.log(JSON.stringify(cellAfterMetaphase, '', ' '))

        chromosomes.forEach(chromosome => {
          expect(chromosome.chromatids.cellAlignment).toBe('center')
        })

        expect(chromatidsOnLeftside).toEqual(totalChromatids / 2)
        expect(chromatidsOnRightside).toEqual(totalChromatids / 2)

        expect(chromatidsOnLeftside).toEqual(46)
        expect(chromatidsOnRightside).toEqual(46)
      })

      return
    })

    describe(' vi. enterAnaphase()...', () => {
      it('A. should be defined', () => {
        expect(enterAnaphase).toBeDefined()
      })

      it('B. chromatids should separate to become chromosomes and move to the ipsilateral pole of the cell along the spindle fiber.', () => {
        const cellAfterMetaphase = getCellAfterMetaphase(cell)

        const cellKeys = Object.keys(cellAfterMetaphase)

        const { cellAfterAnaphase } = enterAnaphase(cellAfterMetaphase)

        const chromosomeCount = cellAfterAnaphase.organelles.chromosomes.length

        expect(chromosomeCount).toEqual(92)
      })

      it('C. daughter chromosomes should arrive at their respective poles (46 on each side)', () => {
        const cellAfterMetaphase = getCellAfterMetaphase(cell)

        const { cellAfterAnaphase } = enterAnaphase(cellAfterMetaphase)

        // console.log({ centrioles: cellAfterAnaphase.organelles.centrioles })

        const centrioles = cellAfterAnaphase.organelles.centrioles

        centrioles.forEach(centriole => {
          const chromosomeCount = centriole.chromosomeCount

          expect(chromosomeCount).toEqual(46)
        })
      })
    })

    describe('vii. enterTolophase(),..', () => {
      it('A. should be defined', () => {
        expect(enterTelophase).toBeDefined()
      })

      describe('B. should pinch the cell off in the center, forming two daughter cells, each identical to the mother cell (assuming no mutations)', () => {
        debugger
        describe(' i. the cytoplasm and organelles, having duplicated earlier, should segregate into their respective newly forming cells', () => {
          let cell = getCellAfterAnaphase(newCell)
          const { cells, testObj } = enterTelophase(cell)

          expect(cells.length).toEqual = 2

          // console.log(JSON.stringify(cells));
          // console.log(JSON.stringify(cells, '', ' '))

          // divide the contents from the cell afterAnaphase into the two new cells
          // should split the centrioles and chromosomes from mother cell and bsse the rest of the organelles from a new cell template (since it was essentially not modeled from)

          const leftCell = cells[0]
          const rightCell = cells[1]

          const organelles = cell.organelles
          const organelleKeys = Object.keys(organelles)

          // console.log({ organelleKeys })
          // console.log({ centriole: cell.organelles.centrioles })

          organelleKeys.forEach((organelle, idx) => {
            it(`${idx + 1}: ${organelle}`, () => {
              let cellOrganelle

              const leftCellOrganelle = leftCell.organelles[organelle]
              const rightCellOrganelle = rightCell.organelles[organelle]

              if (organelle === 'centrioles') {
                // based on original cell
                cellOrganelle = cell.organelles[organelle]
                const { lftCentrioles, rghtCentrioles } = getCentrioles(
                  cellOrganelle
                )

                expect(leftCellOrganelle).toEqual(lftCentrioles)
                expect(rightCellOrganelle).toEqual(rghtCentrioles)
              } else if (organelle === 'chromatin') {
                // based on original cell
                cellOrganelle = cell.organelles[organelle]

                expect(typeof leftCellOrganelle).toEqual('string')
                expect(typeof rightCellOrganelle).toEqual('string')
              } else if (organelle === 'chromosomes') {
                // based on original cell
                cellOrganelle = cell.organelles[organelle]
                const { lftChromsCt, rghtChromsCt } = getChromsCts(
                  cellOrganelle
                )

                expect(testObj.leftCell.chromesBeforeDisolution.length).toEqual(
                  lftChromsCt
                )
                expect(
                  testObj.rightCell.chromesBeforeDisolution.length
                ).toEqual(rghtChromsCt)
              } else {
                // based of of new cell template
                cellOrganelle = newCell.organelles[organelle]

                expect(leftCellOrganelle.count).toEqual(cellOrganelle.count)
                expect(rightCellOrganelle.count).toEqual(cellOrganelle.count)
              }
            })
          })
        })

        describe(' ii. should reconstitute the nucleus (the nuclear membrane and nucleolus) in each new cell', () => {
          let cell = getCellAfterAnaphase(newCell)
          const { cells } = enterTelophase(cell)

          expect(cells.length).toEqual = 2

          const leftCell = cells[0]
          const rightCell = cells[1]

          it('a. nuclearMembrane', () => {
            expect(leftCell.organelles.nuclearMembrane.count).toEqual(1)
            expect(rightCell.organelles.nuclearMembrane.count).toEqual(1)
          })

          it('b. nucleolus', () => {
            expect(leftCell.organelles.nucleolus.count).toEqual(1)
            expect(rightCell.organelles.nucleolus.count).toEqual(1)
          })
        })

        describe('iii. the chromosomes fade into dispersed chromatin, and the centromere disappears', () => {
          let cell = getCellAfterAnaphase(newCell)
          const { cells, testObj } = enterTelophase(cell)

          expect(cells.length).toEqual = 2

          const leftCell = cells[0]
          const rightCell = cells[1]

          // remove the centromeres (but do they really disappear? ie should i delete them or is 'dispersing' them enough)
          it('a. remove centromeres', () => {
            const leftChromes = testObj.leftCell.chromesBeforeDisolution //.chromosomes
            const rightChromes = testObj.rightCell.chromesBeforeDisolution

            const leftChromesHaveCentromeres = doChromesHaveMeres(leftChromes)
            const rightChromesHaveCentromeres = doChromesHaveMeres(rightChromes)

            expect(leftChromesHaveCentromeres).toEqual(false)
            expect(rightChromesHaveCentromeres).toEqual(false)
          })

          // convert chromosome object into a string on the chromitid organelle
          it('b. fade chromosomes into dispersed chromatin', () => {
            // expect(leftCell.organelles.chromosomes).toEqual([])
            // expect(rightCell.organelles.chromosomes).toEqual([])
            // console.log(
            //   JSON.stringify(testObj.leftCell.chromesBeforeDisolution)
            // )

            expect(leftCell.organelles.chromatin).toBe(
              JSON.stringify(testObj.leftCell.chromesBeforeDisolution)
            )
            expect(rightCell.organelles.chromatin).toBe(
              JSON.stringify(testObj.rightCell.chromesBeforeDisolution)
            )

            expect(leftCell.organelles.chromosomes).toEqual([])
            expect(rightCell.organelles.chromosomes).toEqual([])
          })
        })
      })
    })

    function doChromesHaveMeres (chromosomes) {
      let chromesHaveMeres = false

      for (let i = 0; i < chromosomes.length; i++) {
        if (chromosomes[i].centromeres.count) {
          chromesHaveMeres = true
          break
        }
      }

      return chromesHaveMeres
    }

    function getCentrioles (centrioles = []) {
      let leftCentrioles = [],
        rightCentrioles = []

      // centriole: [
      //   {
      //     id: 1,
      //     isMother: true,
      //     isDaughter: false,
      //     cellAlignment: 'left',
      //     chromosomeCount: 46,
      //     daughterId: 2,
      //     motherId: null,
      //     hasAsters: true,
      //     astersHaveSpreadAcrossCell: true
      //   }
      // ]

      centrioles.map(centriole => {
        // const cellAlignment = chromosome.chromatids.cellAlignment
        if (centriole.id < 3) leftCentrioles.push({ ...centriole })
        if (centriole.id > 2) rightCentrioles.push({ ...centriole })
      })

      return {
        lftCentrioles: leftCentrioles,
        rghtCentrioles: rightCentrioles
      }
    }

    function getChromsCts (chromosomes = []) {
      let leftChromosomesCt = 0,
        rightChromosomesCt = 0

      // const chromosomeObj = {
      //   centromeres: {
      //     count: 1,
      //     attachedToSpindleFiber: false,
      //     kinetochores: 0
      //   },
      //   chromatids: {
      //     cellAlignment: null,
      //     count: 2,
      //     leftSideCount: 0,
      //     rightSideCount: 0
      //   }
      // }

      chromosomes.map(chromosome => {
        const cellAlignment = chromosome.chromatids.cellAlignment
        if (cellAlignment == 'leftSide') leftChromosomesCt++
        if (cellAlignment == 'rightSide') rightChromosomesCt++
      })

      return {
        lftChromsCt: leftChromosomesCt,
        rghtChromsCt: rightChromosomesCt
      }
    }

    function getCellAfterProphase (newCell) {
      const initialCell = JSON.parse(JSON.stringify(newCell))

      const { cellAfterInterphase } = enterInterphase(initialCell)

      const { cellAfterProphase } = enterProphase(cellAfterInterphase)

      return cellAfterProphase
    }

    function getCellAfterMetaphase (newCell) {
      const cellAfterProphase = getCellAfterProphase(newCell)
      const { cellAfterMetaphase } = enterMetaphase(cellAfterProphase)

      return cellAfterMetaphase
    }

    function getCellAfterAnaphase (newCell) {
      const cellAfterMetaphase = getCellAfterMetaphase(newCell)
      const { cellAfterAnaphase } = enterAnaphase(cellAfterMetaphase)

      return cellAfterAnaphase
    }

    function getMockChromosomesWoMeres () {
      const chromosomesWoMeres = [
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        },
        {
          centromeres: {
            count: 0,
            attachedToSpindleFiber: true,
            kinetochores: 1
          },
          chromatids: {
            cellAlignment: 'leftSide',
            count: 1,
            leftSideCount: 0,
            rightSideCount: 0
          }
        }
      ]

      return chromosomesWoMeres
    }

    function getDaughterCells () {
      const daughterCells = [
        {
          organelles: {
            cellMembrane: {
              count: 1
            },
            chromatin:
              '[{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"leftSide","count":1,"leftSideCount":0,"rightSideCount":0}}]',
            nuclearMembrane: {
              count: 1
            },
            nucleoplasm: {
              count: 1
            },
            nucleolus: {
              count: 1
            },
            cytoplasm: {
              count: 1
            },
            endoplasmicReticulum: {
              rough: {
                count: 1
              },
              smooth: {
                count: 1
              }
            },
            ribosome: {
              count: 1
            },
            golgiComplex: {
              count: 1
            },
            mitochrondrion: {
              count: 1
            },
            vacuole: {
              count: 1
            },
            lysosome: {
              count: 1
            },
            centrioles: [
              {
                id: 1,
                isMother: true,
                isDaughter: false,
                cellAlignment: 'left',
                chromosomeCount: 46,
                daughterId: 2,
                motherId: null,
                hasAsters: true,
                astersHaveSpreadAcrossCell: true
              },
              {
                id: 2,
                isMother: false,
                isDaughter: true,
                cellAlignment: 'left',
                chromosomeCount: 46,
                daughterId: null,
                motherId: 1,
                hasAsters: true,
                astersHaveSpreadAcrossCell: true
              }
            ],
            microtubule: {
              count: 1
            },
            microfilament: {
              count: 1
            },
            chromosomes: []
          },
          shape: null
        },
        {
          organelles: {
            cellMembrane: {
              count: 1
            },
            chromatin:
              '[{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}},{"centromeres":{"count":0,"attachedToSpindleFiber":true,"kinetochores":1},"chromatids":{"cellAlignment":"rightSide","count":1,"leftSideCount":0,"rightSideCount":0}}]',
            nuclearMembrane: {
              count: 1
            },
            nucleoplasm: {
              count: 1
            },
            nucleolus: {
              count: 1
            },
            cytoplasm: {
              count: 1
            },
            endoplasmicReticulum: {
              rough: {
                count: 1
              },
              smooth: {
                count: 1
              }
            },
            ribosome: {
              count: 1
            },
            golgiComplex: {
              count: 1
            },
            mitochrondrion: {
              count: 1
            },
            vacuole: {
              count: 1
            },
            lysosome: {
              count: 1
            },
            centrioles: [
              {
                id: 3,
                isMother: true,
                isDaughter: false,
                cellAlignment: 'right',
                chromosomeCount: 46,
                daughterId: 4,
                motherId: null,
                hasAsters: true,
                astersHaveSpreadAcrossCell: true
              },
              {
                id: 4,
                isMother: false,
                isDaughter: true,
                cellAlignment: 'right',
                chromosomeCount: 46,
                daughterId: null,
                motherId: 3,
                hasAsters: true,
                astersHaveSpreadAcrossCell: true
              }
            ],
            microtubule: {
              count: 1
            },
            microfilament: {
              count: 1
            },
            chromosomes: []
          },
          shape: null
        }
      ]

      return daughterCells
    }
  })
})
