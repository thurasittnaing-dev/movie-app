import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
const END_POINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;


const client = new Client()
    .setEndpoint(END_POINT)
    .setProject(PROJECT_ID);

const databases = new Databases(client);

export const updateSearchCount = async (searchTerm,movie) => {

    try {
        const result = await databases.getDocument({
            databaseId: DATABASE_ID,
            collectionId: 'metrics',
            documentId: '',
            queries: [
                Query.equal('movie_id',movie.id),
            ] 
        });
    

        if(result.documents.length > 0) {
            const doc = result.documents[0];
            await databases.updateDocument({
                databaseId: DATABASE_ID,
                collectionId: 'metrics',
                documentId: doc.$id,
                data: {
                    count : doc.count + 1,
                }, // optional
            });
        }else {
            await databases.createDocument({
                databaseId: DATABASE_ID,
                collectionId: 'metrics',
                documentId: ID.unique(),
                data: {
                    searchTerm,
                    count : 1,
                    title: movie.title,
                    movie_id : movie.id,
                    poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                },
            });
        }
    } catch (error) {
        console.log('Error is here ',error);
    }
}

export const getTrendingMovies = async () => {
    try {
        const result = await databases.getDocument({
            databaseId: DATABASE_ID,
            collectionId: 'metrics',
            documentId: '',
            queries: [
                Query.limit(5),
                Query.orderDesc('count')
            ] 
        });

        return result.documents;
    } catch (error) {
        console.log(error);
        return [];
    }
}

// export const getSearchMovies = async (searchTerm) => {
//     try {
//         const result = await databases.getDocument({
//             databaseId: DATABASE_ID,
//             collectionId: 'metrics',
//             documentId: '',
//             queries: [
//                 Query.limit(5),
//                 Query.orderDesc('count'),
//                 Query.contains('searchTerm',searchTerm)
//             ] 
//         });

//         return result.documents;
//     } catch (error) {
//         console.log(error);
//         return [];
//     }
// }