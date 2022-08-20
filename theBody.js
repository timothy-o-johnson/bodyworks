const body = {
  articularSystem: ['fixed joints', 'moveable joints'],
  cardiovascularSystem: [
    'four-chambered heart',
    'arteries',
    'capillaries',
    'veins'
  ],
  endocrineSystem : ['glands'],
  lymphaticSystem: ['vessels', 'nodes'],
  muscularSystem: ['skeletal muscles', 'cardiac muscle', 'smooth muscle'],
  nervousSystem: [
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
  ],
  skeletalSystem: ['bones', 'ligaments']
}

module.exports = {
  body
}
