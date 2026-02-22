/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PROD: boolean;
  readonly DEV: boolean;
  readonly MODE: string;
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Leaflet MarkerCluster plugin types
declare module 'leaflet.markercluster' {
  // Types are extended on the L namespace
}

declare namespace L {
  interface MarkerClusterGroupOptions {
    showCoverageOnHover?: boolean;
    zoomToBoundsOnClick?: boolean;
    spiderfyOnMaxZoom?: boolean;
    removeOutsideVisibleBounds?: boolean;
    maxClusterRadius?: number | ((zoom: number) => number);
    iconCreateFunction?: (cluster: MarkerCluster) => DivIcon | Icon;
    spiderfyDistanceMultiplier?: number;
    chunkedLoading?: boolean;
    chunkInterval?: number;
    chunkDelay?: number;
    chunkProgress?: (processed: number, total: number, elapsed: number) => void;
    animate?: boolean;
    animateAddingMarkers?: boolean;
    disableClusteringAtZoom?: number;
    singleMarkerMode?: boolean;
    spiderLegPolylineOptions?: PolylineOptions;
    polygonOptions?: PolygonOptions;
  }

  interface MarkerCluster extends Marker {
    getChildCount(): number;
    getAllChildMarkers(): Marker[];
    spiderfy(): void;
    unspiderfy(): void;
  }

  interface MarkerClusterGroup extends FeatureGroup {
    addLayer(layer: Layer): this;
    addLayers(layers: Layer[]): this;
    removeLayer(layer: Layer): this;
    removeLayers(layers: Layer[]): this;
    clearLayers(): this;
    hasLayer(layer: Layer): boolean;
    getVisibleParent(marker: Marker): Marker | MarkerCluster;
    refreshClusters(layers?: LayerGroup): this;
    zoomToShowLayer(layer: Layer, callback?: () => void): void;
  }

  function markerClusterGroup(options?: MarkerClusterGroupOptions): MarkerClusterGroup;
}
