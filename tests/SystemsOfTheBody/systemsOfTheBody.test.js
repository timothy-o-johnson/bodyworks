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
})
