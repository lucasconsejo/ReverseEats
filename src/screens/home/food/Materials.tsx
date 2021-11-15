import React from "react";
import { View, StyleSheet } from "react-native";
import CollapseBtn from "../../../theme/collapseBtn";
import { MaterialsProps } from "../../../types/props.types";

const Materials: React.FC<MaterialsProps> = ({ materials }) => (
    <View style={styles.container}>
        <CollapseBtn
            title="Matériel requis"
            noDataTitle="Aucun matériel requis"
            data={materials}
            type="materials"
            defaultShow
        />
    </View>
);

export default Materials;

const styles = StyleSheet.create({
    container: { 
        marginVertical: 10,
    },
});