import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = "pk.eyJ1IjoiaG9vbWltbyIsImEiOiJjbWpxbnY0YzgyNWtyM2ZwdnBlcGNmOHZjIn0.X3ZQ0F0L6ixPY5ZK-BddNg";

// Default center: Kuta, Bali
const DEFAULT_CENTER: [number, number] = [115.1689, -8.7220];

interface UseMapboxOptions {
  containerId: string;
  center?: [number, number];
  zoom?: number;
}

export const useMapbox = ({ containerId, center = DEFAULT_CENTER, zoom = 15 }: UseMapboxOptions) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    const container = document.getElementById(containerId);
    if (!container || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: containerId,
      style: "mapbox://styles/mapbox/light-v11",
      center,
      zoom,
      attributionControl: false,
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [containerId, center[0], center[1], zoom]);

  return mapRef;
};

export { MAPBOX_TOKEN, DEFAULT_CENTER };
