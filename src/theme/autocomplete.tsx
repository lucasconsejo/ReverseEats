import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { colors } from "./colors"

type AutocompleteProps = {
    onChangeText: CallableFunction,
    input: string,
    data: Array<any>,
}

const Autocomplete: React.FC<AutocompleteProps> = ({ input, data, onChangeText}) => {
    const [showData, setShowData] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<boolean>(false);

    useEffect(() => { 
        if(input.trim().length){
            setShowData(selectedValue ? false : true );
            setSelectedValue(false);
        }else setShowData(false);
        
    }, [input]);
  
    return (
        <View style={styles.inputContainer}>
            <Text  style={styles.label}>Adresse par défaut</Text>
            <TextInput style={styles.input}
                value={input}
                onChangeText={(text) => onChangeText(text)}
            />
            {showData && (
                <View style={styles.dataContainer}>
                {data.map((item, index)=> (
                    <TouchableOpacity 
                    onPress={ () => {
                        setSelectedValue(true)
                        onChangeText(`${item.address} ${item.zipCode} ${item.city}`)
                    }}
                    key={item.id} 
                    style={[styles.dataItem, {borderBottomWidth: data.length -1 == index ? 0 : 1}]}>
                        <Text numberOfLines={1} style={styles.address}>{item.address}</Text>
                        <Text numberOfLines={1} style={styles.city}>{item.zipCode} {item.city}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            )}
        </View>
    )
}

export default Autocomplete

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        color: colors.white,
        fontSize: 18,
        fontWeight: "500"
    },
    input: {
      color: colors.white,
      height: 50,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: colors.white,
      padding: 10,
      borderRadius: 5,
      fontSize: 18
    },
    dataContainer: {
        backgroundColor: colors.white,
    },
    dataItem: {
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical:15,
        borderBottomColor: "#D1D1D1",
    },
    address: {
        fontSize: 18,
    },
    city: {
        fontSize: 18,
        color: colors.graySubTitle,
    }
});