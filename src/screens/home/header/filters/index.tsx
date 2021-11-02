import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { filterItems } from './config';

const Filters: React.FC = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
        {filterItems.map((item, index) => {
            return (
                <TouchableOpacity key={index} style={styles.filter}>
                    <View>
                        <Image source={item.img} style={{ width: 60, height: 60 }}/>
                    </View>
                    <Text style={{ fontWeight: "400" }}>{item.name}</Text>
                </TouchableOpacity>
            );
        })}
    </ScrollView>
);

export default Filters;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    filter: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10
    }
});
