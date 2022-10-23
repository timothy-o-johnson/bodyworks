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
      // let daughterCells = []

      // cell = interphase(cell)
      // cell = prophase(cell)
      // cell = metaphase(cell)
      // cell = anaphase(cell)
      // daughterCells = telophase(cell)

      // return daughterCells

      return { enterAnaphase, enterInterphase, enterMetaphase, enterProphase }

      function enterAnaphase (cell) {
        let cellAfterAnaphase = JSON.parse(JSON.stringify(cell))
        let originalChromosomes = cellAfterAnaphase.organelles.chromosomes
        const hasSpindleFibers = cellAfterAnaphase.organelles.centrioles[0].hasAsters

        if (hasSpindleFibers) {
          let newChromosomes = separateChromatidsToBecomeChromosomes(
            originalChromosomes
          )

          cellAfterAnaphase.organelles.chromosomes = newChromosomes
        }

        return { cellAfterAnaphase }

        function separateChromatidsToBecomeChromosomes (chromosomes = []) {
          let newChromosomes = []
          let tempChromosome = {}
          let cellAlignment = null

          chromosomes.forEach(chromosome => {
            //  let chromosomeEx = {
            //     "centromeres": {
            //      "count": 1,
            //      "attachedToSpindleFiber": true,
            //      "kinetochores": 2
            //     },
            //     "chromatids": {
            //      "cellAlignment": "center",
            //      "count": 2,
            //      "leftSideCount": 1,
            //      "rightSideCount": 1
            //     }
            //    }

            if (chromosome.chromatids.leftSideCount) {
              cellAlignment = 'leftSide'
              tempChromosome = getChromosome(cellAlignment)

              newChromosomes.push(tempChromosome)
            }

            if (chromosome.chromatids.rightSideCount) {
              cellAlignment = 'rightSide'
              tempChromosome = getChromosome(cellAlignment)

              newChromosomes.push(tempChromosome)
            }
          })

          return newChromosomes

          function getChromosome (cellAlignment) {
            let chromosome = {
              centromeres: {
                count: 1,
                attachedToSpindleFiber: true,
                kinetochores: 1
              },
              chromatids: {
                cellAlignment: cellAlignment,
                count: 1,
                leftSideCount: 0,
                rightSideCount: 0
              }
            }

            return chromosome
          }
        }
      }

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
        const chromosomeCount = 46

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
            chromatids: {
              cellAlignment: null,
              count: 2,
              leftSideCount: 0,
              rightSideCount: 0
            }
          }

          for (let i = 0; i < chromosomeCount; i++) {
            chromosomes.push({ ...chromosomeObj })
          }

          return cell
        }

        function addKinetochoresToCentromeres (cell) {
          const kinetochoreCount = 2
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
          let centrioles = cell.organelles.centrioles
          
          centrioles.forEach(centriole=>{
            centriole.hasAsters = true
            centriole.astersHaveSpreadAcrossCell = true
          })

          return cell
        }
      }

      function enterMetaphase (cell) {
        let cellAfterMetaphase = JSON.parse(JSON.stringify(cell))

        let centrioles = cellAfterMetaphase.organelles.centrioles
        let chromosomes = cellAfterMetaphase.organelles.chromosomes
        let chromatidsOnLeftside = 0,
          chromatidsOnRightside = 0

        centrioles.forEach(centriole => {
          if (centriole.hasAsters) {
            centriole.astersHaveSpreadAcrossCell = true
          }
        })

        if (chromosomes) {
          chromosomes.forEach(chromosome => {
            const chromatidCount = chromosome.chromatids.count
            let leftSideChromatidCount, rightSideChromatidCount

            chromosome.centromeres.attachedToSpindleFiber = true
            chromosome.chromatids.cellAlignment = 'center'

            chromosome.chromatids.leftSideCount = chromatidCount / 2
            chromosome.chromatids.rightSideCount = chromatidCount / 2

            leftSideChromatidCount = chromosome.chromatids.leftSideCount
            rightSideChromatidCount = chromosome.chromatids.rightSideCount

            chromatidsOnLeftside += leftSideChromatidCount
            chromatidsOnRightside += rightSideChromatidCount
          })
        }

        return {
          centrioles,
          cellAfterMetaphase,
          chromatidsOnLeftside,
          chromatidsOnRightside,
          chromosomes
        }
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
            } else if (organelle === 'chromatin') {
              cellWithOrganelles['organelles'][organelle] = {
                count: 1
              }
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
