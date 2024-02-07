import styles from "./drop_down.module.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useState } from "react";

type dropDownTypes = {
    value: number
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function DropDown({ value, onChange }: dropDownTypes) {
    const [hover, setHover] = useState<boolean>(false);
    return (
        <div className={styles.selectBody}>
            <select
                onClick={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                data-tooltip-id="dropDown"
                className={styles.select}
                onChange={onChange}
                value={value} >
                <option value={1}>
                    1 filme
                </option>
                <option value={4}>
                    4 filmes
                </option>
                <option value={8}>
                    8 filmes
                </option>
                <option value={10}>
                    10 filmes
                </option>
            </select>
            <span className={`material-symbols-outlined ${styles.arrow}`}>arrow_drop_down</span>
            {!hover && (
                <ReactTooltip id="dropDown" style={{ backgroundImage: "linear-gradient(to left, var(--purple), var(--rose))" }}>
                    Quantidade de filmes
                </ReactTooltip>
            )}
        </div>
    )
}