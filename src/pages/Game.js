import React, { Component } from "react";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 10,
      columns: 10,
      grid: [],
    };
  }

  componentDidMount() {
    this.createGrid(true);
  }

  createGrid(addRandom) {
    const { rows, columns } = this.state;
    let grid = new Array(columns);

    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(rows);
    }
    console.table(grid);
    this.setState({ grid }, () => {
      if (addRandom) this.randomInit();
    });
  }
  randomInit() {
    const { rows, columns, grid } = this.state;
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < columns; j++) {
        grid[i][j] = Math.floor(Math.random() * Math.floor(2));
      }
    }
    console.table(grid);
    this.setState({ grid });
  }

  render() {
    const { grid } = this.state;

    return <div></div>;
  }
}

export default Game;
