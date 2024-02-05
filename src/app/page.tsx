"use client"
import styles from "./page.module.css";
import RecommendationButton from "@/components/Recommendation/recommendation";
import CardMovie from "@/components/CardMovie/card_movie";
import { useEffect, useRef, useState } from "react";
import UseFetch from "@/hooks/use_fetch";

type movieTypes = {
  id: number,
  title: string,
  poster_path: string,
  vote_average: number,
  release_date: string,
  runtime: string,
  videos: {
    results: [
      {
        iso_639_1: string
        key: string,
        site: string,
        type: string,
        official: boolean
      }
    ]
  };
};

type tmdbType = {
  results: movieTypes[]
}

export default function Home() {
  const [numberAllMovies, setNumberAllMovies] = useState<number>(4);
  const [movieList, setMovieList] = useState<movieTypes[]>([]);

  const loading = useRef<boolean>(false);

  useEffect(() => {
    // Garante que o useEffect seja chamada apenas uma vez
    if (!loading.current) getMovies();
  }, []);

  const randomNumber = ({ limit }: { limit: number }): number => {
    const generateNumber = Math.random() * limit + 1;
    const number = Math.floor(generateNumber);
    return number;
  };

  function getApiKey(): string | undefined {
    if (process.env.NODE_ENV === 'development') {
      // Em desenvolvimento local
      console.log("Local");
      return process.env.NEXT_PUBLIC_API_KEY;
    } else {
      // Em produção na Vercel
      console.log("Produção");
      return process.env.DB_API_KEY;
    }
  }

  const getMovies = async () => {
    try {
      loading.current = true;
      setMovieList([]);

      const apiKey = getApiKey();
      console.log(apiKey);
      const pageNumber: string = randomNumber({ limit: 100 }).toString();

      // Obter a lista de filmes
      const response = await UseFetch<tmdbType>({
        url: `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=${pageNumber}&append_to_response=videos&api_key=${apiKey}`
      });

      // Ordenar a lista de filmes pelo vote_average em ordem decrescente
      const moviesSortedByVote = response.results.sort((a, b) => b.vote_average - a.vote_average);

      // Pegar uma quantidade de movies com base no numberAllMovies
      const topMovies = moviesSortedByVote.slice(0, numberAllMovies);

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

      setMovieList(detailedMovies);
    } catch (error) {
      console.error("Erro ao obter movies:", error);
    } finally {
      loading.current = false;
    }
  };

  return (
    <div className={styles.body}>
      <main className={styles.main}>
        <header className={styles.header}>
          <img className={styles.logo} src="/img/logo.png" alt="MovieAI" />
          <RecommendationButton
            text="Nova recomendação"
            onClick={() => getMovies()}
            loading={loading.current}
            additiveClass={
              [styles.button, styles.line, styles.text]
            }
          />
        </header>
        {!loading.current && (
          <div className={styles.list}>
            {movieList.map((movie, index) => {
              const vote = movie.vote_average.toFixed(1);
              const img: string = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
              const year: number = new Date(movie.release_date).getFullYear();
              return (
                <CardMovie
                  key={index}
                  id={movie.id.toString()}
                  name={movie.title}
                  vote={vote}
                  img={img}
                  year={year}
                  duration={movie.runtime}
                  trailerKey={movie.videos.results[0]?.key}
                  trailerSite={movie.videos.results[0]?.site}
                  additiveClass={[styles.card_movie]}
                />
              )
            })}
          </div>
        )}
      </main>
      <footer className={styles.footer}>
        API ©TMBD | @rocketseat desafio | Copyright © 2024 Matheus Carvie. Todos os direitos reservados.
      </footer>
    </div>
  );
}
