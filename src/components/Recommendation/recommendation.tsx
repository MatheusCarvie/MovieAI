import styles from "./recommendation.module.css";
import { outfit } from "@/Fonts/my_fonts";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useRef } from "react";

type buttonTypes = {
    text: string,
    onClick?: () => void;
    loading?: boolean,
    additiveClass?: string[]
}

export default function RecommendationButton({ text, onClick, loading = false, additiveClass = [""] }: buttonTypes) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
        <button ref={buttonRef} data-tooltip-id={text} onClick={onClick} className={`${styles.button} ${additiveClass![0] ?? ""}`} type="button">
            <div className={`${styles.line} ${additiveClass[1] ?? ""}`}>
                {!loading && <p className={`${outfit.className} ${additiveClass![2] ?? ""}`}>{text}</p>}
                <img
                    src={loading ? "/img/loading.png" : "/img/flash.png"}
                    className={`${loading ? styles.loop : ""}`}
                    alt="Icone Flash"
                />
            </div>
            {buttonRef.current && buttonRef.current?.offsetWidth >= 78 && (
                <ReactTooltip id={text} style={{ backgroundImage: "linear-gradient(to left, var(--purple), var(--rose))" }}>
                    {text}
                </ReactTooltip>
            )}
        </button>
    );
}
