"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./page.module.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const logAppStart = async() => {
    try {
      const response = await fetch('/api/logs/application', {
        method: 'POST',
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      console.log('Inicialização logada com sucesso:', data.message);
    } catch (error) {
      console.error('Erro ao logar inicialização:', (error as Error).message);
    }
  }

  const handleStart = async () => {
    setIsLoading(true);
    await logAppStart();
    router.push('/camera');
  };

  return (
      <main className={styles.main}>
          <img className={styles.logo} src="/logo.svg"alt="NexLab Logo" />
          <h1 className={styles.title}>Photo{'\n'}Opp</h1>
          { isLoading ? 
          <img className={styles.loading} src="/loader.png" alt="Loading" />
          :
          <button className={styles.startBtn} onClick={handleStart}>
            Iniciar
          </button>
          }
      </main>
  );
}