import React, { Component } from "react";
import logo from "./algo.png";
import Grid from "./grid";
import PriorityQueue from "./priorityq";
import end from "./times-circle-solid.svg";
import start from "./play-solid.svg";


const Modal = () => {
  return (
    <div
      style={{ position: "fixed", top: "200px", color: "white", left: "44vw" }}
      className="p-4 bg-dark rounded shadow-lg animation-target"
    >
      Path Not Found 
    </div>
  );
};
export class App extends Component {
  state = {
    height: 20,
    width: 40,
    start: [10, 5],
    end: [10, 34],

    path: [],
    heuristic: null,
    current: null,
    grid: Array(20)
      .fill()
      .map(() => Array(40).fill(0)),
    visualize: false,
    method: 0,
    showModal: false,
    speed: 1,
  };
  componentDidMount() {
    let heuristic = Array(20)
      .fill()
      .map(() => Array(40).fill(0));

    for (let i = 0; i < this.state.height; i++) {
      for (let j = 0; j < this.state.width; j++) {
        heuristic[i][j] =
          Math.abs(this.state.end[0] - i) + Math.abs(this.state.end[1] - j);
      }
    }
    this.setState({ heuristic });
  }

  visualizeA = async () => {
    this.clearPath();
    this.setState({ visualize: true });
    let flag = 0;
    let path = Array(20)
      .fill()
      .map(() => Array(40).fill([]));
    let q = new PriorityQueue(); 
    q.enqueue(
      this.state.start,
      this.state.heuristic[this.state.start[0]][this.state.start[1]]
    );

    while (!q.isEmpty()) {
      await new Promise((done) => setTimeout(() => done(), this.state.speed)); 
      let grid = this.state.grid;
      let current = q.front().element;

      q.dequeue();
      this.setState({ current });
      if (
        current[0] === this.state.end[0] &&
        current[1] === this.state.end[1]
      ) {
        flag = 1;
        console.log(current);
        break;
      }
      let list = [];

      if (
        current[1] !== this.state.width - 1 &&
        (
          grid[current[0]][current[1] + 1] === 0)
      ) {
        list.push([current[0], current[1] + 1]);
        if (
          path[current[0]][current[1] + 1].length === 0 ||
          path[current[0]][current[1] + 1].length >
            [...path[current[0]][current[1]], current].length
        ) {
          q.enqueue(
            [current[0], current[1] + 1],
            this.state.heuristic[current[0]][current[1] + 1]
          );
          path[current[0]][current[1] + 1] = [
            ...path[current[0]][current[1]],
            current,
          ];
        }
      }
      if (
        current[0] !== this.state.height - 1 &&
        (
          grid[current[0] + 1][current[1]] === 0)
      ) {
        list.push([current[0] + 1, current[1]]);
        if (
          path[current[0] + 1][current[1]].length === 0 ||
          path[current[0] + 1][current[1]].length >
            [...path[current[0]][current[1]], current]
        ) {
          q.enqueue(
            [current[0] + 1, current[1]],
            this.state.heuristic[current[0] + 1][current[1]]
          );
          path[current[0] + 1][current[1]] = [
            ...path[current[0]][current[1]],
            current,
          ];
        }
      }
      if (
        current[0] !== 0 &&
        (
          grid[current[0] - 1][current[1]] === 0)
      ) {
        list.push([current[0] - 1, current[1]]);
        if (
          path[current[0] - 1][current[1]].length === 0 ||
          path[current[0] - 1][current[1]].length >
            [...path[current[0]][current[1]], current]
        ) {
          q.enqueue(
            [current[0] - 1, current[1]],
            this.state.heuristic[current[0] - 1][current[1]]
          );
          path[current[0] - 1][current[1]] = [
            ...path[current[0]][current[1]],
            current,
          ];
        }
      }
      if (
        current[1] !== 0 &&
        (
          grid[current[0]][current[1] - 1] === 0)
      ) {
        list.push([current[0], current[1] - 1]);
        if (
          path[current[0]][current[1] - 1].length === 0 ||
          path[current[0]][current[1] - 1].length >
            [...path[current[0]][current[1]], current].length
        ) {
          q.enqueue(
            [current[0], current[1] - 1],
            this.state.heuristic[current[0]][current[1] - 1]
          );
          path[current[0]][current[1] - 1] = [
            ...path[current[0]][current[1]],
            current,
          ];
        }
      }

      grid[current[0]][current[1]] = 3;

      this.setState({ grid });
    }
    if (flag === 0) {

      this.setState({ current: null, showModal: true });
      setTimeout(() => this.setState({ showModal: false }), 5000);

    } else {

      for (
        let i = 0;
        i < path[this.state.end[0]][this.state.end[1]].length;
        i++
      ) {
        await new Promise((done) => setTimeout(() => done(), 1));
        this.setState({
          path: path[this.state.end[0]][this.state.end[1]].slice(0, i + 1),
        });
      }
    }

    this.setState({ visualize: false });
  };
  
