import React from 'react'
import { Image, Text, View } from 'react-native'

const Actor = ({name,profile_path}:any) => {
  return (
    <View>
        <Image 
        source={{
              uri: profile_path
                ? `https://image.tmdb.org/t/p/w185${profile_path}`
                : "https://via.placeholder.com/185x278.png?text=No+Image",
            }}
            className="w-20 h-28 rounded-lg"
        />
       <Text className='text-light-100 font-bold text-sm mt-2'>{name}</Text>
    </View>
  )
 
}

export default Actor