import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { colors } from '../../theme/colors';
import { MapViewContainerProps } from '../../types/props.types';
const GOOGLE_API_KEY = "AIzaSyCVU_y5uqCVCyokvrj3jxp6lk2SNZu3Els";

const MapViewContainer: React.FC<MapViewContainerProps> = ({ markers, middleMarker, setMiddleMarker, duration, setDuration }) => {
    const mapRef: any = useRef<any>();

    useEffect(() => {
        if (mapRef !== undefined) {
            mapRef?.current?.fitToCoordinates([{ ...markers[0] }, { ...markers[1] }], {
                edgePadding: {
                top: 10,
                right: 30,
                bottom: 10,
                left: 30,
                },
                animated: false,
            });
        }
    }, []);

    return (
        <MapView style={{ flex: 1 }} provider={PROVIDER_GOOGLE} ref={mapRef}>
            <Marker coordinate={{ ...markers[0] }} title={markers[0].title} description={markers[0].description}>
                <View style={styles.userMarker} />
            </Marker>
            <Marker coordinate={{ ...markers[1] }} title={markers[1].title}>
                <Image resizeMode="contain" source={require("../../assets/img/cook.png")} style={{ width: 40, height: 40 }} />
            </Marker>
            {
                middleMarker && <Marker coordinate={{ ...middleMarker  }} style={{ marginBottom: 10 }} >
                    <View style={styles.durationMarker}>
                        <Text style={styles.durationMarkerText}>{duration} mins</Text>
                    </View>
                </Marker>
            }
            <MapViewDirections
                lineDashPattern={[1]}
                origin={{ ...markers[0] }}
                destination={{ ...markers[1] }}
                optimizeWaypoints={true}
                strokeWidth={4}
                apikey={GOOGLE_API_KEY}
                onReady={(result) => {
                    const middlePoint = result.coordinates[result.coordinates.length/2];
                    setMiddleMarker(middlePoint);
                    setDuration(result.duration.toFixed(0));
                }}
            />
        </MapView>
    )
}

export default MapViewContainer;

const styles = StyleSheet.create({
    userMarker: { 
        borderRadius: 100,
        borderWidth: 7, 
        borderColor: colors.black, 
        width: 25, 
        height: 25, 
        backgroundColor: colors.white 
    },
    durationMarker: {
        backgroundColor: colors.black, 
        borderRadius: 5, 
    },
    durationMarkerText: { 
        color: colors.white, 
        paddingHorizontal: 10, 
        paddingVertical: 5, 
        fontWeight: "bold" 
    }
});
