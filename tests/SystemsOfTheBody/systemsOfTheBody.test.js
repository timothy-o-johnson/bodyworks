const theBody = require('../../theBody').body

const organelles = theBody.generalizedCell.organelles
const newCell = theBody.processes.createCell(organelles)

describe('0. The Body ', () => {
  it('should be defined', () => {
    expect(theBody).toBeDefined()
  })
})

describe('1. Systems of The Body', () => {
  it(`a. the skeletal system should consist of bones and and ligaments that secure the bones at joints`, () => {
    expect(theBody.systems.skeletal).toContain('bones')
    expect(theBody.systems.skeletal).toContain('ligaments')
  })

  it(`b. the articular system should consist of both fixed and moveable joints`, () => {
    expect(theBody.systems.articular).toContain('fixed joints')
    expect(theBody.systems.articular).toContain('moveable joints')
  })

  it('c. the muscular system includes: skeletal muscles, cardiac muscle, smooth muscle', () => {
    const muscularSystemMuscles = [
      'skeletal muscles',
      'cardiac muscle',
      'smooth muscle'
    ]

    muscularSystemMuscles.forEach(muscle => {
      expect(theBody.systems.muscular).toContain(muscle)
    })
  })

  it('d. the cardiovascular system includes: four-chambered heart, arteries, capillaries, veins', () => {
    const cardiovascularSystem = [
      'four-chambered heart',
      'arteries',
      'capillaries',
      'veins'
    ]

    cardiovascularSystem.forEach(part => {
      expect(theBody.systems.cardiovascular).toContain(part)
    })
  })

  it('e. the lymphatic system includes vessels and nodes', () => {
    // recovers bodies tissue fluids and returns them to the heart
    const lymphaticSystem = ['vessels', 'nodes']

    lymphaticSystem.forEach(part => {
      expect(theBody.systems.lymphatic).toContain(part)
    })
  })

  it('f. the nervous system includes the central nervous system and the peripheral nervous system', () => {
    // recovers bodies tissue flueds and returns them to the heart
    const nervousSystem = [
      { central: ['brain', 'spinal cord'] },
      {
        peripheral: [
          'nerves',
          {
            visceral: 'involuntary flight-or-fight and vegetative functions'
          }
        ]
      }
    ]

    nervousSystem.forEach((part, index) => {
      expect(theBody.systems.nervous[index]).toEqual(
        expect.objectContaining(part)
      )
    })
  })

  it('g. the endocrine system consists of glands that secrete hormones', () => {
    const endocrineSystem = ['glands']

    endocrineSystem.forEach(part => {
      expect(theBody.systems.endocrine).toContain(part)
    })
  })

  it('h. the integumentary system consists of skin which contains glands, sensory receptors, vessesls, immune cells, antibodies, and layers of cells and keratin', () => {
    const skin = [
      'glands',
      'sensory receptors',
      'vessels',
      'immune cells',
      'antibodies',
      'layers of cells and keratin'
    ]

    const integumentarySystem = [{ skin }]

    integumentarySystem.forEach((part, index) => {
      expect(theBody.systems.integumentary[index]).toEqual(
        expect.objectContaining(part)
      )
    })
  })

  it('i. the respitory system consists of the upper and lower respiratory tracts', () => {
    const respiratorySystem = [
      'upper respiratory tract, lower respiratory tract'
    ]

    respiratorySystem.forEach(part => {
      expect(theBody.systems.respiratory).toContain(part)
    })
  })

  it('j. the digestive system consists of an alimentary canal and glands. Glands include the liver, the pancreas, and the biliary system', () => {
    const digestiveSystem = [
      'alimentary canal',
      {
        glands: [
          'liver',
          'pancreas',
          { biliarySystem: ['gallbladder', 'ducts related to gallbladder'] }
        ]
      }
    ]

    digestiveSystem.forEach((part, index) => {
      if (typeof part === 'string') {
        expect(theBody.systems.digestive[index]).toEqual(part)
      } else {
        expect(theBody.systems.digestive[index]).toEqual(
          expect.objectContaining(part)
        )
      }
    })
  })

  it('k. the urinary system consists of the kidneys, the ureter, the urinary bladder, and urethra', () => {
    const urinarySystem = ['kidneys', 'ureter', 'urinary bladder', 'urethra']

    urinarySystem.forEach(part => {
      expect(theBody.systems.urinary).toContain(part)
    })
  })

  it('l. the immune/lymphoid system consists of the microglia, the tonsils, the thymus, the lungs, lymph nodes, the spleen, the kidneys, blood vessels, intestines, and bone marrow', () => {
    // organs involved in the body's defense; uses immune-related cells

    const immuneLymphoidSystem = [
      'blood vessels',
      'bone marrow',
      'intestines',
      'kidneys',
      'lungs',
      'lymph nodes',
      'microglia',
      'spleen',
      'thymus',
      'tonsils'
    ]

    immuneLymphoidSystem.forEach(part => {
      expect(theBody.systems.immuneLymphoid).toContain(part)
    })
  })

  it('m. the female reproductive system consists of uterine tube, uterus, ovaries, vagina', () => {
    const femaleReproductiveSystem = [
      'uterine tube',
      'uterus',
      'ovaries',
      'vagina'
    ]

    femaleReproductiveSystem.forEach(part => {
      expect(theBody.systems.femaleReproductive).toContain(part)
    })
  })

  it('n. the male reproductive system consists of seminal vesicle, ductus deferens, prostate, uretha/penis, testis', () => {
    const maleReproductiveSystem = [
      'seminal vesicle',
      'ductus deferens',
      'prostate',
      'uretha/penis',
      'testis'
    ]

    maleReproductiveSystem.forEach(part => {
      expect(theBody.systems.maleReproductive).toContain(part)
    })
  })
})

