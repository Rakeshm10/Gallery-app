import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = 'YOUR_FLICKR_API_KEY';
const FLICKR_API_URL = `   https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s`;

const HomeScreen = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        // Check if images are cached
        const cachedImages = await AsyncStorage.getItem('cachedImages');
        if (cachedImages) {
          setImages(JSON.parse(cachedImages));
        } else {
          // Fetch images from Flickr API
          const response = await axios.get(FLICKR_API_URL);
          const fetchedImages = response.data.photos.photo;
          setImages(fetchedImages);
          // Cache the images
          await AsyncStorage.setItem('cachedImages', JSON.stringify(fetchedImages));
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <Image source={{ uri: item.url_s }} style={styles.image} />
  );

  const handleHomePress = () => {
    // Handle navigation to home screen
    // You can implement navigation logic here
    console.log('Navigating to home screen...');
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={handleHomePress}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.imageList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4287f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navText: {
    color: '#fff',
    fontSize: 20,
  },
  imageList: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});

export default HomeScreen;
