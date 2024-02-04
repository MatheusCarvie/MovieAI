import styles from "./page.module.css";
import RecommendationButton from "@/components/Recommendation/recommendation";
import CardMovie from "@/components/CardMovie/card_movie";

export default function Home() {
  return (
    <div className={styles.body}>
      <main className={styles.main}>
        <header className={styles.header}>
          <img className={styles.logo} src="/img/logo.png" alt="MovieAI" />
          <RecommendationButton
            text="Nova recomendação"
          />
        </header>
        <div className={styles.list}>
          <CardMovie
            id="1"
            name="Oppenheimer Oppenheimer"
          />
          <CardMovie
            id="2"
            name="Oppenheimersssbb"
          />
          <CardMovie
            id="3"
            name="Oppenheimer"
          />
          <CardMovie
            id="4"
            name="Oppenheimer"
          />
        </div>
      </main>
      <footer className={styles.footer}>
        API ©TMBD | @rocketseat desafio | Copyright © 2024 Matheus Carvie. Todos os direitos reservados.
      </footer>
    </div>
  );
}
