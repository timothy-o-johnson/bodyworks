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

    const muscularSystemMuscles = ['skeletal muscles', 'cardiac muscle', 'smooth muscle']

    muscularSystemMuscles.forEach(muscle => {

      expect(theBody.muscularSystem).toContain(muscle)
    })
  })

  it('d. the cardiovascular system includes: four-chambered heart, arteries, capillaries, veins', ()=>{
    const cardiovascularSystem = ['four-chambered heart', 'arteries', 'capillaries', 'veins']

    cardiovascularSystem.forEach(part => {

      expect(theBody.cardiovascularSystem).toContain(part)
    })
  })
})

// testing
