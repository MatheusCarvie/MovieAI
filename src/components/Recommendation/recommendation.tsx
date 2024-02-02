// Seu componente React
import styles from "./recommendation.module.css";

type buttonTypes = {
    text: string,
    onClick?: () => void;
    loading?: boolean
}

export default function RecommendationButton({ text, onClick, loading = false }: buttonTypes) {
    return (
        <button onClick={onClick} className={styles.button} type="button">
            <div className={styles.line}>
                {!loading && <p>{text}</p>}
                <img
                    src={loading ? "/img/loading.png" : "/img/flash.png"}
                    className={`${loading ? styles.loop : ""}`}
                    alt="Icone Flash"
                />
            </div>
        </button>
    );
}
