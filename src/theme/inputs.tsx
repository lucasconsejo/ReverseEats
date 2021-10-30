import React from "react";
import { useController } from "react-hook-form";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { InputProps } from "../types/props.types";
import { colors } from "./colors";

const Input: React.FC<InputProps> = ({ name, label, theme, control, style, keyboardType, onSubmitEditing, secureTextEntry = false, required = false}) => {
    const { field } = useController({
        defaultValue: "",
        control,
        name,
        rules: { required }
    });

    const color = theme == "light" ? colors.black : colors.white;
    const borderColor = theme == "light" ? colors.secondary : colors.white;

    return (
        <View style={[styles.inputContainer, style]}>
            {label && <Text style={[styles.label, { color }]}>{label}</Text>}
            <TextInput
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                style={[styles.input, { borderColor }]} 
                value={field.value} 
                onChangeText={field.onChange}
                autoCapitalize="none"
                onSubmitEditing={onSubmitEditing}
            />
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: "500"
    },
    input: {
      height: 50,
      marginVertical: 8,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      fontSize: 18
    },
});
