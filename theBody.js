const body = {
  generalizedCell: {
    organelles: [
      'cellMembrane',
      'chromatin',
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
  },

  processes: {
    cellDivisionMitosis: () => {
      return { enterInterphase, enterMetaphase, enterProphase }

      function enterInterphase (cell) {
        let cellAfterInterphase = JSON.parse(JSON.stringify(cell))

        cellAfterInterphase.organelles.chromatin.count *= 2
        cellAfterInterphase = dividePairedCentrioles(cellAfterInterphase)

        return { cell, cellAfterInterphase }

        function dividePairedCentrioles (cellAfterInterphase) {
          let centrioles = cellAfterInterphase.organelles.centrioles
          let centriolesCopy = [...centrioles]

          // centriolExample =  {
          //   id: motherId,
          //   isMother: true,
          //   isDaughter: false,
          //   daughterId: daughterId,
          //   motherId: null,
          //   hasAsters: false,
          //   astersHaveSpreadAcrossCell: false
          // }

          centriolesCopy.forEach(centriole => {
            // create daughter centriole
            let daughterCentriole = { ...centriole }
            let motherId
            let daughterId

            if (centriole.isDaughter) {
              motherId = 3
              daughterId = 4

              // update id
              centriole.id = motherId

              // convert to mother
              centriole.isMother = true
              centriole.isDaughter = false
              centriole.motherId = null
              centriole.daughterId = daughterId

              daughterCentriole = updateDaughterCentriole(
                daughterCentriole,
                daughterId,
                motherId
              )
            } else if (centriole.isMother) {
              motherId = centriole.id
              daughterId = motherId + 1

              daughterCentriole = updateDaughterCentriole(
                daughterCentriole,
                daughterId,
                motherId
              )
            }

            centrioles.push(daughterCentriole)
          })

          return cellAfterInterphase
        }

        function updateDaughterCentriole (
          daughterCentriole,
          daughterId,
          motherId
        ) {
          daughterCentriole.id = daughterId
          daughterCentriole.isMother = false
          daughterCentriole.isDaughter = true
          daughterCentriole.motherId = motherId
          daughterCentriole.daughterId = null

          return daughterCentriole
        }
      }

      function enterProphase (cell) {
        let cellAfterProphase = JSON.parse(JSON.stringify(cell))

        const cellHasChromatin = cell.organelles.chromatin.count
        const chromosomeCount = 2

        if (cellHasChromatin) {
          cellAfterProphase = addChromosomes(cellAfterProphase, chromosomeCount)
        }

        cellAfterProphase = dissolveNucleolusAndNuclearMembrane(
          cellAfterProphase
        )

        cellAfterProphase = separateCentriolesAndProjectAsters(
          cellAfterProphase
        )

        cellAfterProphase = addKinetochoresToCentromeres(cellAfterProphase)

        return cellAfterProphase

        function addChromosomes (cell, chromosomeCount) {
          let chromosomes = (cellAfterProphase.organelles.chromosomes = [])
          const chromosomeObj = {
            centromeres: {
              count: 1,
              attachedToSpindleFiber: false,
              kinetochores: 0
            },
            chromatids: { count: 2 }
          }

          for (let i = 0; i < chromosomeCount; i++) {
            chromosomes.push({ ...chromosomeObj })
          }

          return cell
        }

        function addKinetochoresToCentromeres (cell) {
          const kinetochoreCount = 1
          let chromosomes = cell.organelles.chromosomes

          chromosomes.forEach(chromosome => {
            chromosome.centromeres.kinetochores = kinetochoreCount
          })

          return cell
        }

        function dissolveNucleolusAndNuclearMembrane (cell) {
          cell.organelles.nucleolus.count = 0
          cell.organelles.nuclearMembrane.count = 0

          return cell
        }

        function separateCentriolesAndProjectAsters (cell) {
          cell.organelles.centrioles.hasAsters = true

          return cell
        }
      }

      function enterMetaphase (cell) {
        let cellAfterMetaphase = JSON.parse(JSON.stringify(cell))

        let centrioles = cellAfterMetaphase.organelles.centrioles
        let chromosomes = cellAfterMetaphase.organelles.chromosomes

        centrioles.forEach(centriole => {
          if (centriole.hasAsters) {
            centriole.astersHaveSpreadAcrossCell = true
          }
        })

        if (chromosomes) {
          chromosomes.forEach(chromosome => {
            chromosome.centromeres.attachedToSpindleFiber = true
          })
        }

        return { centrioles, cellAfterMetaphase, chromosomes }
      }
    },
    createCell: organelles => {
      let cell = { organelles: {}, shape: null }

      cell = addOrganelles(cell, organelles)

      return cell

      function addOrganelles (cell, organelles) {
        let cellWithOrganelles = { ...cell }

        organelles.forEach(organelle => {
          // if organelle is a string,
          // make each organelle an object and add count property
          if (typeof organelle === 'string') {
            if (organelle === 'centrioles') {
              const motherId = 1
              const daughterId = motherId + 1

              cellWithOrganelles['organelles'][organelle] = [
                {
                  id: motherId,
                  isMother: true,
                  isDaughter: false,
                  daughterId: daughterId,
                  motherId: null,
                  hasAsters: false,
                  astersHaveSpreadAcrossCell: false
                },
                {
                  id: daughterId,
                  isMother: false,
                  isDaughter: true,
                  daughterId: null,
                  motherId: motherId,
                  hasAsters: false,
                  astersHaveSpreadAcrossCell: false
                }
              ]
            } else {
              cellWithOrganelles['organelles'][organelle] = {
                count: 1
              }
            }
          }

          // if organelle is an object
          if (typeof organelle === 'object') {
            const key = Object.keys(organelle)
            cellWithOrganelles['organelles'][key] = {}

            // and that object has an array,
            // convert the array elements into objects and add count property
            if (Array.isArray(organelle[key])) {
              const subOrganelleArray = organelle[key]

              subOrganelleArray.forEach(subOrganelle => {
                cellWithOrganelles['organelles'][key][subOrganelle] = {
                  count: 1
                }
              })
            }
          }
        })

        return cellWithOrganelles
      }
    }
  },

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
    femaleReproductive: ['ovaries', 'uterine tube', 'uterus', 'vagina'],
    immuneLymphoid: [
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
    ],
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
    maleReproductive: [
      'seminal vesicle',
      'ductus deferens',
      'prostate',
      'uretha/penis',
      'testis'
    ],
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
  },

  vocabulary: {
    // vocabulary mentioned but not explained
    'generalized cell': {
      cytoskeleton: '',
      pseudopods: ''
    }
  }
}

module.exports = {
  body
}
