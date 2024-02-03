"use client"

import React, { useEffect, useState, useRef } from "react";
import styles from "./tooltip.module.css";
import { createPortal } from "react-dom";

type TooltipProps = {
    text: string,
    children: React.ReactNode,
    offSet?: number
};

export default function Tooltip({ text, children, offSet = 50 }: TooltipProps) {
    const currentRootID: string = "portal_root";
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
    const [childrenHover, setChildrenHover] = useState(false);
    const [tooltipHovered, setTooltipHovered] = useState(false);
    const childrenRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const tooltipRoot = document.getElementById(currentRootID);

        if (!tooltipRoot) {
            const newTooltipRoot = document.createElement("div");
            newTooltipRoot.id = currentRootID;
            document.body.appendChild(newTooltipRoot);
            calculatePosition();
            setPortalElement(newTooltipRoot);
        } else {
            calculatePosition();
            setPortalElement(tooltipRoot);
        }
    }, []);

    const calculatePosition = () => {
        if (childrenRef.current) {
            const { top, left, width } = childrenRef.current.getBoundingClientRect();
            setPosition({ top: top - offSet, left: left + width / 2 - 100 });
        }
    };

    return (
        <div className={styles.tooltip}>
            <div
                ref={childrenRef}
                onMouseEnter={() => setChildrenHover(true)}
                onMouseLeave={() => {
                    if (!tooltipHovered) setChildrenHover(false);
                }}
            >
                {children}
            </div>
            {portalElement &&
                createPortal(
                    <div
                        onMouseEnter={() => setTooltipHovered(true)}
                        onMouseLeave={() => setTooltipHovered(false)}
                        className={`${styles.container} ${childrenHover ? styles.visible : ""}`}
                        style={{ top: position.top, left: position.left }}
                    >
                        {text}
                    </div>,
                    portalElement
                )}
        </div>
    );
}