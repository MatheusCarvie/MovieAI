import UseFetch from "@/hooks/use_fetch";
import { tmdbType, movieTypes } from "@/types/movie";

type movieUtilsTypes = {
    numberAllMovies: number
}

export default function MoviesUtils({ numberAllMovies }: movieUtilsTypes): Promise<movieTypes[]> {
    console.log('Entrou em MoviesUtils');

    const randomNumber = ({ limit }: { limit: number }): number => {
        const generateNumber = Math.random() * limit + 1;
        const number = Math.floor(generateNumber);
        return number;
    };

    const getApiKey = (): string | undefined => {
        if (process.env.NODE_ENV === 'development') {
            // Em desenvolvimento local
            console.log("Local: ", process.env.NEXT_PUBLIC_API_KEY);
            return process.env.NEXT_PUBLIC_API_KEY;
        } else {
            // Em produção na Vercel
            console.log("Produção: ", process.env.DB_API_KEY);
            return process.env.DB_API_KEY;
        }
    };

    return new Promise<movieTypes[]>(async (resolve, reject) => {
        console.log('Entrou na Promisse');
        try {
            const apiKey = getApiKey();
            console.log('API Key:', apiKey);

            const pageNumber: string = randomNumber({ limit: 100 }).toString();

            // Obter a lista de filmes
            const response = await UseFetch<tmdbType>({
                url: `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=${pageNumber}&append_to_response=videos&api_key=${apiKey}`
            });

            console.log('Response:', response);

            // Ordenar a lista de filmes pelo vote_average em ordem decrescente
            const moviesSortedByVote = response.results.sort((a, b) => b.vote_average - a.vote_average);

            // Pegar uma quantidade de movies com base no numberAllMovies
            const topMovies = moviesSortedByVote.slice(0, numberAllMovies);

            console.log('Top Movies:', topMovies);

            // Obter informações detalhadas dos filmes usando Promise.all
            const detailedMovies = await Promise.all(
                topMovies.map(async (element) => {
                    const detailedMovie = await UseFetch<movieTypes>({
                        url: `https://api.themoviedb.org/3/movie/${element.id}?&language=pt-BR&include_video_language=pt-BR,en&append_to_response=videos&api_key=${apiKey}`
                    });

                    // Converter o runtime para uma string no formato "hh:mm:ss"
                    const convertRuntime: number = parseInt(detailedMovie.runtime);
                    const hours = Math.floor(convertRuntime / 60);
                    const minutes = (convertRuntime % 60).toString().padStart(2, "0");
                    const seconds = "00";

                    // Definir a duração do movie
                    detailedMovie.runtime = `${hours}:${minutes}:${seconds}`;

                    // Filtrar vídeos por tipo "Trailer"
                    const trailerVideos = detailedMovie.videos.results.filter((video) => video.type === "Trailer");

                    // Encontrar o trailer em português oficial
                    let trailerPtOfficial = trailerVideos.find((video) => video.iso_639_1 === "pt" && video.official === true);

                    // Se não houver trailer oficial em português, procurar um não oficial
                    if (!trailerPtOfficial) {
                        trailerPtOfficial = trailerVideos.find((video) => video.iso_639_1 === "pt");
                    }

                    // Se ainda não houver trailer em português, encontrar o trailer oficial em inglês
                    if (!trailerPtOfficial) {
                        trailerPtOfficial = trailerVideos.find((video) => video.iso_639_1 === "en" && video.official === true);
                    }

                    // Se não houver trailer oficial em inglês, procurar um não oficial em inglês
                    if (!trailerPtOfficial) {
                        trailerPtOfficial = trailerVideos.find((video) => video.iso_639_1 === "en");
                    }

                    // Se um trailer em português ou inglês for encontrado, movê-lo para a posição 0
                    if (trailerPtOfficial) {
                        const trailerIndex = detailedMovie.videos.results.indexOf(trailerPtOfficial);
                        detailedMovie.videos.results.splice(trailerIndex, 1);
                        detailedMovie.videos.results.unshift(trailerPtOfficial);
                    }

                    return detailedMovie;
                })
            );

            console.log('Detailed Movies:', detailedMovies);

            resolve(detailedMovies);
        } catch (error) {
            reject(error);
        }
    });
}