import React from "react";
import { View, StyleSheet } from "react-native";
import CollapseBtn from "../../../theme/collapseBtn";
import { colors } from "../../../theme/colors";
import { OptionsProps } from "../../../types/props.types";

const Options: React.FC<OptionsProps> = ({ options, selectedOptions, setSelectedOptions }) => (
    <View style={styles.container}>
        <CollapseBtn
            title="Options"
            noDataTitle="Aucune option"
            data={options}
            type="options"
            selectedData={selectedOptions}
            onChangeSelectedData={setSelectedOptions}
            defaultShow
        />
    </View>
);

export default Options;

const styles = StyleSheet.create({
    container: { 
        marginVertical: 10,  
        paddingBottom: 15, 
        borderBottomWidth: 1, 
        borderColor: 
        colors.lineGray 
    },
});