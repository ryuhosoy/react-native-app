import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// 実際のアプリではAPIから取得
const gymDetails = {
  id: '1',
  name: 'フィットネスジムA',
  address: '東京都渋谷区○○1-1-1',
  rating: 4.5,
  price: '¥7,000~/月',
  image: '',
  features: ['24時間営業', 'マシン充実', 'シャワー完備'],
  description: '最新のマシンを完備した24時間営業のフィットネスジム。初心者から上級者まで対応可能なトレーナーが常駐しています。',
  facilities: ['ウェイトマシン', 'カーディオマシン', 'フリーウェイト', 'シャワールーム', 'ロッカー', '駐車場'],
  businessHours: '24時間',
  phone: '03-xxxx-xxxx',
  website: '',
};

export default function GymDetailScreen() {
  const { id } = useLocalSearchParams();

  const handleCall = () => {
    Linking.openURL(`tel:${gymDetails.phone}`);
  };

  const handleWebsite = () => {
    Linking.openURL(gymDetails.website);
  };

  return (
    <ScrollView style={styles.container}>
      {/* <Image
        source={{ uri: gymDetails.image }}
        style={styles.image}
        defaultSource={require('../../../assets/gym-placeholder.png')}
      /> */}
      
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{gymDetails.name}</Text>
        <Text style={styles.address}>{gymDetails.address}</Text>
        
        <View style={styles.ratingPrice}>
          <Text style={styles.rating}>★ {gymDetails.rating}</Text>
          <Text style={styles.price}>{gymDetails.price}</Text>
        </View>

        <Text style={styles.sectionTitle}>施設について</Text>
        <Text style={styles.description}>{gymDetails.description}</Text>

        <Text style={styles.sectionTitle}>設備</Text>
        <View style={styles.facilitiesContainer}>
          {gymDetails.facilities.map((facility, index) => (
            <View key={index} style={styles.facilityTag}>
              <Text style={styles.facilityText}>{facility}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>営業時間</Text>
        <Text style={styles.info}>{gymDetails.businessHours}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleCall}>
            <Text style={styles.buttonText}>電話する</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.websiteButton]} onPress={handleWebsite}>
            <Text style={styles.buttonText}>ウェブサイトを見る</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  ratingPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rating: {
    fontSize: 16,
    color: '#FFB100',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  facilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  facilityTag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  facilityText: {
    fontSize: 14,
    color: '#1976D2',
  },
  info: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 15,
  },
  button: {
    flex: 1,
    backgroundColor: '#6B4DE6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  websiteButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 