"use client";
import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Webcam from "react-webcam";
import { useImageContext } from "../context/ImageContext";

import styles from "./page.module.css";

export default function Camera() {
  const [isLoading, setIsLoading] = useState(false);
  const [switchCamera, setSwitchCamera] = useState(0);
  const [timer, setTimer] = useState(4);
  const [imgSrc, setImgSrc] = useState<String | undefined | null>(null);
  const [flash, setFlash] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const { setImageUrl } = useImageContext();
  const router = useRouter();

  const handleCameraChange = () => {
    setSwitchCamera((prev) => (prev === 0 ? 1 : 0));
    document.getElementById("cameraIcon")?.classList.toggle(styles.rotated);
  };

  const generateImage = async(imgSrc: string) => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: imgSrc,
      }),
    });

    if(response.ok) {
      setImageUrl((await response.json()).image as string);
      router.push('/preview');
    } else {
      alert('Erro ao gerar a imagem. Tente novamente mais tarde.');
      router.push('/');
    }
  }

  const capture = useCallback(() => {
    setFlash(false);
    setTimer(4);

    let count = 4;
    const interval = setInterval(() => {
      count -= 1;
      setTimer(count);

      if (count === 0) {
        clearInterval(interval);
        setFlash(true);

        setTimeout(() => {
          const imageSrc = webcamRef.current?.getScreenshot();
          setImgSrc(imageSrc);
          generateImage(imageSrc as string);
          setTimer(4);
          setIsLoading(true);
        }, 100);
      }
    }, 1000);
  }, [webcamRef, setImgSrc]);

  return (
    <>
      {isLoading ? (
        <main className={styles.main}>
          <img className={styles.loading} src="/loader.png" alt="Loading" />
          <p className={styles.loadingText}>Estamos finalizando sua imagem...</p>
        </main>
      ) : (
        <main className={styles.main}>
          <Webcam
            className={styles.camera}
            ref={webcamRef}
            audio={false}
            videoConstraints={{
              width: 720,
              height: 1280,
              facingMode:
                switchCamera === 0 ? "user" : { exact: "environment" },
            }}
            playsInline
            screenshotFormat="image/png"
          />

          {timer > 0 && timer <= 3 && (
            <p className={styles.timer} style={{ display: "block" }}>
              {timer}
            </p>
          )}

          {flash && <div className={styles.flash} />}
          <button className={styles.capture} onClick={capture} />
          <button className={styles.switchCamera} onClick={handleCameraChange}>
            <img
              id="cameraIcon"
              className={styles.switchCameraIcon}
              src="/switch-camera.svg"
              alt="Alternar câmera"
            />
          </button>
        </main>
      )}
    </>
  );
}
