import React from 'react';
import { View, Text } from 'react-native';
import { ScreenProps } from '../../../types/props.types';

const Restaurant: React.FC<ScreenProps> = ({ navigation, route }) => {
    const { restaurant } = route.params

    return (
       <View>
           <Text>{restaurant.name}</Text>
        </View>
    );
};

export default Restaurant;