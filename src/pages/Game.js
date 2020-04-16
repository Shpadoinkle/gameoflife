import React, { Component } from "react";
import styled from "styled-components";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 60,
      columns: 60,
      grid: [],
      next: [],
    };
  }

  componentDidMount() {
    this.initGrid();
  }

  initGrid() {
    let grid = this.createGrid();
    this.setState({ grid }, () => {
      this.randomInit();
    });
  }

  createGrid() {
    const { rows, columns } = this.state;
    let grid = new Array(rows);

    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(columns);
    }

    return grid;
  }

  randomInit() {
    const { rows, columns, grid } = this.state;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        grid[i][j] = Math.floor(Math.random() * Math.floor(2));
      }
    }
    console.table(grid);
    this.setState({ grid });
    this.startCycle();
  }

  startCycle() {
    const { rows, columns, grid } = this.state;
    let next = this.createGrid();

    // Compute next based on grid
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        // Count live neighbors!
        let sum = 0;
        let neighbors = this.countNeighbors(grid, i, j);

        if (state == 0 && neighbors == 3) {
          next[i][j] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }
      }
    }

    this.setState({ grid: next });
    setTimeout(() => {
      this.startCycle();
    }, 1);
  }

  countNeighbors(grid, x, y) {
    /**
     *
     * Uses wrap around techinque..
     * change to edge is acutal edge
     */
    const { rows, columns } = this.state;
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + columns) % columns;
        let row = (y + j + rows) % rows;
        sum += grid[col][row];
      }
    }
    sum -= grid[x][y];
    return sum;
  }

  render() {
    const { grid } = this.state;

    return (
      <Styles>
        {grid.map((c) => {
          return (
            <div className="row">
              {c.map((r) => {
                return (
                  <div className={`dot ${r === 1 ? "dot--alive" : ""}`}></div>
                );
              })}
            </div>
          );
        })}
      </Styles>
    );
  }
}

export default Game;

const Styles = styled.div`
  .row {
    display: flex;
  }
  .dot {
    height: 8px;
    width: 8px;
    background-color: white;
    margin: 1px;

    &.dot--alive {
      background-color: red;
    }
  }
`;
