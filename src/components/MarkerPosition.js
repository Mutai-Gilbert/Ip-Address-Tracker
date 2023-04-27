import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Marker, Popup, useMap } from 'react-leaflet';
import icon from './icon';

export default function MarkerPosition({ address }) {
  const position = useMemo(() => [address.location.lat, address.location.lng],
    [address.location.lat, address.location.lng]);

  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 13, {
      animate: true,
    });
  }, [map, position]);
  return (
    <>
      <Marker icon={icon} position={position}>
        <Popup>
          A pretty CSS3 popup.
          {' '}
          <br />
          {' '}
          Easily customizable.
        </Popup>
      </Marker>
    </>
  );
}
MarkerPosition.propTypes = {
  address: PropTypes.shape({
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
