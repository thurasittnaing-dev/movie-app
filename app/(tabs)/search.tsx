import { updateSearchCount } from '@/appwrite'
import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchPopularMovies } from '@/services/api'
import useFetch from '@/services/userFetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'

const search = () => {

  const [searchTerm,setSearchTerm] = useState('');

  const { data : movies, loading : moviesLoading, error : moviesError, fetchData : loadMovies, reset} = useFetch(()=> fetchPopularMovies({
    query : searchTerm
  }),false) 

  useEffect(() => {

    const timeoutId = setTimeout(async () => {
        if(searchTerm.trim()) {
          await loadMovies();
        }else {
          reset();
        }
    },500);

    return () => clearTimeout(timeoutId);
  },[searchTerm]);

  useEffect(()=>{
      if(movies?.length > 0 && movies?.[0]) {
         updateSearchCount(searchTerm,movies[0]);
      }
    },[movies]);

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='absolute w-full z-0' resizeMode='cover' />

        <FlatList 
          data={movies}
          renderItem={({item}) => <MovieCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent:'center',
            gap:16,
            marginVertical:16
          }}
          contentContainerStyle={{
            paddingBottom:100,
          }}
          ListHeaderComponent={
            <>
              <View className='w-full flex-row justify-center mt-20 items-center'>
                  <Image source={icons.logo} className='w-16 h-14 mb-5 mx-auto rounded-md border-gray-500 border-2' />
              </View>

              <View className='my-5'>
                  <SearchBar placeHolder="Search for a movie" value={searchTerm} onChangeText={(text : string) => setSearchTerm(text)} />
              </View>

              {
                moviesLoading && <ActivityIndicator size="large" color="#fff" className='my-3' />
              }

              {
                moviesError && <Text className='text-red-500'>Error : {moviesError?.message}</Text>
              }

              {
                !moviesLoading && !moviesError && searchTerm.trim() && movies?.length > 0 && (
                  <Text className='text-xl text-white font-bold'> Search Results for 
                    <Text className='text-accent'> {searchTerm}</Text>
                  </Text>
                ) 
              }
            </>
          }
          ListEmptyComponent={
            !moviesLoading && !moviesError ? (
              <View className='mt-10 px-5'>
                <Text className='text-center text-gray-500'>
                  {searchTerm.trim() ? 'No Movie Found' : 'Search for a mvoie'}
                </Text>
              </View>
            ) : null
          }
        />
    </View>
  )
}

export default search

const styles = StyleSheet.create({})