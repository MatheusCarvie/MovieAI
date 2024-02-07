"use client"
import styles from "./page.module.css";
import RecommendationButton from "@/components/Recommendation/recommendation";
import CardMovie from "@/components/CardMovie/card_movie";
import { useEffect, useRef, useState } from "react";
import { movieTypes } from "@/types/movie";
import axios from "axios";
import DropDown from "@/components/DropDown/drop_down";

export default function Home() {
  const [numberAllMovies, setNumberAllMovies] = useState<number>(4);
  const [movieList, setMovieList] = useState<movieTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const doOnce = useRef<boolean>(false);

  useEffect(() => {
    // Garante que o useEffect seja chamada apenas uma vez
    if (!doOnce.current) fetchMoviesData();
  }, []);

  const fetchMoviesData = async () => {
    try {
      setLoading(true);
      doOnce.current = true;
      const response = await axios.get(`/api/movies?numberMovies=${numberAllMovies}`);
      setMovieList(response.data);
    } catch (error) {
      console.error('Erro ao obter dados:', error);
    } finally {
      setLoading(false);
      doOnce.current = false;
    }
  };

  return (
    <div className={styles.body}>
      <main className={styles.main}>
        <header className={styles.header}>
          <img className={styles.logo} src="/img/logo.png" alt="MovieAI" />
          <div className={styles.rightLine}>
            {!loading &&
              <DropDown
                value={numberAllMovies}
                onChange={(event) => setNumberAllMovies(parseInt(event.target.value))}
              />
            }
            <RecommendationButton
              text="Nova recomendação"
              onClick={() => {
                if (!loading) fetchMoviesData();
              }}
              loading={loading}
              additiveClass={
                [styles.button, styles.line, styles.text]
              }
            />
          </div>
        </header>
        {!loading && (
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