import L from 'leaflet';
import Icon from '../images/icon-location.svg';

const icon = L.icon({
  iconUrl: Icon,
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconSize: [32, 40],
});

export default icon;
