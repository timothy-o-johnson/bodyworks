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
        'centriole',
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

    it(`ii. should create a cell object from the generalized cell's organelles`, () => {
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
            if (organelle === 'centriole') {
              expectedOrganelles[organelle] = {
                count: 2,
                hasAsters: false
              }
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

    it('i. should be defined', () => {
      expect(processes.cellDivisionMitosis).toBeDefined()
    })

    describe('  i. enterInterphase()...', () => {
      it('A. should be defined', () => {
        expect(processes.cellDivisionMitosis().enterInterphase).toBeDefined()
      })

      it('B. should duplicate DNA (in chromatin)', () => {
        const enterInterphase = processes.cellDivisionMitosis().enterInterphase

        const { cellAfterInterphase } = enterInterphase(cell)

        const chromatinCount = cellAfterInterphase.organelles.chromatin.count

        expect(chromatinCount).toEqual(2 * cell.organelles.chromatin.count)
      })

      it('C. should divide paired centrioles in centrosome', () => {
   
        const enterInterphase = processes.cellDivisionMitosis().enterInterphase
        const { cellAfterInterphase } = enterInterphase(cell)
        const centrioleCount = cellAfterInterphase.organelles.centriole.count

        expect(centrioleCount).toEqual(2 * cell.organelles.centriole.count)        
      })
    })

    describe(' ii. enterProphase()...', () => {
      const enterProphase = processes.cellDivisionMitosis().enterProphase

      it('A. should be defined', () => {
        expect(enterProphase).toBeDefined()
      })

      it('B. should thicken, shorten, and coil dispersed chromatin to form condensed chromatin chromosomes', () => {
        const expectedChromosomeCount = 2

        const cellAfterProphase = enterProphase(cell)

        expect(cellAfterProphase.organelles.chromosomes.length).toEqual(
          expectedChromosomeCount
        )
      })

      it('C. should ensure each chromosome is composed of two chromatids connected by a centromere', () => {
        const cellAfterProphase = enterProphase(cell)
        const chromosomes = cellAfterProphase.organelles.chromosomes
        const chromosomeObj = {
          centromeres: {count: 1, kinetochores: expect.anything()},
          chromatids: 2
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
        const { centriole } = cellAfterProphase.organelles

        expect(centriole.hasAsters).toBe(true)
      })

      it('G. should form kinetochores on the centromeres', ()=>{
        const cellAfterProphase = enterProphase(cell)
        const { chromosomes } = cellAfterProphase.organelles

        chromosomes.forEach(chromosome =>{
          expect(chromosome.centromeres.kinetochores).toBeGreaterThan(0)
        })
      })

      it.todo('add chromosomes to list of standard cell properties')
    })

    function doCellDivision (cell) {
      let daughterCells = []

      cell = interphase(cell)
      cell = prophase(cell)
      cell = metaphase(cell)
      cell = anaphase(cell)
      daughterCells = telophase(cell)

      return daughterCells
    }
  })
})
