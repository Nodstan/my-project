import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Notifications from './Notifications';

export default function Home() {
  const navigation = useNavigation();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Notifications
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logo}>Logo</Text>
          <View style={styles.rightIcons}>
            <TouchableOpacity onPress={() => setShowNotifications(true)}>
              <Image source={require('../assets/bell.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image
                source={require('../assets/avatar.png')}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Image
            source={require('../assets/search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search topics"
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </View>

        <LinearGradient
          colors={['#2F80ED', '#2B74D8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.bannerWrapper}
        >
          <ImageBackground
            source={require('../assets/doctor.png')}
            style={{ flex: 1 }}
            imageStyle={{ borderRadius: 16, opacity: 0.15 }}
          >
            <View style={styles.bannerContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.bannerTitle}>
                  Welcome to{'\n'}Medtales!
                </Text>

                <Text style={styles.bannerSubtitle}>
                  Let’s turn science{'\n'}into stories today.
                </Text>

                <TouchableOpacity style={styles.exploreBtn}>
                  <Text style={styles.exploreText}>Explore</Text>
                </TouchableOpacity>
              </View>

              <Image
                source={require('../assets/doctors.png')}
                style={styles.bannerImage}
              />
            </View>
          </ImageBackground>
        </LinearGradient>

        <View style={styles.categories}>
          <TouchableOpacity
            style={[styles.categoryBtn, { backgroundColor: '#00A86B' }]}
          >
            <Text style={styles.categoryText}>Cardiovascular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBtn}>
            <Text style={styles.categoryText}>Respiratory</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.articles}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <View key={item} style={styles.articleCard}>
              <Image
                source={require('../assets/heartss.png')}
                style={styles.articleImage}
              />
              <Text style={styles.articleTitle}>The House with Four Doors</Text>
              <Text style={styles.articleDesc}>
                Once upon a time in the center of the body stood…
              </Text>

              <View style={styles.tag}>
                <Text style={styles.tagText}>Cardiac Cycle</Text>
              </View>
              
              <TouchableOpacity
                style={styles.readBtn}
                onPress={() =>
                  navigation.navigate('Topics', { screen: 'TopicDetails' })
                }
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.readText}>Read</Text>
                  <Image
                    source={require('../assets/arrow-right.png')}
                    style={styles.readIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27AE60',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 30,
  },
  searchIcon: {
    width: 18,
    height: 18,
    tintColor: '#888',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1C274C',
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EAF2FD',
  },
  bannerSubtitle: {
    fontSize: 12,
    marginVertical: 4,
    color: '#EAF2FD',
  },
  exploreBtn: {
    marginTop: 8,
    backgroundColor: '#FEFEFF',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 50,
    alignSelf: 'flex-start',
    width: 100,
    alignItems: 'center',
  },
  exploreText: {
    color: '#143664',
    fontWeight: '500',
    fontSize: 12,
  },
  bannerImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    marginLeft: 8,
    marginRight: -30,
    marginTop: -10,
  },
  bannerWrapper: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  bannerContent: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  categories: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 30,
  },
  categoryBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  articles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  articleCard: {
    width: '48%',
    backgroundColor: '#EAF2FD',
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#9AC5FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },
  articleImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  articleDesc: {
    fontSize: 12,
    color: '#555',
    marginVertical: 4,
  },
  readBtn: {
    marginTop: 8,
    paddingVertical: 6,
    backgroundColor: '#FEFEFF',
    borderRadius: 12,
    alignItems: 'center',
  },
  readText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#143664',
  },
  readIcon: {
    width: 16,
    height: 16,
    marginLeft: 6,
    resizeMode: 'contain',
    tintColor: '#143664',
  },
  tag: {
    backgroundColor: '#E9F7EF',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginTop: 6,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#27AE60',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    color: '#27AE60',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});
