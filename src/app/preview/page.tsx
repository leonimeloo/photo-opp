"use client";
import { useRouter } from "next/navigation";
import { useImageContext } from "../context/ImageContext";
import QRCode from 'qrcode';
import Modal from "../components/Modal";

import styles from "./page.module.css";
import { useState } from "react";

type PhotoAction = 'salvar' | 'descartar';

export default function Preview() {
  //const [ uploadedImgUrl, setUploadedImgUrl ] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const { imageUrl, setImageUrl } = useImageContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [isDownloadVisible, setIsDownloadVisible] = useState(false);
  const router = useRouter();

  const photosLogs = async (action: PhotoAction) => {
    try {
      const response = await fetch('/api/logs/photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
    } catch (error) {
      console.error('Erro no log da foto:', (error as Error).message);
    }
  }

  const saveImage = async (imgSrc: string) => {
    setIsLoading(true);
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: imgSrc,
      }),
    });

    if (response.ok) {
        const uploadedImgUrl = (await response.json()).image as string;
        setImageUrl(uploadedImgUrl);
        const qrCode = await QRCode.toDataURL(uploadedImgUrl);
        setQrCodeUrl(qrCode);
        setIsPreviewVisible(false);
        setIsDownloadVisible(true);
        setIsLoading(false);
        document.getElementById("finishBtn")!.style.display = "block";
    } else {
      setIsLoading(false);
      alert("Erro ao salvar imagem. Tente novamente mais tarde.");
      router.back();
    }
  };

  const handleGoBack = async() => {
    await photosLogs('descartar');
    router.back();
  };

  const handleContinue = async() => {
    await saveImage(imageUrl);
    await photosLogs('salvar');
  };

  const handleSubmit = () => {
    document.getElementById("modal")!.style.display = "flex";
    setTimeout(() => {
      router.push("/");
    }, 5000);
  };

  return (
    <main className={styles.main}>
      <div className={styles.previewContainer}>
        <img
          className={styles.previewImage}
          src={imageUrl}
          alt="Preview imagem com moldura"
        />
        {isDownloadVisible && 
            <div id="downloadContainer" className={styles.downloadContainer}>
            <p>Fazer download</p>
            <img
                className={styles.qrCode}
                src={qrCodeUrl}
                alt="QR Code para download da imagem"
            />
            </div>
        }
      </div>

      {isPreviewVisible && <div id="previewBtnContainer" className={styles.btnContainer}>
        <button className={styles.cancelBtn} onClick={handleGoBack}>
          Refazer
        </button>
        {
            isLoading ?
                <button className={styles.cancelBtn}>
                    <img className={styles.loading} src="/loader.png" alt="Loading" />
                </button>
            : 
                <button className={styles.submitBtn} onClick={handleContinue}>
                Continuar
                </button>
        }
      </div>
      }

      <button
        id="finishBtn"
        className={styles.finishBtn}
        onClick={handleSubmit}
      >
        Finalizar
      </button>

      <Modal />
    </main>
  );
}
