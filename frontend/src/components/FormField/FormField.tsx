import React from "react";
import styles from "./FormField.module.css";

interface Props {
    label: string;
    id: string;
    options?: { value: string; text: string }[];
    setValue: (e: React.FormEvent<any>) => void;
    value: string;
}

const FormField = ({ label, id, options, setValue, value }: Props) => {
    if (!options)
        return (
            <div className={styles.input_container}>
                <label htmlFor={id}>{label}</label>
                <input type="text" className={styles.input_field} id={id} onChange={setValue} value={value} />
            </div>
        );

    if (options)
        return (
            <div className={styles.input_container}>
                <label htmlFor={id}>{label}</label>
                <select className={styles.input_field} id={id} onChange={setValue} value={value}>
                    {options.map(({ value, text }) => (
                        <option key={value} value={value}>
                            {text}
                        </option>
                    ))}
                </select>
            </div>
        );
    return null;
};

export default FormField;
