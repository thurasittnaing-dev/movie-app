import { icons } from '@/constants/icons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const MovieCard = ({id,title,poster_path,vote_average,release_date,original_language} : any) => {

  return (
    <Link href={`/movies/${id}`} asChild>
       <TouchableOpacity className='w-[30%]'>
        <Image 
            className='w-full h-52 rounded-lg border-2 border-slate-100'
            resizeMode='cover'
            source={{
                uri : poster_path
                ?  `https://image.tmdb.org/t/p/w500${poster_path}`
                :  `https://placeholder.co/600x400/1a1a1a/ffffff.png`
            }} 
        />
        <Text className='text-white text-sm fon-bold mt-2' numberOfLines={1}>{title}</Text>

        <Text className='text-white text-xs fon-bold absolute right-2 top-1 bg-red-500 rounded-sm px-1' numberOfLines={1}>
          {release_date?.split('-')[0]}
        </Text>

        <View className='flex-row items-center justify-between mt-2 mb-4'>
            <View className='flex-row items-center justify-start gap-x-1'>
                <Image source={icons.star} className='size-4' />
                <Text className='text-white text-xs font-bold uppercase'>{Math.round(vote_average / 2)}</Text>
            </View>
            <Text className='text-light-300 text-xs font-medium'>{original_language}</Text>
        </View>

       </TouchableOpacity>
    </Link>
  )
}

export default MovieCard