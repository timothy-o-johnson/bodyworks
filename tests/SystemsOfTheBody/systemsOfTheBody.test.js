const theBody = require('../../theBody').body

describe('0. The Body ', () => {
  it('should be defined', () => {
    expect(theBody).toBeDefined()
  })
})

describe('1. Systems of The Body', () => {
  it(`a. the skeletal system should consist of bones and and ligaments that secure the bones at joints`, () => {
    expect(theBody.skeletalSystem).toContain('bones')
    expect(theBody.skeletalSystem).toContain('ligaments')
  })

  it(`b. the articular system should consist of both fixed and moveable joints`, () => {
    expect(theBody.articularSystem).toContain('fixed joints')
    expect(theBody.articularSystem).toContain('moveable joints')
  })

  it('c. the muscular system includes: skeletal muscles, cardiac muscle, smooth muscle', () => {
    const muscularSystemMuscles = [
      'skeletal muscles',
      'cardiac muscle',
      'smooth muscle'
    ]

    muscularSystemMuscles.forEach(muscle => {
      expect(theBody.muscularSystem).toContain(muscle)
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
      expect(theBody.cardiovascularSystem).toContain(part)
    })
  })

  it('e. the lymphatic system includes vessels and nodes', () => {
    // recovers bodies tissue fluids and returns them to the heart
    const lymphaticSystem = ['vessels', 'nodes']

    lymphaticSystem.forEach(part => {
      expect(theBody.lymphaticSystem).toContain(part)
    })
  })

  it('f. the nervous system includes the central nervous system and the peripheral nervous system', () => {
    // recovers bodies tissue flueds and returns them to the heart
    const nervousSystem = [
      { centralNervousSystem: ['brain', 'spinal cord'] },
      {
        peripheralNervousSystem: [
          'nerves',
          {
            visceralNervousSystem:
              'involuntary flight-or-fight and vegetative functions'
          }
        ]
      }
    ]

    nervousSystem.forEach((part, index) => {
      expect(theBody.nervousSystem[index]).toEqual(expect.objectContaining(part))
    })
  })

  it('g. the endocrine system consists of glands that secrete hormones', ()=>{
     const endocrineSystem = ['glands']

    endocrineSystem.forEach(part => {
      expect(theBody.endocrineSystem).toContain(part)
    })
  })
})


describe('2. Processes', () =>{
  describe('a. cell division/mitosis', ()=>{

    cell = {}
    
    function doCellDivision(cell){
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
