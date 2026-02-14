import {useCallback, useEffect, useRef, useState} from 'react';
import TrackPlayer, {
  State,
  useProgress,
  usePlaybackState,
  Capability,
} from 'react-native-track-player';
import {AudioTrack} from '../types';
import {getAudioUrl} from '../services/supabase';

let playerReady = false;

async function setup() {
  if (playerReady) return;
  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SeekTo,
      Capability.Stop,
    ],
  });
  playerReady = true;
}

export function useTrackPlayer() {
  const [isReady, setIsReady] = useState(playerReady);
  const playbackState = usePlaybackState();
  const {position, duration} = useProgress(250);
  const currentTrackId = useRef<string | null>(null);

  useEffect(() => {
    if (!playerReady) {
      setup().then(() => setIsReady(true));
    }
  }, []);

  // Stop playback on unmount
  useEffect(() => {
    return () => {
      TrackPlayer.stop();
      TrackPlayer.reset();
      currentTrackId.current = null;
    };
  }, []);

  const isPlaying = playbackState.state === State.Playing;

  const playTrack = useCallback(
    async (track: AudioTrack) => {
      if (!playerReady) await setup();
      if (currentTrackId.current === track.id) return;

      await TrackPlayer.reset();
      const url = getAudioUrl(track.audioUrl);
      await TrackPlayer.add({
        id: track.id,
        url,
        title: track.title,
        duration: track.duration,
      });
      await TrackPlayer.play();
      currentTrackId.current = track.id;
    },
    [],
  );

  const togglePlayPause = useCallback(async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  }, [isPlaying]);

  const seekBy = useCallback(
    async (seconds: number) => {
      const target = Math.max(0, Math.min(position + seconds, duration));
      await TrackPlayer.seekTo(target);
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
