import Image from "next/image";
import styles from "./page.module.css";
import RecommendationButton from "@/components/Recommendation/recommendation";

export default function Home() {
  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <img className={styles.logo} src="/img/logo.png" alt="MovieAI" />
        <RecommendationButton
          text="Nova recomendação"
        />
      </header>
    </div>
  );
}
