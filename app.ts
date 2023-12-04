namespace DataStructure {
  export class Node<T> {
    private name: string;
    private value: T;
    private edges: Node<T>[];
    private maximumEdges: number;

    constructor(name: string, value: T, maximumEdges: number) {
      this.name = name;
      this.value = value;
      this.edges = [];
      this.maximumEdges = maximumEdges;
    }

    addEdge(node: Node<T>) {
      if (this.edges.length < this.maximumEdges) {
        this.edges.push(node);
      } else {
        alert(`node "${this.name}" cannot have more than ${this.maximumEdges} edges`);
      }
    }

    getEdges() {
      return this.edges;
    }

    getValue() {
      return this.value;
    }
  };

  export class Graph<T> {
    addEdge(fromNode: Node<T>, toNode: Node<T>) {
      fromNode.addEdge(toNode);
      toNode.addEdge(fromNode);
    }

    depthFirstTraversalRecursively(startNode: Node<T>, visited: Set<Node<T>> = new Set<Node<T>>()) {
      visited.add(startNode);
      console.log(startNode.getValue());

      for (const edge of startNode.getEdges()) {
        if (!visited.has(edge)) {
          this.depthFirstTraversalRecursively(edge, visited);
        }
      }
    }
    
    depthFirstTraversalIteratively(startNode: Node<T>) {
      const visited = new Set<Node<T>>();
      const stack: Node<T>[] = [];

      stack.push(startNode);

      while (stack.length > 0) {
        const currentNode = stack.pop();
        if (currentNode && !visited.has(currentNode)) {
          visited.add(currentNode);
          console.log(currentNode.getValue());

          for (const edge of currentNode.getEdges()) {
            if (!visited.has(edge)) {
              stack.push(edge);
            }
          }
        }
      }
    }
  };
} 

namespace NetList {
  abstract class Component extends DataStructure.Node<string> {};

  export class LM741 extends Component {
    constructor () {
      super("LM741", "LM741", 6);
    }
  }

  export class Wire extends Component {
    constructor () {
      super("Wire", "Wire", 2);
    }
  }

  export class ThreeTerminalSocket extends Component {
    constructor () {
      super("ThreeTerminalSocket", "ThreeTerminalSocket", 3);
    }
  }

  export class Circuit {
    private graph: DataStructure.Graph<string>;

    constructor () {
      this.graph = new DataStructure.Graph<string>();
    }

    addComponent(from: Component, to: Component) {
      from.addEdge(to);
    }

    depthFirstTraversalIteratively(from: Component) {
      this.graph.depthFirstTraversalIteratively(from);
    }

    depthFirstTraversalRecursively(from: Component) {
      this.graph.depthFirstTraversalRecursively(from);
    }
  };
}

// const graph = new DataStructure.Graph<number>();
// const node1 = new DataStructure.Node<number>("node1", 1, 0);
// const node2 = new DataStructure.Node<number>("node2", 2, 2);
// const node3  = new DataStructure.Node<number>("node3", 3, 2);

// graph.addEdge(node1, node2);
// graph.addEdge(node2, node3);


const circuit = new NetList.Circuit();
const tts = new NetList.ThreeTerminalSocket();
circuit.addComponent(tts, new NetList.LM741());
// const edges = node1.getEdges();

// if (edges) {
//   for (const edge of edges) {
//     console.log(edge.getValue());
//   }
// }

//graph.depthFirstTraversalRecursively(node1);
circuit.depthFirstTraversalRecursively(tts);

