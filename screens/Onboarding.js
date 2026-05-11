import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from "react-native";
import ProgressDots from "../screens/ProgressDots";

const slides = [
  {
    id: "1",
    title: "Your heart beats over \n100,000 times a day",
    subtitle:
      "That’s like your heart clapping \nfor you every second… now \nthat’s dedication!",
    image: require("../assets/heart.png"),
  },
  {
    id: "2",
    title: "Your brain pulls \nall-nighters",
    subtitle:
      "While you snooze, it’s sorting \nmemories, solving problems.. \neven dreaming in 4K!",
    image: require("../assets/brain.png"),
  },
  {
    id: "3",
    title: "We’re all copy-paste \nhumans",
    subtitle: (
      <Text style={{ fontSize: 18, color: "#555", textAlign: "center" }}>
        That 0.1% difference? It’s what {"\n"} makes you you.{" "}
        <Text style={{ color: "#28A745" }}>MedTales</Text>
        {" "}helps {"\n"}you learn all about it!
      </Text>
    ),
    image: require("../assets/twins.png"),
  },
  {
    id: "4",
    title: "Medicine, Told Like a \nStory",
    subtitle:
      "Explore the human body with \ntales and visuals that make it \nunforgettable.",
    image: require("../assets/online-doctor.png"),
  },
];

export default function Onboarding({ navigation }) {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % slides.length;
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex === slides.length - 1) {
      navigation.navigate("SigninSignup");
    } else {
      let nextIndex = currentIndex + 1;
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      let prevIndex = currentIndex - 1;
      flatListRef.current.scrollToIndex({ index: prevIndex, animated: true });
      setCurrentIndex(prevIndex);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.container, { width }]}>
      <View style={styles.slideInner}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
        {typeof item.subtitle === "string" ? (
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        ) : (
          item.subtitle
        )}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#EAF5FF" }}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        extraData={currentIndex}
      />

      <ProgressDots total={slides.length} currentIndex={currentIndex} />

      <View style={styles.bottom}>
        {currentIndex > 0 ? (
          <TouchableOpacity onPress={handleBack}>
            <Text style={styles.skip}>Back</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>
            {currentIndex === slides.length - 1 ? "Get started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  slideInner: {
    width: "100%",
    maxWidth: 520,
    alignItems: "center",
  },
  image: { width: 190, height: 150, marginBottom: 40 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginBottom: 40,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  skip: { fontSize: 16, color: "#666" },
  nextButton: {
    backgroundColor: "#28A745",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  nextText: { color: "#fff", fontSize: 18 },
});
