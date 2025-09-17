export const TMDB_CONFIG = {
    BASE_URL:'https://api.themoviedb.org/3',
    API_KEY : process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers : {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchPopularMovies = async ({query} : {query : string}) => {
    const endPoint = query 
            ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURI(query)}`   
            : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`; 

    const response = await fetch(endPoint,{
        method : 'GET',
        headers : TMDB_CONFIG.headers   
    });

    if(!response.ok) {
        throw new Error('Failed to fetch movie');
    }

    const data = await response.json();
    return data.results;
}

export const fetchMovieDetail = async (movie_id : string) => {
    try {
        const END_POINT = `${TMDB_CONFIG.BASE_URL}/movie/${movie_id}?api_key=${TMDB_CONFIG.API_KEY}&append_to_response=credits,trailers`;
        const response = await fetch(END_POINT,{
            method : 'GET',
            headers : TMDB_CONFIG.headers   
        });

        if(!response.ok) {
            throw new Error('Failed to fetch movie detail');
        }

        const data = await response.json();
        
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}