import {useCallback, useEffect, useRef, useState} from 'react';
import {Audio} from 'expo-av';
import {AudioTrack} from '../types';
import {getAudioUrl} from '../services/supabase';

export function useTrackPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);
  const currentTrackId = useRef<string | null>(null);

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    }).then(() => setIsReady(true));

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const playTrack = useCallback(async (track: AudioTrack) => {
    if (currentTrackId.current === track.id && soundRef.current) return;

    if (soundRef.current) {
      await soundRef.current.unloadAsync();
    }

    const url = getAudioUrl(track.audioUrl);
    const {sound} = await Audio.Sound.createAsync(
      {uri: url},
      {shouldPlay: true},
      status => {
        if (status.isLoaded) {
          setPosition(status.positionMillis / 1000);
          setDuration((status.durationMillis ?? 0) / 1000);
          setIsPlaying(status.isPlaying);
        }
      },
    );
    soundRef.current = sound;
    currentTrackId.current = track.id;
  }, []);

  const togglePlayPause = useCallback(async () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
  }, [isPlaying]);

  const seekBy = useCallback(
    async (seconds: number) => {
      if (!soundRef.current) return;
      const target = Math.max(0, Math.min(position + seconds, duration));
      await soundRef.current.setPositionAsync(target * 1000);
    },
    [position, duration],
  );

  return {
    isPlaying,
    position,
    duration,
    isReady,
    playTrack,
    togglePlayPause,
    seekBy,
  };
}