  visualizeDijkstra = async () => {
    let path = Array(20)
      .fill()
      .map(() => Array(40).fill([]));
    let q = [this.state.start];
    let flag = 1;
    this.clearPath();

    this.setState({ visualize: true });

    let grid = this.state.grid;

    while (q.length !== 0 && flag) {
     

      const current = q[0];

      q.shift();
      if(grid[current[0]][current[1]]!==0){
        continue;
      }
      
      if (
        current[0] === this.state.end[0] &&
        current[1] === this.state.end[1]
      ) {
        
        flag = 0;
      } else {
        let list = [];

        if (
          current[0] !== this.state.height - 1 &&
          grid[current[0] + 1][current[1]] === 0
        ) {
          list.push([current[0] + 1, current[1]]);
          path[current[0] + 1][current[1]] = [
            ...path[current[0]][current[1]],
            current,
          ];

          path[current[0] + 1][current[1]].push(current);
        }
        if (
          current[1] !== this.state.width - 1 &&
          grid[current[0]][current[1] + 1] === 0
        ) {
          list.push([current[0], current[1] + 1]);
          path[current[0]][current[1] + 1] = [
            ...path[current[0]][current[1]],
            current,
          ];
        }
        if (current[0] !== 0 && grid[current[0] - 1][current[1]] === 0) {
          list.push([current[0] - 1, current[1]]);
          path[current[0] - 1][current[1]] = [
            ...path[current[0]][current[1]],
            current,
          ];
        }
        if (current[1] !== 0 && grid[current[0]][current[1] - 1] === 0) {
          list.push([current[0], current[1] - 1]);
          path[current[0]][current[1] - 1] = [
            ...path[current[0]][current[1]],
            current,
          ];
        }

     
        grid[current[0]][current[1]] = 3;

        this.setState({ grid ,current});
        await new Promise((done) => setTimeout(() => done(), this.state.speed));

        q = q.concat(list);
      }
    }
    
    if (flag !== 0) {
      this.setState({ showModal: true, current: null });
      setTimeout(() => this.setState({ showModal: false }), 5000);
    } else {
     
      for (
        let i = 0;
        i < path[this.state.end[0]][this.state.end[1]].length;
        i++
      ) {
        await new Promise((done) => setTimeout(() => done(), 1));
        this.setState({
          path: path[this.state.end[0]][this.state.end[1]].slice(0, i + 1),
        });
      }
    }

    this.setState({ visualize: false });
  };

