import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { colors } from '../../theme/colors';
import { categories } from './categories';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search: React.FC = () => {
    const [input, setInput] = useState<string>("");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <FontAwesomeIcon icon={faSearch} size={18} />
                    <TextInput
                        value={input}
                        keyboardType="default"
                        placeholder="Restaurant, un type de cuisine, plats"
                        style={styles.searchText}
                        onChangeText={(text) => setInput(text)}
                    />
                </View>
                <FlatList 
                    data={categories}
                    numColumns={2}
                    columnWrapperStyle={styles.listContainer}
                    contentContainerStyle={{ paddingBottom: 10 }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => `${index}`}
                    ListHeaderComponent={<Text style={styles.subTitle}>Meilleures catégories</Text>}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.itemContainer}>
                            <ImageBackground source={{ uri: item.img }} style={{ width: "100%", height: "100%" }}>
                                <View style={styles.item}>
                                    <Text style={styles.name}>{item.name}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15,
    },
    searchContainer: {
        flexDirection: "row",
        alignContent: "center",
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: colors.historyGray, 
        borderRadius: 5
    },
    searchText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "500",
    },
    subTitle: {
        fontSize: 17,
        marginVertical: 5,
        color: colors.graySubTitle
    },
    listContainer: {
        justifyContent: "space-between", 
        marginVertical: 5
    },
    itemContainer: { 
        width: '49%', 
        backgroundColor: '#8A8A8A', 
        height: 140,
    },
    item: {
        flex: 1,
        backgroundColor:'#00000073',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    name: {
        fontSize: 18,
        color: colors.white
    }
});
