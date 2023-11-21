//minesweeper

let TILE_SIZE = 50;
let FIELD_SIZE = 10;
let NUMBER_OF_MINES = 3;
let game_over = false;

let field = [];
let FiedState = {
  COVERED_EMPTY: 1,
  UNCOVERED_EMPTY: 2,
  COVERED_MINE: 3,
  BUSTED_MINE: 4,
  COVERED_EMPTY_FLAGGED: 5,
  COVERED_MINE_FLAGGED: 6,
};

function setup() {
  if (FIELD_SIZE * FIELD_SIZE > NUMBER_OF_MINES) {
    createCanvas(
      TILE_SIZE * FIELD_SIZE + 1,
      TILE_SIZE * FIELD_SIZE + 1 + TILE_SIZE * 2
    );
    background("lightgray");
    strokeWeight(2.0);
    strokeCap(ROUND);
    initField();
    hideMines();
    countMines();
    drawField();
    displayInfo();
  } else {
    print("Too many mines !");
  }
}

function mouseClicked(event) {
  if (!game_over) {
    let x = int(mouseX / TILE_SIZE);
    let y = int(mouseY / TILE_SIZE);

    if (event.ctrlKey == false) {
      uncover(x, y);
    } else {
      flag(x, y);
    }

    drawField();
    displayInfo();
    
  }
}

function displayInfo() {
  let PosX = TILE_SIZE / 2;
  let PosY = FIELD_SIZE * TILE_SIZE + TILE_SIZE / 2;
  fill("lightgrey");
  strokeWeight(4.0);
  stroke("grey");
  rect(0, FIELD_SIZE * TILE_SIZE, FIELD_SIZE * TILE_SIZE, TILE_SIZE * 2);

  if (hasBusted()) {
    fill("red");
    textSize(TILE_SIZE * 0.8);
    text(
      "K A B O O O M ! ! ! ! !",
      (FIELD_SIZE * TILE_SIZE) / 2 - TILE_SIZE * 4,
      FIELD_SIZE * TILE_SIZE + TILE_SIZE
    );
    uncoverAll();
    game_over = true;
  } else if (hasWon()) {
    fill("purple");
    textSize(TILE_SIZE * 0.8);
    text(
      "You Won ! Great job !",
      (FIELD_SIZE * TILE_SIZE) / 2 - TILE_SIZE * 4,
      FIELD_SIZE * TILE_SIZE + TILE_SIZE
    );
    game_over = true;
  } else {
    fill("green");
    textSize(TILE_SIZE / 1.5);

    text("Mines : " + NUMBER_OF_MINES, PosX, PosY + TILE_SIZE / 5);
    text("Flags : " + countFlags(), PosX + TILE_SIZE * 5, PosY + TILE_SIZE / 5);

    fill("blue");
    stroke("blue");
    textSize(TILE_SIZE / 3);
    strokeWeight(1.0);
    text(
      "Find all mines on the minefield! Use CTRL + click to flag.",
      PosX,
      PosY + TILE_SIZE
    );
  }
}

function initField() {
  for (let x = 0; x < FIELD_SIZE; x += 1) {
    field[x] = [];
    for (let y = 0; y < FIELD_SIZE; y += 1) {
      t = new Tile(x, y, TILE_SIZE);
      field[x][y] = t;
    }
  }
}

function hideMines() {
  randomSeed();
  let num_of_mines_set = 0;

  while (num_of_mines_set < NUMBER_OF_MINES) {
    let x = int(random(FIELD_SIZE));
    let y = int(random(FIELD_SIZE));

    t = field[x][y];

    if (t.is_empty()) {
      t.setMine();
      num_of_mines_set += 1;
    }
  }
}

