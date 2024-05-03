import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, View, StyleSheet, ScrollView, FlatList, Image, Dimensions ,Text} from "react-native";

const { width } = Dimensions.get('window');
const imageWidth = width * 0.8; // Adjust width as needed

const Description = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    const images = [
        require('../../assets/Mosaic1.jpg'),
        require('../../assets/mosaic2.jpg'),
        require('../../assets/mosaic3.jpg'),
    ];

    const symptoms = [
        "Mosaic Patterns: Irregular light and dark green patches on leaves.",
        "Leaf Deformation: Puckering, distortion, and reduced leaf size.",
        "Stunted Growth: Reduced plant size and yield.",
        "Leaf Chlorosis: Yellowing of leaf tissue, often with mosaic patterns.",
        "Vein Swelling: Swollen veins on leaf undersides, leading to vein banding."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentIndex < images.length - 1) {
                flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
            } else {
                flatListRef.current.scrollToIndex({ index: 0, animated: true });
            }
        }, 3000); // Adjust the interval as needed (e.g., 3000ms = 3 seconds)

        return () => clearInterval(interval);
    }, [currentIndex]);

    const renderItem = ({ item}) => (<View style={styles.imageContainer}>
            <Image source={item} style={styles.msc1} />
        </View>
    );

    const renderSymptoms=({item, index}) =>(
        <Text>{`${index+1}.${item}`}</Text>
    )

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scroll}>

                <View style={styles.titleView}><Text style={styles.title}>Cassava Mosaic Disease</Text></View>

                <View style={styles.view1}>
                    <FlatList
                        ref={flatListRef}
                        data={images}
                        renderItem={renderItem}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        getItemLayout={(data, index) => ({
                            length: width,
                            offset: width * index,
                            index
                        })}
                        initialScrollIndex={0}
                        onViewableItemsChanged={({ viewableItems }) => {
                            if (viewableItems && viewableItems.length > 0) {
                                setCurrentIndex(viewableItems[0].index);
                            }
                        }}
                    />
                </View>

                <View style={styles.descriptionPage}>
                    <Text style={styles.subTitles}>Description</Text>
                    <Text>
                        Cassava mosaic disease (CMD) is a devastating viral disease that affects cassava plants, which are a crucial food source for millions of people in tropical regions. CMD is caused by several species of begomoviruses, which are transmitted by the whitefly (Bemisia tabaci). The disease can lead to significant yield losses, impacting food security and livelihoods.
                    </Text>

                    <View>
                        <Text style={styles.subTitles}>Symptoms</Text>
                        <FlatList
                        data={symptoms}
                        renderItem={renderSymptoms}
                        keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                        <Text style={styles.subTitles}>Treatment</Text>
                        <Text>
                          For farmers combating cassava mosaic disease (CMD), effective management lies in controlling its vector, the whitefly. Employing targeted insecticides, physical barriers like nets, and implementing sanitation practices in cassava fields can significantly reduce the whitefly population, curtailing CMD transmission. By diligently applying these measures, farmers can protect their cassava crops, ensuring healthier yields and sustaining agricultural livelihoods.
                        </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll:{
        marginTop: 50,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
    },
    msc1: {
        width: imageWidth,
        height: 150,
        borderRadius: 20,
    },
    title:{
        color:'#0E593C',
        fontWeight:'bold',
        fontSize:30
    },
    titleView:{
        alignItems:'center',
        marginBottom:10
    },
    subTitles:{
        color:'#0E593C',
        fontWeight:'bold',
        fontSize:18,
        fontStyle:'italic',
        marginTop:5
    },
    descriptionPage:{
        margin:15
    }
});

export default Description;
