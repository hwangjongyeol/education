// src/layouts/MainLayout.jsx
import styles from './MainLayout.module.scss';

export default function MainLayout({ children }) {
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h1>📚 학습 플랫폼</h1>
            </header>
            <main className={styles.main}>{children}</main>
        </div>
    );
}