"use client"
import React, { useEffect, useState, useRef } from "react";
import styles from "./tooltip.module.css";
import { createPortal } from "react-dom";

type TooltipProps = {
    text: string,
    children: React.ReactNode,
    offSetTop?: number,
    offSetHorizontal?: number
};

export default function Tooltip({ text, children, offSetTop = 35, offSetHorizontal = 0.05 }: TooltipProps) {
    const currentRootID: string = "Tooltip_Root";
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
    const [childrenVisible, setChildrenVisible] = useState(false);
    const childrenRef = useRef<HTMLDivElement | null>(null);
    const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Faz o gerenciamento da criação da div Tooltip_Root
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

        return () => {
            // Remove o tooltip caso o children for removido
            if (portalElement) {
                document.body.removeChild(portalElement);
            }

            // Limpar o timeout ao desmontar o componente
            if (leaveTimeoutRef.current !== null) {
                clearTimeout(leaveTimeoutRef.current);
            }
        };
    }, [portalElement]);

    // Calcula a posição em que o tooltip vai ficar
    const calculatePosition = () => {
        if (childrenRef.current) {
            const { top, left, width } = childrenRef.current.getBoundingClientRect();
            setPosition({ top: top - offSetTop, left: left + width * offSetHorizontal });
        }
    };

    const handleMouseEnter = () => {
        // Cancelar o timeout do mouseLeave se estiver ativo
        if (leaveTimeoutRef.current !== null) {
            clearTimeout(leaveTimeoutRef.current);
        }
        setChildrenVisible(true);
    };

    const handleMouseLeave = () => {
        // Adiciona um time para remover o tooltip
        leaveTimeoutRef.current = setTimeout(() => {
            setChildrenVisible(false);
        }, 400);
    };

    return (
        <div>
            <div
                ref={childrenRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </div>
            {childrenVisible && portalElement &&
                createPortal(
                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className={styles.tooltip}
                        style={{ top: position.top, left: position.left }}
                    >
                        {text}
                    </div>,
                    portalElement
                )}
        </div>
    );
}
