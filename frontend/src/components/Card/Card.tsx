import React from "react";
import styles from "./Card.module.css";

interface Props {
    header: string;
    children: React.ReactNode;
}

const Card = ({ header, children }: Props) => {
    return (
        <div className={styles.card}>
            <span className={styles.card_header}>{header}</span>
            {children}
        </div>
    );
};

export default Card;
