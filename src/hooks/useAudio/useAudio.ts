import { useState, useEffect, useCallback } from 'react';

const useAudio = (url: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof Audio === 'undefined' || !url) {
      return;
    }

    setAudio(new Audio(url));
  }, [url]);

  const start = useCallback(() => {
    if (!audio) {
      return;
    }

    audio.play();
    setIsPlaying(true);
  }, [audio]);

  const stop = useCallback(() => {
    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  }, [audio]);

  useEffect(() => {
    return () => {
      setIsPlaying(false);
    };
  }, []);

  useEffect(() => {
    if (!audio) {
      return;
    }

    const listener = () => {
      stop();
    };

    audio.addEventListener('ended', listener);

    return () => {
      audio.removeEventListener('ended', listener);
    };
  }, [audio, stop]);

  return { isPlaying, start, stop };
};

export default useAudio;
