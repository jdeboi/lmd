

class Graph {
  constructor() {
    this.nodes = [];
    this.adjacencyList = {};
  }

  addNode(node) {
    this.nodes.push(node);
    this.adjacencyList[node] = [];
  }

  addEdge(node1, node2, weight) {
    this.adjacencyList[node1].push({node:node2, weight: weight});
    this.adjacencyList[node2].push({node:node1, weight: weight});
  }

  findPathWithDijkstra(startNode, endNode) {
    let times = {};
    let backtrace = {};
    let pq = new PriorityQueue();
    times[startNode] = 0;

    this.nodes.forEach(node => {
      if (node !== startNode) {
        times[node] = Infinity
      }
    });

    pq.enqueue([startNode, 0]);
    while (!pq.isEmpty()) {
      let shortestStep = pq.dequeue();
      let currentNode = shortestStep[0];
      this.adjacencyList[currentNode].forEach(neighbor => {
        let time = times[currentNode] + neighbor.weight;
        if (time < times[neighbor.node]) {
          times[neighbor.node] = time;
          backtrace[neighbor.node] = currentNode;
          pq.enqueue([neighbor.node, time]);
        }
      });
    }

    let path = [endNode];
    let lastStep = endNode;

    while(lastStep !== startNode) {
      path.unshift(backtrace[lastStep])
      lastStep = backtrace[lastStep]
    }
    let seconds = getSeconds(times[endNode]);
    let ft = getFeet(times[endNode]);

    let directions = { steps:[], totalTime: seconds, totalDistance: ft};
    for (var i = 0; i < path.length-1; i++) {
      let t = getSeconds(times[path[i+1]] - times[path[i]]);
      let d = getFeet(times[path[i+1]] - times[path[i]]);
      directions.steps[i] = {id: path[i], time: t, feet: d}
    }
    directions.steps.push({id: path[path.length-1], time: 0, feet:0});
    return directions;
  }


}


function getSeconds(weight) {
  return Math.round(0.00002645 * weight*100)/100;
}

function getFeet(weight) {
  return Math.round(weight*0.0001548*100)/100;
}


class PriorityQueue {
  constructor() {
    this.collection = [];
  }

  enqueue(element){
    if (this.isEmpty()){
      this.collection.push(element);
    } else {
      let added = false;
      for (let i = 1; i <= this.collection.length; i++){
        if (element[1] < this.collection[i-1][1]){
          this.collection.splice(i-1, 0, element);
          added = true;
          break;
        }
      }
      if (!added){
        this.collection.push(element);
      }
    }
  };

  dequeue() {
    let value = this.collection.shift();
    return value;
  };
  isEmpty() {
    return (this.collection.length === 0)
  };
}
