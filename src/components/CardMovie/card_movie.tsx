"use client"
import styles from "./card_movie.module.css";
import { outfit } from "@/Fonts/my_fonts";
import PlayButton from "../Playbutton/playbutton";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { useState, useRef, useEffect } from "react";

type cardMovieTypes = {
    id: string,
    name: string,
    img: string,
    vote: string,
    year: number,
    duration: string,
    trailerKey: string,
    trailerSite: string,
    additiveClass?: string[]
}

export default function CardMovie({ id, name, img, vote, year, duration, trailerKey, trailerSite, additiveClass = [""] }: cardMovieTypes) {
    const [isTextOverflow, setIsTextOverflow] = useState(false);
    const h1Ref = useRef<HTMLHeadingElement | null>(null);
    const hasTrailer: boolean = trailerKey != null;

    // Verifica se o meu elemento h1 sofreu um overflow
    useEffect(() => {
        if (h1Ref.current) {
            const { scrollWidth, clientWidth } = h1Ref.current;
            setIsTextOverflow(scrollWidth > clientWidth);
        }
    }, [name]);

    return (
        <div className={`${styles.card_movie} ${additiveClass[0] ?? ""}`}>
            <div className={styles.line_info}>
                <h1 ref={h1Ref} data-tooltip-id={id} className={outfit.className}>{name}</h1>
                <div className={styles.star}>
                    <span className="material-symbols-outlined">star</span>
                    <h2 className={outfit.className}>{vote}</h2>
                </div>
            </div>
            <img src={img} alt={name} loading="eager" />
            <div style={{ marginBottom: "8px" }} className={styles.line_info}>
                <div className={styles.time}>
                    <span style={{ fontVariationSettings: "'FILL' 0" }} className="material-symbols-outlined">schedule</span>
                    <p>{duration}</p>
                </div>
                <div className={styles.time}>
                    <span style={{ fontVariationSettings: "'FILL' 0" }} className="material-symbols-outlined">calendar_month</span>
                    <p>{year.toString()}</p>
                </div>
            </div>
            <PlayButton
                hasTrailer={hasTrailer}
                text={"Assistir o trailer"}
                onClick={() => {
                    if (hasTrailer) {
                        if (trailerSite == "YouTube") {
                            const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;
                            window.open(trailerUrl, "_blank");
                        } else if (trailerSite == "Vimeo") {
                            const trailerUrl = `https://vimeo.com/${trailerKey}`;
                            window.open(trailerUrl, "_blank");
                        }
                    }
                }} />
            {isTextOverflow && (
                <ReactTooltip
                    id={id}
                    style={{ backgroundImage: "linear-gradient(to left, var(--purple), var(--rose))" }}>
                    {name}
                </ReactTooltip>
            )}
        </div>
    )
}