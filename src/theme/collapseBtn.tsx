import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { CollapseBtnProps } from '../types/props.types';

const CollapseBtn: React.FC<CollapseBtnProps> = ({ title, noDataTitle, data, type, defaultShow = false, selectedData, onChangeSelectedData }) => {
    const [showData, setShowData] = useState<boolean>(defaultShow);

    const handleCollapseType = () => {
        switch (type) {
            case "materials":
                return <CollapseMaterials data={data} />
            case "options":
                return <CollapseOptions data={data} selectedData={selectedData} onChangeSelectedData={onChangeSelectedData}/>
            default:
                return null;
        }
    }

    return data.length ?(
        <View>
            <TouchableOpacity style={styles.titleContainer} onPress={() => setShowData(!showData)}>
                <Text style={styles.title}>{title}</Text>
                <FontAwesomeIcon icon={showData ? faChevronUp : faChevronDown} size={25} />
            </TouchableOpacity>
            {showData && handleCollapseType()}
        </View>
    ) : (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{noDataTitle}</Text>
            </View>
        </View>
    )
};

const CollapseMaterials: React.FC<CollapseMaterialsProps> = ({ data }) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.materialContainer}>
        {
            data.map((item, index) => (
                <View key={index} style={styles.material}>
                    <View style={styles.circleIcon}>
                        <Image style={{ width: 25, height: 25 }} source={Icon(item.icon)} />
                    </View>
                    <Text style={styles.subTitle}>{item.name}</Text>
                </View>
            ))
        }
    </ScrollView>
)

const CollapseOptions: React.FC<CollapseOptionProps> = ({ data, selectedData, onChangeSelectedData }) => (
    <View style={styles.optionsContainer}>
        {
            data.map((item, index) => {
                const [checked, setChecked] = useState<boolean>(selectedData!.includes(item));
                const checkOn = require("../assets/icons/checkOn.png");
                const checkOff = require("../assets/icons/checkOff.png");

                const onCheck = () => {
                    setChecked(!checked);
                    if (selectedData) {
                        selectedData.includes(item) ? 
                            onChangeSelectedData(selectedData?.filter((f) => f !== item)) :
                            onChangeSelectedData([...selectedData, item])
                    }
                }

                return (
                    <View key={index} style={styles.option}>
                        <TouchableWithoutFeedback onPress={onCheck}>
                            <Image  style={{ width: 30, height: 30 }} source={checked ? checkOn : checkOff} />
                        </TouchableWithoutFeedback>
                        <Text style={styles.optionTitle}>{item}</Text>
                    </View>
                )
            })
        }
    </View>
)


const Icon = (icon: string) => {
    switch (icon) {
        case "oven":
           return require("../assets/materials/oven.png");
        case "fire":
            return require("../assets/materials/fire.png");
        default:
            return require("../assets/materials/fire.png");
    }
}

export default CollapseBtn;

const styles = StyleSheet.create({
    titleContainer: {
        backgroundColor: "#F3F3F3",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 25,
        paddingVertical: 20
    },
    title: {
        fontSize: 20
    },
    materialContainer: {
        flexDirection: "row",
        paddingVertical: 15
    },
    material: {
        width: 80,
        alignItems: "center",
        marginHorizontal: 5
    },
    circleIcon: {
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "#F3F3F3",
    },
    subTitle: {
        textAlign: "center",
        fontSize: 16
    },
    optionsContainer: {
        paddingVertical: 15
    },
    option: {
        flexDirection:  "row",
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 15
    },
    optionTitle: {
        fontSize: 18, 
        marginLeft: 10
    }
});

type CollapseMaterialsProps = {
    data: Array<any>
}

type CollapseOptionProps = {
    data: Array<string>,
    selectedData?: Array<string>,
    onChangeSelectedData?: any
}