import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import R from '@components/utils/R';
import {trainingLocations} from '@components/constants';
import TrainingLocations from './TrainingLocations';

function LocationsDisplay(props) {
  const {latitude, longitude} = props;
  const mapRef = useRef(null);
  const dropOffLat = latitude;
  const dropOffLong = longitude;
  const [changeLoc, setChangeLoc] = useState('');

  useEffect(() => {
    if (latitude > 0 && longitude > 0) {
      if (changeLoc !== dropOffLat) {
        setChangeLoc(dropOffLat);
        animateDropOff();
      }
    }
  }, [latitude, longitude]);

  const animateDropOff = () => {
    let region = {
      latitude: Number(dropOffLat),
      longitude: Number(dropOffLong),
      latitudeDelta: 0.062,
      longitudeDelta: 0.062,
    };
    mapRef.current.animateToRegion(region, 2000);
  };

  return (
    <View style={styles.mainLayout}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.mapView}
          cacheEnabled={false}
          ref={mapRef}
          loadingEnabled={false}
          loadingIndicatorColor={R.color.mainColor}
          loadingBackgroundColor={'rgba(0,0,0,0.3)'}
          initialRegion={{
            latitude: dropOffLat ? Number(dropOffLat) : 32.7157,
            longitude: dropOffLong ? Number(dropOffLong) : -117.161087,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}>
          <Marker
            coordinate={{
              latitude: dropOffLat ? Number(dropOffLat) : 32.7157,
              longitude: dropOffLong ? Number(dropOffLong) : -117.161087,
            }}
            pinColor={R.color.mainColor}
          />
        </MapView>
      </View>

      {trainingLocations?.map((item, index) => {
        return <TrainingLocations key={index} item={item} />;
      })}
    </View>
  );
}
export default LocationsDisplay;

const styles = StyleSheet.create({
  mapContainer: {
    borderRadius: R.unit.scale(10),
    overflow: 'hidden',
    height: R.unit.scale(180),
    width: '100%',
    marginBottom: R.unit.scale(24),
  },
  mapView: {
    height: '100%',
    width: '100%',
  },
});
