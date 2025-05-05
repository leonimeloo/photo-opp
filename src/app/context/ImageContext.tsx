"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';

type ImageContextType = {
  imageUrl: string;
  setImageUrl: (url: string) => void;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImageContext deve ser usado dentro de um ImageProvider');
  }
  return context;
};

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <ImageContext.Provider value={{ imageUrl, setImageUrl }}>
      {children}
    </ImageContext.Provider>
  );
};