const body = {
  systems: {
    articular: ['fixed joints', 'moveable joints'],
    cardiovascular: [
      'four-chambered heart',
      'arteries',
      'capillaries',
      'veins'
    ],
    digestive: [
      'alimentary canal',
      {
        glands: [
          'liver',
          'pancreas',
          { biliarySystem: ['gallbladder', 'ducts related to gallbladder'] }
        ]
      }
    ],
    endocrine: ['glands'],
    integumentary: [
      {
        skin: [
          'glands',
          'sensory receptors',
          'vessels',
          'immune cells',
          'antibodies',
          'layers of cells and keratin'
        ]
      }
    ],
    lymphatic: ['vessels', 'nodes'],
    muscular: ['skeletal muscles', 'cardiac muscle', 'smooth muscle'],
    nervous: [
      { central: ['brain', 'spinal cord'] },
      {
        peripheral: [
          'nerves',
          {
            visceral: 'involuntary flight-or-fight and vegetative functions'
          }
        ]
      }
    ],
    respiratory: ['upper respiratory tract, lower respiratory tract'],
    skeletal: ['bones', 'ligaments'],
    urinary: ['kidneys', 'ureter', 'urinary bladder', 'urethra']
  }
}

module.exports = {
  body
}
