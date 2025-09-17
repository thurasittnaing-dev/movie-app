import { getTrendingMovies } from '@/appwrite'
import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import TendingMovieCard from '@/components/TendingMovieCard'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchPopularMovies } from '@/services/api'
import useFetch from '@/services/userFetch'
import { useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { ActivityIndicator, FlatList, Image, RefreshControl, ScrollView, Text, View } from 'react-native'
 
const index = () => {

  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);

  const { 
    data: trendingMovies, 
    loading: trendingMoviesLoading, 
    error: trendingMoviesError,
    fetchData: fetchTrendingMovies // Using fetchData instead of refetch
  } = useFetch(() => getTrendingMovies());

  const { 
    data: movies, 
    loading: moviesLoading, 
    error: moviesError,
    fetchData: fetchMovies // Using fetchData instead of refetch
  } = useFetch(() => fetchPopularMovies({ query: '' }));

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    
    try {
      // Refetch both data sources in parallel
      await Promise.all([fetchTrendingMovies(), fetchMovies()]);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  }, [fetchTrendingMovies, fetchMovies]);

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='absolute w-full z-0' resizeMode='cover'  />

      <ScrollView className='flex-1 px-5' 
        showsVerticalScrollIndicator={false} 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          minHeight:"100%",
          paddingBottom:10,
        }}>
        <Image source={icons.logo} className='w-16 h-14 mt-20 mb-5 mx-auto rounded-md border-gray-500 border-2' />

        {
          moviesLoading || trendingMoviesLoading ? (
            <ActivityIndicator 
              size="large"
              color="#fff"
              className='mt-10 self-center'
            />
          ) : moviesError || trendingMoviesError ? (
            <Text className='text-red-500'>Error : {moviesError?.message || trendingMoviesError?.message}</Text>
          ) : (
             <View className='flex-1 mt-5'>
              <SearchBar 
                onPress={() => router.push('/search')}
                placeHolder="Search for a movie"
              />

              {
                (trendingMovies && trendingMovies.length > 0) && (
                <>
                  <Text className='text-lg text-white font-bold mt-5'>Top Search Movies</Text>
                  <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      ItemSeparatorComponent={()=> <View className='w-4' />}
                      data={trendingMovies}
                      renderItem={({item,index}) => <TendingMovieCard index={index} movie={item} />}
                  />
                </>
                )
              }

              <Text className='mt-5 text-white text-lg font-bold'>Latest Movies</Text>

              <FlatList
                data={movies}
                renderItem={({item}) => (
                  <MovieCard {...item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent:'flex-start',
                  gap:20,
                  paddingRight: 5,
                  marginBottom:10,
                }}
                className='mt-2 pb-32'
                scrollEnabled={false}
              />
            </View>
          )
        }
      
      </ScrollView>
    </View>
  )
}

export default index