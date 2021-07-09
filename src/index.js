const DIRECTIONS = {
  N: 'N',
  S: 'S',
  E: 'E',
  W: 'W'
}

const COMMANDS = {
  r: 'r',
  l: 'l',
  f: 'f',
  b: 'b'
}

const turnRight = direction => {
  const nextDirection = {
    [DIRECTIONS.N]: DIRECTIONS.E,
    [DIRECTIONS.E]: DIRECTIONS.S,
    [DIRECTIONS.S]: DIRECTIONS.W,
    [DIRECTIONS.W]: DIRECTIONS.N
  }

  return nextDirection[direction]
}

const turnLeft = direction => {
  const nextDirection = {
    [DIRECTIONS.N]: DIRECTIONS.W,
    [DIRECTIONS.W]: DIRECTIONS.S,
    [DIRECTIONS.S]: DIRECTIONS.E,
    [DIRECTIONS.E]: DIRECTIONS.N
  }

  return nextDirection[direction]
}

const turn = (direction, command) => command === COMMANDS.l
  ? turnLeft(direction)
  : turnRight(direction)

const moveForwardsOrBackwards = (position, direction, command) => {
  const _direction = command === COMMANDS.f ? 1 : -1
  const nextCell = {
    [DIRECTIONS.N]: ([row, col]) => [row - _direction, col],
    [DIRECTIONS.E]: ([row, col]) => [row, col + _direction],
    [DIRECTIONS.S]: ([row, col]) => [row + _direction, col],
    [DIRECTIONS.W]: ([row, col]) => [row, col - _direction]
  }

  return nextCell[direction](position)
}

const lastElement = arr => arr[arr.length - 1]

const isValidCommand = command => COMMANDS.hasOwnProperty(command)

const isArray = arr => Array.isArray(arr)

const isChar = str => typeof str === 'string' && str.length === 1

const isPositiveCoord = coord => coord >= 0

const isContainedInGrid = (coord, gridSize) => {
  const [rows, cols] = gridSize
  const [row, col] = coord

  return (row < rows && col < cols) && (row >= 0 && col >= 0)
}

const validateStartingPoint = (start, gridSize) => {
  if(!isArray(start)) return false
  if(!start.every(isPositiveCoord)) return false
  if(!isContainedInGrid(start, gridSize)) return false

  return true
}

const validateDirection = direction => DIRECTIONS.hasOwnProperty(direction)

const validateGridSize = gridSize => {
  if(!isArray(gridSize)) return false
  if(!gridSize.every(isPositiveCoord)) return false

  return true
}

const validateCommands = commands => {
  if(!isArray(commands)) return false
  if(!commands.every(isChar)) return false
  if(!commands.every(isValidCommand)) return false

  return true
}

const validateParams = (start, direction, gridSize, commands) => {
  const isValidStart = validateStartingPoint(start, gridSize)
  const isValidDirection = validateDirection(direction)
  const isValidGridSize = validateGridSize(gridSize)
  const isValidCommandSequence = validateCommands(commands)

  return [
    isValidStart,
    isValidDirection,
    isValidGridSize,
    isValidCommandSequence
  ].every(validated => validated)
}

const getNextPosition = (position, direction, command) => {
  let nextPosition = [...position]
  switch(command) {
    case COMMANDS.f:
    case COMMANDS.b:
      nextPosition = moveForwardsOrBackwards(position, direction, command); break
  }

  return nextPosition
}

const getLastMovement = (initialMovement, commands) =>
  commands.reduce((prevMovement, command) => {
    let { position, direction, gridSize } = prevMovement
    direction = [COMMANDS.r, COMMANDS.l].includes(command)
      ? turn(direction, command)
      : direction

    const nextPosition = getNextPosition(position, direction, command)

    if(isContainedInGrid(nextPosition, gridSize)) {
      position = nextPosition
    }

    return { position, direction, gridSize }
  }, initialMovement)

const executeCommands = (start, startDirection, gridSize, commands) => {
  if(!validateParams(start, startDirection, gridSize, commands)) {
    return []
  }

  const initialMovement = {
    position: start,
    direction: startDirection,
    gridSize: gridSize
  }

  const { position: lastCoord } = getLastMovement(initialMovement, commands)

  return lastCoord
}

module.exports = {
  executeCommands,
  DIRECTIONS,
  COMMANDS
}