  clearPath = () => {
    this.setState((state) => {
      return {
        grid: state.grid.map((row) =>
          row.map((obj) => {
            if (obj === 1 || obj === 0) return obj;
            else return 0;
          })
        ),
        path: [],

        current: null,
      };
    });
  };
  toggleWall = (y, x, type) => {

    if (type === 1) {
      this.setState((state) => {
        let grid = state.grid;
        grid[y][x] = 0;
        return { grid };
      });
    } else {
      this.setState((state) => {
        let grid = state.grid;
        grid[y][x] = 1;
        return { grid };
      });
    }
  };
  render() {
    return (
      <div>

        {this.state.showModal ? <Modal /> : null}

        <div
          className="navbar navbar-dark "
          style={{ backgroundColor: "#234E70", color: "white",font:"bold" }}
        >
          <div className="navbar-brand">
            <img
              src={logo}
              style={{ width: "auto", height: "65px" }}
              alt="logo"
              className="mr-4"
            />
            Dijkstra and A* visualizer
          </div>

          <div className="row">
            <div className="dropdown mx-4">
              <button
                className="btn  dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                style={{ backgroundColor: "#FBF8BE" }}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                disabled={this.state.visualize}
              >
                Algo
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <button
                  className="dropdown-item"
                  onClick={() => this.setState({ method: 0 })}
                >
                  Dijkstra algo
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => this.setState({ method: 1 })}
                >
                  A* Search algo
                </button>
              </div>
            </div>
            <button
              className=" btn mx-4"
              onClick={() =>
                this.state.method === 0
                  ? this.visualizeDijkstra()
                  : this.visualizeA()
              }
              style={{ backgroundColor: "#FBF8BE" }}
              disabled={this.state.visualize}
            >
              Visualize{" "}
              {this.state.method === 0 ? " Dijkstra" : " A star "}
            </button>
            <div className="dropdown mx-4">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                style={{ backgroundColor: "#FBF8BE" }}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                disabled={this.state.visualize}
              >
                {this.state.speed === 1
                  ? "Fast"
                  : this.state.speed === 200
                  ? "Average"
                  : "Slow"}
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <button
                  className="dropdown-item"
                  onClick={() => this.setState({ speed: 1 })}
                >
                  Fast
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => this.setState({ speed: 200 })}
                >
                  Medium
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => this.setState({ speed: 500 })}
                >
                  Slow
                </button>
              </div>
            </div>
            <button
              className=" btn mx-4"
              onClick={() =>
                this.setState({
                  grid: Array(20)
                    .fill()
                    .map(() => Array(40).fill(0)),
                  path: [],
                  current: null,
                })
              }
              style={{ backgroundColor: "#FBF8BE" }}
              disabled={this.state.visualize}
            >
              Clean Grid
            </button>
            <button
              className=" btn mx-4"
              onClick={() => this.clearPath()}
              style={{ backgroundColor: "#FBF8BE" }}
              disabled={this.state.visualize}
            >
              Clean Path
            </button>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row pt-4">
            <div className="row mx-4">
              Starting Point :
              <div
                className="mx-2"
                style={{
                  width: "30px",
                  height: "30px",
                  WebkitUserSelect: "none",
                }}
              >
                <img
                  src={start}
                  alt="start"
                  style={{ width: "25px", height: "25px" }}
                />
              </div>
            </div>
            <div className="row mx-4">
              Destination Point:
              <div
                className="mx-2"
                style={{
                  width: "30px",
                  height: "30px",
                  WebkitUserSelect: "none",
                }}
              >
                <img
                  src={end}
                  alt="start"
                  style={{ width: "25px", height: "25px" }}
                />
              </div>
            </div>
            <div className="row mx-4">
              Visited :
              <div
                className="mx-2"
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#00FFFF",
                  border: "2px solid #101820FF",
                  WebkitUserSelect: "none",
                }}
              ></div>
            </div>
            <div className="row mx-4">
              Unvisited :
              <div
                className="mx-2"
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "white",
                  border: "2px solid #bcbcbc",
                  WebkitUserSelect: "none",
                }}
              ></div>
            </div>
            <div className="row mx-4">
              Shortest Path Node:
              <div
                className="mx-2"
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#317773",
                  border: "2px solid #101820FF",
                  WebkitUserSelect: "none",
                }}
              ></div>
            </div>
            <div className="row mx-4">
              Walls:
              <div
                className="mx-2"
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#101820FF",
                  border: "2px solid #101820FF",
                  WebkitUserSelect: "none",
                }}
              ></div>
            </div>
          </div>
        </div>
        <Grid
          height={this.state.height}
          grid={this.state.grid}
          path={this.state.path}
          current={this.state.current}
          start={this.state.start}
          end={this.state.end}
          width={this.state.width}
          visualize={this.state.visualize}
          toggleWall={this.toggleWall}
        />
      </div>
    );
  }
}

export default App;
