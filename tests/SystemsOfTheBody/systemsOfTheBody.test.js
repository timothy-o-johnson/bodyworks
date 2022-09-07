const theBody = require('../../theBody').body

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

describe('2. Cells & Tissues', () => {
  describe('b. genernalized cell...', () => {
    it('i. should be defined', () => {
      expect(theBody.generalizedCell).toBeDefined()
    })

    it('ii. should contain organelles', () => {
      expect(theBody.generalizedCell.organelles).toBeDefined()
    })

    it('iii. cell organelles should consist of a cell membrane, nuclear membrane, nucleoplasm, nucleolus, cytoplasm, endoplasmic reticulum (rough and smooth), ribosom, golgi complex, mitochrondrion, vacuole, lysosome, centriole, microtubule, microfilament', () => {
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

      cellOrganelles.forEach((part, index) => {
        if (typeof part === 'string') {
          expect(theBody.generalizedCell.organelles).toContain(part)
        } else {
          expect(theBody.generalizedCell.organelles[index]).toEqual(
            expect.objectContaining(part)
          )
        }
      })
    })
  })
})

describe('3. Processes', () => {
  it('a. should be defined', ()=>{
    expect(theBody.processes).toBeDefined()
  })

  describe('b. cell division/mitosis', () => {
    cell = {}

    describe('i. interphase()...', ()=>{
      it.todo('A. should be defined')
      it.todo('A. should duplicate DNA (in chromatin)')
      it.todo('B. should divede paired centrioles in centrosome')
      it.todo('x. should return a cell')
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


// testing
