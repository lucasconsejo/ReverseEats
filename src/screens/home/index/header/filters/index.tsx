import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FiltersProps } from '../../../../../types/props.types';
import { filterItems } from './config';
import { colors } from '../../../../../theme/colors';

const Filters: React.FC<FiltersProps> = ({ selectedCategory, setSelectedCategory }) => {
    const onPress = (category: string) => {
        const changeCategory = selectedCategory == category ? "all" : category;
        setSelectedCategory(changeCategory);
    }
    return ( 
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
            {filterItems.map((item, index) => {
                return (
                    <TouchableOpacity key={index} style={[styles.filter, selectedCategory == item.name && styles.selectedCategory]} onPress={() => onPress(item.name)}>
                        <View>
                            <Image source={item.img} style={{ width: 60, height: 60 }}/>
                        </View>
                        <Text style={[{ fontWeight: "400", color: colors.black }, selectedCategory == item.name && styles.selectedCategoryText]}>{item.name}</Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    )
}

export default Filters;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    filter: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 2,
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    selectedCategory: {
        borderRadius: 10,
        backgroundColor: colors.primary,
    },
    selectedCategoryText: {
        color: colors.white,
    }
});
