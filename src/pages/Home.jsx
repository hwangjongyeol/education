// src/pages/Home.jsx
import styles from './Home.module.scss';
import MainLayout from '../layouts/MainLayout';

export default function Home() {
    return (
        <MainLayout>
            <div className={styles.container}>
                <h1>📚 학습</h1>
                <div className={styles.linkWrapper}>
                    <div className={styles.linkCard}>
                        <a href="https://hwangjongyeol.github.io/test/Math.html">
                            📘 지원이 수학
                        </a>
                    </div>
                    <div className={styles.linkCard}>
                        <a href="https://hwangjongyeol.github.io/test/word.html">
                            📘 정원이 영어
                        </a>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}