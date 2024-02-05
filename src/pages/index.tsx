"use client"
import styles from "./index.module.css";
import RecommendationButton from "@/components/Recommendation/recommendation";
import CardMovie from "@/components/CardMovie/card_movie";
import { useEffect, useRef, useState } from "react";
import { movieTypes } from "@/types/movie";
import MoviesUtils from "../hooks/movie_utils";
import axios from "axios";

// Home.getInitialProps = async () => {
//   // Número de filmes desejados
//   const numbers = 1;

//   try {
//     // Chame a função MoviesUtils no lado do servidor
//     const detailedMovies = await MoviesUtils({ numberAllMovies: numbers });

//     console.log(detailedMovies);

//     // Retorne os dados que serão passados como props para o componente Home
//     return {
//       detailedMovies,
//     };
//   } catch (error) {
//     console.error("Erro ao obter dados do servidor:", error);

//     return {
//       detailedMovies: [],
//     };
//   }
// };

// Home.getInitialProps = async () => {
//   const response = await axios.get("https://api.github.com/repos/vercel/next.js");
//   return { data: response.data };
// };

export default function Home({ detailedMovies }: { detailedMovies: movieTypes[] }) {
  //console.log(detailedMovies);

  const [numberAllMovies, setNumberAllMovies] = useState<number>(4);
  const [movieList, setMovieList] = useState<movieTypes[]>([]);

  const loading = useRef<boolean>(false);

  useEffect(() => {
    // Garante que o useEffect seja chamada apenas uma vez
    if (!loading.current) getMovies();
  }, []);

  // useEffect(() => {
  //   setMovieList(detailedMovies);
  //   //loadGit();
  // }, []);

  const loadGit = () => {
    axios.get("https://api.github.com/repos/vercel/next.js")
      .then((response) => {
        const data = response.data;
        console.log(data);
      });
  }

  const getMovies = async () => {
    try {
      loading.current = true;
      setMovieList([]);

      const movieUtils = await MoviesUtils({ numberAllMovies: numberAllMovies });
      setMovieList(movieUtils);
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

// export async function getServerSideProps() {
//   // Número de filmes desejados
//   const numberAllMovies = 1;

//   try {
//     // Chame a função MoviesUtils no lado do servidor
//     const detailedMovies = await MoviesUtils({ numberAllMovies });

//     // Os dados retornados serão passados como props para o componente Home
//     return {
//       props: {
//         detailedMovies,
//       },
//     };
//   } catch (error) {
//     console.error("Erro ao obter dados:", error);

//     // Se ocorrer um erro, você pode decidir como lidar com isso
//     return {
//       props: {
//         detailedMovies: [],
//       },
//     };
//   }
// }