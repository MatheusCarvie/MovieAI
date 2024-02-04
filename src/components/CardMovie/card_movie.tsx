"use client"
import styles from "./card_movie.module.css";
import { outfit } from "@/Fonts/my_fonts";
import PlayButton from "../Playbutton/playbutton";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { useState, useRef, useEffect } from "react";

type cardMovieTypes = {
    id: string,
    name: string
}

export default function CardMovie({ id, name }: cardMovieTypes) {
    const [isTextOverflow, setIsTextOverflow] = useState(false);
    const h1Ref = useRef<HTMLHeadingElement | null>(null);

    // Verifica se o meu elemento h1 sofreu um overflow
    useEffect(() => {
        if (h1Ref.current) {
            const { scrollWidth, clientWidth } = h1Ref.current;
            setIsTextOverflow(scrollWidth > clientWidth);
        }
    }, [name]);

    return (
        <div className={styles.card_movie}>
            <div className={styles.line_info}>
                <h1 ref={h1Ref} data-tooltip-id={id} className={outfit.className}>{name}</h1>
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