describe('2. Cells & Tissues (p. 6)', () => {
  describe('b. genernalized cell...', () => {
    it('  i. should be defined', () => {
      expect(theBody.generalizedCell).toBeDefined()
    })

    it(' ii. should contain organelles', () => {
      expect(theBody.generalizedCell.organelles).toBeDefined()
    })

    it(`iii. cell organelles should consist of a cell membrane, 
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
        const theBodyCellOrganelles = theBody.generalizedCell.organelles

        if (typeof cellOrganellePart === 'string') {
          expect(theBodyCellOrganelles).toContain(cellOrganellePart)
        } else {
          // organelle is an object

          const organelleName = Object.keys(cellOrganellePart)[0]
          let hasPartBeenFoundInBody = false

          for (let i = 0; i < theBodyCellOrganelles.length; i++) {
            const bodyOrganelle = theBodyCellOrganelles[i]
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

    it(' vi. cell organelles should contain chromatin (a diffuse network of DNA and related protein)', () => {
      expect(theBody.generalizedCell.organelles).toContain('chromatin')
    })
  })
})

describe('3. Processes', () => {
  const processes = theBody.processes

  it('a. should be defined', () => {
    expect(processes).toBeDefined()
  })

  describe('b. createCell()... (p.6)', () => {
    it(' i. should be defined', () => {
      expect(processes.createCell).toBeDefined()
    })

    it(' ii. should contain the following properties: shape, organelles', () => {
      const cellProperties = ['organelles', 'shape']
      const cell = processes.createCell(organelles)

      cellProperties.forEach(property => {
        expect(cell).toHaveProperty(property)
      })
    })

    it(`iii. should create a cell object from the generalized cell's organelles`, () => {
      const cell = processes.createCell(organelles)

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

        console.log(JSON.stringify(expectedCell, '', ' '))

        return expectedOrganelles
      }
    })

    it.todo(' add proper counts')
  })

  describe('c. cellDivisionMitosis()... (p. 7)', () => {
    const cell = JSON.parse(JSON.stringify(newCell))

    const enterInterphase = processes.cellDivisionMitosis().enterInterphase
    const enterProphase = processes.cellDivisionMitosis().enterProphase
    const enterMetaphase = processes.cellDivisionMitosis().enterMetaphase
    const enterAnaphase = processes.cellDivisionMitosis().enterAnaphase

    it('i. should be defined', () => {
      expect(processes.cellDivisionMitosis).toBeDefined()
    })

    describe(' ii. enterInterphase()...', () => {
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

    describe('iii. enterProphase()...', () => {
      it('A. should be defined', () => {
        expect(enterProphase).toBeDefined()
      })

      it('B. should thicken, shorten, and coil dispersed chromatin to form condensed chromatin chromosomes', () => {
        const expectedChromosomeCount = 46

        const cellAfterProphase = enterProphase(cell)

        expect(cellAfterProphase.organelles.chromosomes.length).toEqual(
          expectedChromosomeCount
        )
      })

      it('C. should ensure each chromosome is composed of two chromatids connected by a centromere', () => {
        const cellAfterProphase = enterProphase(cell)

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
        const cellAfterProphase = enterProphase(cell)
        const { nucleolus, nuclearMembrane } = cellAfterProphase.organelles

        expect(nucleolus.count).toEqual(0)
        expect(nuclearMembrane.count).toEqual(0)
      })

      it('F. should separate centrioles and move them to the opposite poles of the cell where they project microtubules (spindle fibers) called asters', () => {
        const cellAfterProphase = enterProphase(cell)
        const { centrioles } = cellAfterProphase.organelles

        centrioles.forEach(centriole => {
          expect(centriole.hasAsters).toBe(true)
          expect(centriole.astersHaveSpreadAcrossCell).toBe(true)
        })
      })

      it('G. should form kinetochores on the centromeres', () => {
        const cellAfterProphase = enterProphase(cell)
        const { chromosomes } = cellAfterProphase.organelles
        const kinetochoreCount = 2

        chromosomes.forEach(chromosome => {
          expect(chromosome.centromeres.kinetochores).toEqual(kinetochoreCount)
        })
      })

      it.todo('add chromosomes to list of standard cell properties')
    })

    describe(' iv. enterMetaphase()...', () => {
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

    describe('  v. enterAnaphase()...', () => {
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

      it('daughter chromosomes should arrive at their respective poles (46 on each side)', () => {
        const cellAfterMetaphase = getCellAfterMetaphase(cell)

        const { cellAfterAnaphase } = enterAnaphase(cellAfterMetaphase)

        console.log({ cellAfterMetaphase })

        console.log({ centrioles: cellAfterAnaphase.organelles.centrioles })

        const centrioles = cellAfterAnaphase.organelles.centrioles

        centrioles.forEach(centriole => {
          const chromosomeCount = centriole.chromosomeCount

          expect(chromosomeCount).toEqual(46)
        })
      })
    })

    function getCellAfterProphase (newCell) {
      const initialCell = JSON.parse(JSON.stringify(newCell))

      const cellAfterInterphase = enterInterphase(initialCell)
        .cellAfterInterphase

      const cellAfterProphase = enterProphase(cellAfterInterphase)

      return cellAfterProphase
    }

    function getCellAfterMetaphase (newCell) {
      const cellAfterProphase = getCellAfterProphase(newCell)
      const cellAfterMetaphase = enterMetaphase(cellAfterProphase)
        .cellAfterMetaphase

      return cellAfterMetaphase
    }
  })
})
