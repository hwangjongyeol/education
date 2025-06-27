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
                        <Link to="/english">정원이 영어</Link>
                    </div>
                    <div className={styles.linkCard}>
                        <Link to="/math">지원이 수학</Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}