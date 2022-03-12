import { useEffect, useState } from 'react';

const useAudio = (url) => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof Audio === 'undefined' || !url) {
      return;
    }

    setAudio(new Audio(url));
  }, [url]);

  const start = () => {
    if (!audio) {
      return;
    }

    audio.play();
    setIsPlaying(true);
  };

  const stop = () => {
    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      setIsPlaying(false);
    };
  }, []);

  return { isPlaying, start, stop };
};

export default useAudio;
