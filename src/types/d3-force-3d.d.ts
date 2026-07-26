declare module "d3-force-3d" {
  export interface SimulationNodeDatum {
    index?: number;
    x?: number;
    y?: number;
    z?: number;
    vx?: number;
    vy?: number;
    vz?: number;
    fx?: number | null;
    fy?: number | null;
    fz?: number | null;
  }

  export interface SimulationLinkDatum<NodeDatum extends SimulationNodeDatum> {
    source: NodeDatum | string | number;
    target: NodeDatum | string | number;
    index?: number;
  }

  export interface Force<NodeDatum extends SimulationNodeDatum> {
    (alpha: number): void;
    initialize?: (
      nodes: NodeDatum[],
      random: () => number,
      dimensions: number,
    ) => void;
  }

  export interface Simulation<
    NodeDatum extends SimulationNodeDatum,
    LinkDatum extends SimulationLinkDatum<NodeDatum>,
  > {
    tick(iterations?: number): this;
    stop(): this;
    restart(): this;
    nodes(): NodeDatum[];
    nodes(nodes: NodeDatum[]): this;
    alpha(): number;
    alpha(value: number): this;
    alphaMin(): number;
    alphaMin(value: number): this;
    alphaDecay(): number;
    alphaDecay(value: number): this;
    alphaTarget(): number;
    alphaTarget(value: number): this;
    velocityDecay(): number;
    velocityDecay(value: number): this;
    numDimensions(): number;
    numDimensions(value: number): this;
    force(name: string): Force<NodeDatum> | undefined;
    force(name: string, force: Force<NodeDatum> | null): this;
    find(x: number, y?: number, z?: number, radius?: number): NodeDatum | undefined;
    randomSource(source: () => number): this;
  }

  export interface ForceManyBody<NodeDatum extends SimulationNodeDatum>
    extends Force<NodeDatum> {
    strength(): (node: NodeDatum, index: number, nodes: NodeDatum[]) => number;
    strength(
      value:
        | number
        | ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number),
    ): this;
    distanceMin(): number;
    distanceMin(value: number): this;
    distanceMax(): number;
    distanceMax(value: number): this;
    theta(): number;
    theta(value: number): this;
  }

  export interface ForceCollide<NodeDatum extends SimulationNodeDatum>
    extends Force<NodeDatum> {
    radius(): (node: NodeDatum, index: number, nodes: NodeDatum[]) => number;
    radius(
      value:
        | number
        | ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number),
    ): this;
    strength(): number;
    strength(value: number): this;
    iterations(): number;
    iterations(value: number): this;
  }

  export interface ForceLink<
    NodeDatum extends SimulationNodeDatum,
    LinkDatum extends SimulationLinkDatum<NodeDatum>,
  > extends Force<NodeDatum> {
    links(): LinkDatum[];
    links(links: LinkDatum[]): this;
    id(): (node: NodeDatum, index: number, nodes: NodeDatum[]) => string | number;
    id(
      accessor: (
        node: NodeDatum,
        index: number,
        nodes: NodeDatum[],
      ) => string | number,
    ): this;
    distance(): (link: LinkDatum, index: number, links: LinkDatum[]) => number;
    distance(
      value:
        | number
        | ((link: LinkDatum, index: number, links: LinkDatum[]) => number),
    ): this;
    strength(): (link: LinkDatum, index: number, links: LinkDatum[]) => number;
    strength(
      value:
        | number
        | ((link: LinkDatum, index: number, links: LinkDatum[]) => number),
    ): this;
    iterations(): number;
    iterations(value: number): this;
  }

  export function forceSimulation<
    NodeDatum extends SimulationNodeDatum,
    LinkDatum extends SimulationLinkDatum<NodeDatum> = SimulationLinkDatum<NodeDatum>,
  >(
    nodes?: NodeDatum[],
    numDimensions?: number,
  ): Simulation<NodeDatum, LinkDatum>;

  export function forceManyBody<
    NodeDatum extends SimulationNodeDatum,
  >(): ForceManyBody<NodeDatum>;

  export function forceCollide<
    NodeDatum extends SimulationNodeDatum,
  >(
    radius?:
      | number
      | ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number),
  ): ForceCollide<NodeDatum>;

  export function forceLink<
    NodeDatum extends SimulationNodeDatum,
    LinkDatum extends SimulationLinkDatum<NodeDatum>,
  >(links?: LinkDatum[]): ForceLink<NodeDatum, LinkDatum>;
}