function countMines() {
  for (let x = 0; x < FIELD_SIZE; x += 1) {
    for (let y = 0; y < FIELD_SIZE; y += 1) {
      let mines = 0;

      if (x - 1 >= 0 && y - 1 >= 0 && field[x - 1][y - 1].is_mine()) {
        mines += 1;
      }
      if (x - 1 >= 0 && field[x - 1][y].is_mine()) {
        mines += 1;
      }
      if (x - 1 >= 0 && y + 1 < FIELD_SIZE && field[x - 1][y + 1].is_mine()) {
        mines += 1;
      }
      if (y - 1 >= 0 && field[x][y - 1].is_mine()) {
        mines += 1;
      }
      if (y + 1 < FIELD_SIZE && field[x][y + 1].is_mine()) {
        mines += 1;
      }
      if (x + 1 < FIELD_SIZE && y - 1 >= 0 && field[x + 1][y - 1].is_mine()) {
        mines += 1;
      }
      if (x + 1 < FIELD_SIZE && field[x + 1][y].is_mine()) {
        mines += 1;
      }
      if (
        x + 1 < FIELD_SIZE &&
        y + 1 < FIELD_SIZE &&
        field[x + 1][y + 1].is_mine()
      ) {
        mines += 1;
      }

      field[x][y].setMineCount(mines);
    }
  }
}

function drawField() {
  for (let x = 0; x < FIELD_SIZE; x += 1) {
    for (let y = 0; y < FIELD_SIZE; y += 1) {
      t = field[x][y];
      t.display();
    }
  }
}

function hasBusted() {
  for (let x = 0; x < FIELD_SIZE; x += 1) {
    for (let y = 0; y < FIELD_SIZE; y += 1) {
      t = field[x][y];
      if (t.is_busted_mine()) {
        return true;
      }
    }
  }
  return false;
}

function hasWon() {
  mine_flagged = 0;
  for (let x = 0; x < FIELD_SIZE; x += 1) {
    for (let y = 0; y < FIELD_SIZE; y += 1) {
      t = field[x][y];
      if (t.is_mine_flagged()) {
        mine_flagged += 1;
      }
    }
  }

  if (mine_flagged == NUMBER_OF_MINES) {
    return true;
  } else {
    return false;
  }
}

function countFlags() {
  let flag = 0;
  for (let x = 0; x < FIELD_SIZE; x += 1) {
    for (let y = 0; y < FIELD_SIZE; y += 1) {
      t = field[x][y];
      if (t.is_flagged()) {
        flag += 1;
      }
    }
  }
  return flag;
}

function uncover(x, y) {
  if (x >= 0 && y >= 0 && x < FIELD_SIZE && y < FIELD_SIZE) {
    t = field[x][y];
    if (t.is_covered()) {
      t.uncover();

      if (!t.is_surrounding_mine() && !t.is_busted_mine()) {
        uncover(x - 1, y - 1);
        uncover(x - 1, y);
        uncover(x - 1, y + 1);
        uncover(x, y - 1);
        uncover(x, y + 1);
        uncover(x + 1, y - 1);
        uncover(x + 1, y);
        uncover(x + 1, y + 1);
      }
    }
  }
}

function uncoverAll() {
  for (let x = 0; x < FIELD_SIZE; x += 1) {
    for (let y = 0; y < FIELD_SIZE; y += 1) {
      t = field[x][y];
      t.uncover();
    }
  }
}

function flag(x, y) {
  if (x >= 0 && y >= 0 && x < FIELD_SIZE && y < FIELD_SIZE) {
    t = field[x][y];
    t.flag();
  }
}

class Tile {
  constructor(x, y, size) {
    this.xPos = x * size;
    this.yPos = y * size;
    this.size = size;
    this.state = FiedState.COVERED_EMPTY;
    this.surroundingMines = 0;
  }

  uncover() {
    if (this.state == FiedState.COVERED_EMPTY) {
      this.state = FiedState.UNCOVERED_EMPTY;
    } else if (this.state == FiedState.UNCOVERED_EMPTY) {
      //no change
    } else if (this.state == FiedState.COVERED_MINE) {
      this.state = FiedState.BUSTED_MINE;
    } else if (this.state == FiedState.COVERED_EMPTY_FLAGGED) {
      //no change
    } else if (this.state == FiedState.COVERED_MINE_FLAGGED) {
      //no change
    }
  }

