import Actor from '@/components/Actor';
import YouTubeButton from '@/components/YouTubeButton';
import { icons } from '@/constants/icons';
import { fetchMovieDetail } from '@/services/api';
import useFetch from '@/services/userFetch';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const MovieInfo = ({label,value}:any) => (
  <View className='flex-col items-start justify-start mt-5'>
    <Text className='text-light-200 font-normal text-sm'>{label}</Text>
    <Text className='text-light-100 font-bold text-sm mt-2'>{value || 'N/A'}</Text>
  </View>
)

const MovieDetail = () => {

  const {id} = useLocalSearchParams();

  const { data : movie, loading} = useFetch(()=> fetchMovieDetail(id as string));
      console.log('Actors ',movie?.credits?.cast?.length);
    return (
      <View className='bg-primary flex-1'>
        <ScrollView contentContainerStyle={{paddingBottom:80}}>
            <View>
              <Image className='w-full h-[450px]' source={{ uri:`https://image.tmdb.org/t/p/w500${movie?.poster_path}` }} resizeMode='cover' /> 
            </View>

            <View className='flex-col items-start justify-center mt-5 px-5'>
                <Text className="text-white font-bold text-xl">{movie?.title}</Text>

                <View className='flex-row items-center gap-x-1 mt-2'>
                  <Text className='text-orange-500 text-sm'>{movie?.release_date?.split('-')[0]}</Text>
                  <Text className='text-light-200 text-sm'>{movie?.runtime} min</Text>
              </View>

              <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gapx-1 mt-2'>
                <Image source={icons.star} className='size-4' />
                <Text className='text-white text-xs font-bold ml-1'>{Math.round(movie?.vote_average / 2)}</Text>
                <Text className='text-light-200 text-sm ml-1'>({movie?.vote_count} votes)</Text>
              </View>

              <MovieInfo label="Overview" value={movie?.overview} />

              <MovieInfo label="Genres" value={movie?.genres?.map((g)=> g.name).join(' | ') || 'N/A'} />

              <View className='flex-1 flex-row justify-around'>
                <MovieInfo label='Language' value={`${movie?.original_language || 'N/A'}`} />

                <View className='ml-5'>
                  <MovieInfo label='Budget' value={`${movie?.budget / 1000000} millions`} />
                </View>

                <View className='ml-5'>
                  <MovieInfo label='Revenue' value={`${movie?.revenue / 1000000} millions`} />
                </View>
              </View>

              <MovieInfo label="Production Companies" value={movie?.production_companies?.map((c)=> c.name).join(' | ') || 'N/A'} />

              <View className='absolute top-0 right-1'>
                <YouTubeButton  trailers={movie?.trailers} />
              </View>
            </View>


            <View className='mt-2 px-5'>
                <Text className='text-light-200 font-normal text-sm mb-5'>Actors</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={()=> <View className='w-4' />}
                    data={movie?.credits?.cast}
                    renderItem={({item,index} : any) =>  <Actor key={index} {...item} />}
                />
            </View>
        </ScrollView>

        <TouchableOpacity 
          className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-15'
          onPress={router.back}
        >
          <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor="#fff" />
          <Text className='text-white font-bold text-base'>Go back</Text>
        </TouchableOpacity>
      </View>
    )
}

export default MovieDetail