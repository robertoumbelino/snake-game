const canv = document.getElementById('gc')
const ctx = canv.getContext('2d')

/**
 * Snake velocity
 */
const snakeVelocity = 66

setInterval(game, snakeVelocity)

/**
 * Events.
 */
document.addEventListener('keydown', move)

let px = (py = 10)
let gs = (tc = 20)
let ax = (ay = 15)
let xv = (yv = 0)
const trail = []
let tail = 5

function game() {
  px += xv
  py += yv

  if (px < 0) {
    px = tc - 1
  }

  if (px > tc - 1) {
    px = 0
  }

  if (py < 0) {
    py = tc - 1
  }

  if (py > tc - 1) {
    py = 0
  }

  ctx.fillStyle = '#282a36'
  ctx.fillRect(0, 0, canv.width, canv.height)

  ctx.fillStyle = '#50fa7b'
  for (let i = 0; i < trail.length; i++) {
    ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2)

    if (trail[i].x === px && trail[i].y === py) {
      tail = 5
    }
  }

  trail.push({ x: px, y: py })

  while (trail.length > tail) {
    trail.shift()
  }

  if (ax === px && ay === py) {
    tail++
    ax = Math.floor(Math.random() * tc)
    ay = Math.floor(Math.random() * tc)
  }

  ctx.fillStyle = '#ff79c6'
  ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2)
}

const keyMap = {
  37: { x: -1, y: 0 },
  38: { x: 0, y: -1 },
  39: { x: 1, y: 0 },
  40: { x: 0, y: 1 }
}

/**
 * Move snake.
 */
function move({ keyCode }) {
  /**
   * Get direction.
   */
  const direction = keyMap[keyCode]

  /**
   * No mapped direction.
   */
  if (!direction) return

  /**
   * Wrong way. <- ->
   */
  const isWrongWay = (xv === direction.x || yv === direction.y) && xv !== yv

  /**
   * Don't move direction.
   */
  if (isWrongWay) return

  /**
   * Set new direction.
   */
  xv = direction.x
  yv = direction.y
}
