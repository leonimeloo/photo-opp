import { useEffect } from "react";

import styles from './styles.module.css';

export default function Modal() {
    useEffect(() => {
        const modal = document.getElementById("modal");

        window.onclick = function(event) {
            if (event.target == modal) {
                modal!.style.display = 'none';
            }
        }
    }, []);

    const closeModal = () => document.getElementById("modal")!.style.display = 'none';

    return (
        <div className={styles.modal} id="modal">
            <div className={styles.modalContent}>
                <div className={styles.modalText}>
                    <h2>Obrigado!</h2>
                    <p>Valeu por eternizar essa foto como uma lembrança e curtir essa experiência com a gente.</p>
                </div>
            </div>
        </div>
    )
}