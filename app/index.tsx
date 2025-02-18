import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';

// サンプルデータ（実際のアプリでは、APIから取得することを想定）
const gyms = [
  {
    id: '1',
    name: 'フィットネスジムA',
    address: '東京都渋谷区○○1-1-1',
    rating: 4.5,
    price: '¥7,000~/月',
    image: '',
    features: ['24時間営業', 'マシン充実', 'シャワー完備']
  },
  {
    id: '2',
    name: 'スポーツジムB',
    address: '東京都新宿区××2-2-2',
    rating: 4.2,
    price: '¥8,500~/月',
    image: '',
    features: ['プール完備', 'ヨガレッスン', 'パーソナルトレーニング']
  },
  // ... 他のジムデータ
];

export default function GymSearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGyms, setFilteredGyms] = useState(gyms);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = gyms.filter(gym => 
      gym.name.toLowerCase().includes(text.toLowerCase()) ||
      gym.address.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredGyms(filtered);
  };

  const renderGymItem = ({ item }: { item: typeof gyms[0] }) => (
    <Link href={`/gym/${item.id}`} asChild>
      <TouchableOpacity style={styles.gymCard}>
        <View style={styles.gymImageContainer}>
          {/* <Image
            source={{ uri: item.image }}
            style={styles.gymImage}
            defaultSource={require('../assets/images/placeholder.png')}
          /> */}
        </View>
        <View style={styles.gymInfo}>
          <Text style={styles.gymName}>{item.name}</Text>
          <Text style={styles.gymAddress}>{item.address}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>★ {item.rating}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
          <View style={styles.featuresContainer}>
            {item.features.map((feature, index) => (
              <View key={index} style={styles.featureTag}>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="ジム名や場所で検索"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredGyms}
        renderItem={renderGymItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  listContainer: {
    padding: 15,
  },
  gymCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gymImageContainer: {
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  gymImage: {
    width: '100%',
    height: '100%',
  },
  gymInfo: {
    padding: 15,
  },
  gymName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  gymAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rating: {
    color: '#FFB100',
    fontWeight: 'bold',
  },
  price: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureTag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  featureText: {
    fontSize: 12,
    color: '#1976D2',
  },
}); 