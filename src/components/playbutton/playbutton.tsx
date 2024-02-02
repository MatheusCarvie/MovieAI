import styles from "./playbutton.module.css";
import { outfit } from "@/Fonts/my_fonts";

type buttonTypes = {
    text: string,
    onClick?: () => void;
    loading?: boolean,
}

export default function PlayButton({ text, onClick, loading = false }: buttonTypes) {
    return (
        <button onClick={onClick} className={styles.button} type="button">
            <div className={styles.line}>
                <div className={styles.circle}>
                    <span className={`material-symbols-outlined ${loading ? styles.loop : ""}`}>
                        {loading ? "progress_activity" : "play_arrow"}
                    </span>
                </div>
                {!loading && <p className={outfit.className}>{text}</p>}
            </div>
        </button>
    );
}
