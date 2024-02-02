import styles from "./card_movie.module.css";
import { outfit } from "@/Fonts/my_fonts";
import PlayButton from "../playbutton/playbutton";

export default function CardMovie() {
    return (
        <div className={styles.card_movie}>
            <div className={styles.line_info}>
                <h1 className={outfit.className}>
                    {"Oppenheimer Oppenheimer Oppenheimer Oppenheimer Oppenheimer"}
                </h1>
                <div className={styles.star}>
                    <span className="material-symbols-outlined">star</span>
                    <h2 className={outfit.className}>4.9</h2>
                </div>
            </div>
            <img src="/img/poster.png" alt="Oppenheimer" />
            <div style={{ marginBottom: "8px" }} className={styles.line_info}>
                <div className={styles.time}>
                    <span style={{ fontVariationSettings: "'FILL' 0" }} className="material-symbols-outlined">schedule</span>
                    <p>3:00:00</p>
                </div>
                <div className={styles.time}>
                    <span style={{ fontVariationSettings: "'FILL' 0" }} className="material-symbols-outlined">calendar_month</span>
                    <p>2023</p>
                </div>
            </div>
            <PlayButton text="Assistir o trailer" />
        </div>
    )
}