  flag() {
    if (this.state == FiedState.COVERED_EMPTY) {
      this.state = FiedState.COVERED_EMPTY_FLAGGED;
    } else if (this.state == FiedState.COVERED_EMPTY_FLAGGED) {
      this.state = FiedState.COVERED_EMPTY;
    } else if (this.state == FiedState.UNCOVERED_EMPTY) {
      //no change
    } else if (this.state == FiedState.COVERED_MINE) {
      this.state = FiedState.COVERED_MINE_FLAGGED;
    } else if (this.state == FiedState.COVERED_MINE_FLAGGED) {
      this.state = FiedState.COVERED_MINE;
    }
  }

  is_empty() {
    if (
      this.state == FiedState.UNCOVERED_EMPTY ||
      this.state == FiedState.COVERED_EMPTY
    ) {
      return true;
    } else {
      return false;
    }
  }

  is_covered() {
    if (
      this.state == FiedState.COVERED_MINE ||
      this.state == FiedState.COVERED_EMPTY
    ) {
      return true;
    } else {
      return false;
    }
  }

  is_mine() {
    if (this.state == FiedState.COVERED_MINE) {
      return true;
    } else {
      return false;
    }
  }

  is_busted_mine() {
    if (this.state == FiedState.BUSTED_MINE) {
      return true;
    } else {
      return false;
    }
  }

  is_surrounding_mine() {
    if (this.surroundingMines == 0) {
      return false;
    } else {
      return true;
    }
  }

  is_flagged() {
    if (
      this.state == FiedState.COVERED_MINE_FLAGGED ||
      this.state == FiedState.COVERED_EMPTY_FLAGGED
    ) {
      return true;
    } else {
      return false;
    }
  }
  
    is_mine_flagged() {
    if (
      this.state == FiedState.COVERED_MINE_FLAGGED 
    ) {
      return true;
    } else {
      return false;
    }
  }


  setMine() {
    this.state = FiedState.COVERED_MINE;
  }

  setMineCount(mines) {
    this.surroundingMines = mines;
  }

  display() {
    stroke("black");

    if (this.state == FiedState.COVERED_EMPTY) {
      this.displayCoveredTile();
    } else if (this.state == FiedState.COVERED_EMPTY_FLAGGED) {
      this.displayTileWithFlag();
    } else if (this.state == FiedState.UNCOVERED_EMPTY) {
      this.displayTileWithText();
    } else if (this.state == FiedState.COVERED_MINE) {
      this.displayCoveredTile();
    } else if (this.state == FiedState.COVERED_MINE_FLAGGED) {
      this.displayTileWithFlag();
    } else if (this.state == FiedState.BUSTED_MINE) {
      this.displayTileWithMine();
    }
  }

  displayEmptyTile() {
    this.drawTile("lightgrey", "lightgrey");
  }

  displayCoveredTile() {
    this.drawTile("grey", "lightgrey");
  }

  displayTileWithText() {
    this.displayEmptyTile();
    this.displayText();
  }

  displayTileWithMine() {
    this.drawTile("red", "red");
    fill("black");
    circle(this.xPos + this.size / 2, this.yPos + this.size / 2, this.size / 2);
  }

  displayTileWithFlag() {
    this.displayCoveredTile();
    fill("red");
    rect(
      this.xPos + this.size / 6,
      this.yPos + this.size / 6,
      this.size / 2,
      this.size / 3
    );
    strokeWeight(2.0);
    strokeCap(ROUND);
    stroke("black");
    line(
      this.xPos + this.size / 6,
      this.yPos + this.size / 6,
      this.xPos + this.size / 6,
      this.yPos + this.size / 1.2
    );
  }

  displayText() {
    if (this.surroundingMines > 0) {
      fill("blue");
      textSize(this.size / 3);
      let textX = this.xPos + this.size / 2;
      let textY = this.yPos + this.size / 2;
      text(this.surroundingMines, textX, textY);
    }
  }

  drawTile(color_bg, color_fg) {
    fill(color_bg);
    rect(this.xPos, this.yPos, this.size, this.size);
    fill(color_fg);
    noStroke();
    rect(this.xPos + 4, this.yPos + 4, this.size - 7, this.size - 7, 3);
  }
}
