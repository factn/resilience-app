import "leaflet-routing-machine";

import L from "leaflet";
import { MapLayer } from "react-leaflet";

export default class RoutingMachine extends MapLayer {
  componentWillMount() {
    super.componentWillMount();
    const { from, map, to } = this.props;
    L.Routing.control({
      position: "topleft",
      waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
    }).addTo(map);
  }

  render() {
    return null;
  }
}
