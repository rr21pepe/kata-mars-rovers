const { executeCommands, DIRECTIONS } = require('./index')

const { E, N, S, W } = DIRECTIONS

describe('Mars Rovers', () => {
  describe('Validating starting point parameter', () => {
    it('Should return [] when starting point is not correct (1)', () => {
      expect(executeCommands([-1, 0], N, [3, 3], ['f', 'r'])).toEqual([])
    })
    it('Should return [] when starting point is not correct (2)', () => {
      expect(executeCommands([0, -1], N, [3, 3], ['f', 'r'])).toEqual([])
    })
    it('Should return [] when starting point is not correct (3)', () => {
      expect(executeCommands('[0, -1]', N, [3, 3], ['f', 'r'])).toEqual([])
    })
    it('Should return [] when starting point is not correct (4)', () => {
      expect(executeCommands(8, N, [3, 3], ['f', 'r'])).toEqual([])
    })
    it('Should return [] when starting point is bigger than grid size (1)', () => {
      expect(executeCommands([5, 2], E, [3, 3], ['f', 'r'])).toEqual([])
    })
    it('Should return [] when starting point is bigger than grid size (2)', () => {
      expect(executeCommands([2, 5], E, [3, 3], ['f', 'r'])).toEqual([])
    })
  })

  describe('Validating direction parameter', () => {
    it('Should return [] when direction is not correct (1)', () => {
      expect(executeCommands([1, 0], 'T', [3, 3], ['f', 'r'])).toEqual([])
    });
    it('Should return [] when direction is not correct (2)', () => {
      expect(executeCommands([1, 0], 3, [3, 3], ['f', 'r'])).toEqual([])
    });
  })

  describe('Validating grid size parameter', () => {
    it('Should return [] when grid size is not correct (1)', () => {
      expect(executeCommands([1, 5], W, [-1, 0], ['f', 'r'])).toEqual([])
    });
    it('Should return [] when grid size is not correct (2)', () => {
      expect(executeCommands([1, 5], E, [0, -1], ['f', 'r'])).toEqual([])
    });
    it('Should return [] when grid size is not correct (3)', () => {
      expect(executeCommands([1, 5], E, '[0, -1]', ['f', 'r'])).toEqual([])
    });
  })

  describe('Validating commands parameter', () => {
    it('Should return [] when commands sequence is not correct (1)', () => {
      expect(executeCommands([0, 3], N, [4, 4], ['ff', 'r', 'l'])).toEqual([])
    })
    it('Should return [] when commands sequence is not correct (2)', () => {
      expect(executeCommands([0, 3], N, [4, 4], ['ffrflbrf'])).toEqual([])
    })
    it('Should return [] when commands sequence is not correct (3)', () => {
      expect(executeCommands([0, 3], N, [4, 4], ['f', 'f', 'd', 'r'])).toEqual([])
    })
  })

  it('Should return [0, 4] when: starting: [2, 4]; direction: N; commands: flflfrfrffrff; grid size: [5, 6]', () => {
    const commands = ["f", "l", "f", "l", "f", "r", "f", "r", "f", "f", "r", "f", "f"]
    expect(executeCommands([2, 4], N, [5, 6], commands)).toEqual([0, 4])
  })
  it('Should return [1, 1] when: starting: [4, 0]; direction: E; commands: lfflfrrflflfb; grid size: [5, 6]', () => {
    const commands = ["l", "f", "f", "l", "f", "r", "r", "f", "l", "f", "l", "f", "b"]
    expect(executeCommands([4, 0], E, [5, 6], commands)).toEqual([1, 1])
  })
  it('Should return [4, 4] when: starting: [5, 6]; direction: N; commands: bfrbbblblbb; grid size: [5, 6]', () => {
    const commands = ["b", "f", "r", "b", "b", "b", "l", "b", "l", "b", "b"]
    expect(executeCommands([4, 5], N, [5, 6], commands)).toEqual([4, 4])
  })
})
