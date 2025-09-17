import { images } from '@/constants/images';
import MaskedView from '@react-native-masked-view/masked-view';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const TendingMovieCard = ({index,movie}:any) => {

  return (
   <Link href={`/movies/${movie.movie_id}`} asChild>
    <TouchableOpacity className='w-32 relative pl-2 mt-4'>
        <Image source={{uri: movie.poster_url}} className='w-32 h-48 rounded-lg border-2 border-orange-200' resizeMode='cover' />

        <Text className='text-white text-xs fon-bold absolute right-1 top-1 bg-orange-500 rounded-sm px-1' numberOfLines={1}>
            hot
        </Text>

        <View className='absolute bottom-30 -left-3.5 px-2 py-1 rounded-full'>
            <MaskedView maskElement={
                <Text className='text-7xl text-white font-bold'>{index + 1}</Text>
            }>
                <Image source={images.rankingGradient} className='size-14' resizeMode='cover' />
            </MaskedView>
        </View>
        <Text className='text-sm font-bold mt-2 text-light-200' numberOfLines={2}>{movie.title}</Text>
    </TouchableOpacity>
   </Link>
  )
}

export default TendingMovieCard