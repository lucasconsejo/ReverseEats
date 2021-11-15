import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../../../../theme/colors';
import { BackgroundRenderProps } from '../../../../types/props.types';

const BackgroundRender: React.FC<BackgroundRenderProps> = ({ cover }) => { 
    const navigation = useNavigation();
    return (
        <ImageBackground source={{ uri: cover }} style={styles.cover}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <FontAwesomeIcon icon={faArrowLeft} size={25} />
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default BackgroundRender;

const styles = StyleSheet.create({
    cover: {
        height: 200,
    }, 
    backBtn: {
        zIndex: 1,
        position: "absolute",
        top: 50,
        left: 20,
        borderRadius: 100,
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        paddingVertical: 10,
    }
});
