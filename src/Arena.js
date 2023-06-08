class Arena {
  constructor(hero, monsters, size = 10) {
    this.hero = hero
    this.monsters = monsters
    this.size = size
  }

  getDistance(fighter1, fighter2) {
    return Math.sqrt(Math.pow(fighter2.x - fighter1.x, 2) + Math.pow(fighter2.y - fighter1.y, 2)).toFixed(2)
  }

  isTouchable(attacker, defender) {
    return this.getDistance(attacker, defender) <= attacker.getRange()
  }

  // Hero movement managment
  // Gestion du déplacement du héros
  move(direction) {
    /* Your code goes here */ 
    const oldPosition = {x: this.hero.x, y: this.hero.y}
    if ( !this.canMove(oldPosition, direction)) return oldPosition;
    switch(direction) {
      case "N":
        this.hero.y -= 1;
        break;
      case "S":
        this.hero.y += 1;
        break;
      case "W":
        this.hero.x -= 1;
        break;
      case "E":
        this.hero.x += 1;
        break;
      default:
        break;
    }

    return oldPosition;
  }

  canMove(oldPosition, direction) {
    if (direction === "W" && oldPosition.x) return this.isPositionAvailable({
      ...oldPosition,
      x: oldPosition.x - 1
    })
    if (direction === "E" && oldPosition.x < this.size - 1) return this.isPositionAvailable({
      ...oldPosition,
      x: oldPosition.x + 1
    })
    if (direction === "N" && oldPosition.y) return this.isPositionAvailable({
      ...oldPosition,
      y: oldPosition.y - 1
    })
    if (direction === "S" && oldPosition.y < this.size - 1) return this.isPositionAvailable({
      ...oldPosition,
      y: oldPosition.y + 1
    })
    
    return false;
  }

  isPositionAvailable({x, y}) {// New position
    return !this.monsters.find((m) => (m.x === x && m.y === y))
  }
}
