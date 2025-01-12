'use client';

import styles from './VoiceMessage.module.scss';
import PauseIcon from '@mui/icons-material/Pause';
import CircularProgress from '@mui/material/CircularProgress';
import PlayIcon from '@modules/general/components/icons/play';
import { AUDIO_STATE, DOMAIN, } from '@modules/general/libraries/constants';
import React, {
  useEffect, useRef, useState,
} from 'react';

export default function VoiceMessage({
  audioUrl,
  color = 'info',
}: {
  audioUrl: string;
  color?: 'gray' | 'info';
}) {
  const
    soundTrack = useRef<any>(null),
    [loading, setLoading, ] = useState<boolean>(false),
    [timerMinute, setTimerMinute, ] = useState<number>(0),
    [timerSecond, setTimerSecond, ] = useState<number>(0),
    [audioDuration, setAudioDuration, ] = useState<number>(0),
    [timestamp, setTimestamp, ] = useState<string>(''),
    [audioState, setAudioState, ] = useState<number>(AUDIO_STATE.STOP),
    [audioTrack, setAudioTrack, ] = useState<HTMLAudioElement | null>(null),
    [soundTrackWidthOnPause, setSoundTrackWidthOnPause, ] = useState<number>(0),

    pause = () => {
      if (audioTrack) {
        if (soundTrack.current) {
          setSoundTrackWidthOnPause(soundTrack.current.offsetWidth);
        }
        audioTrack.pause();
        setAudioState(AUDIO_STATE.PAUSE);
      }
    },

    play = (audio: HTMLAudioElement | null) => {
      if (audio) {
        audio.play();
        setAudioState(AUDIO_STATE.PLAY);
        let secondCounter = timerSecond || 0;
        let minuteCounter = timerMinute || 0;
        let intervalInstance = setInterval(() => {
          if (secondCounter > 58) {
            secondCounter = 0;
            setTimerSecond(secondCounter);
            minuteCounter++;
            setTimerMinute(minuteCounter);
          } else {
            secondCounter ++;
            setTimerSecond(secondCounter);
          }
        }, 1000);

        audio.onended = function () {
          setAudioState(AUDIO_STATE.STOP);
          clearInterval(intervalInstance);
          setTimerSecond(0);
          setTimerMinute(0);
          setSoundTrackWidthOnPause(0);
        };
        audio.onpause = function () {
          setAudioState(AUDIO_STATE.PAUSE);
          clearInterval(intervalInstance);
        };
      }
    },

    createTimeStamp = (duration: number | undefined) => {
      if (duration && duration !== Infinity) {
        let roundedDuration = Math.round(duration);
        let second = Math.round(roundedDuration % 60);
        let minute = Math.floor(roundedDuration / 60);
        setTimestamp(`${minute < 10 ? 0 : ''}${minute}:${second < 10 ? 0 : ''}${second}`);
      }
    },

    loadAudio = async () => {
      setLoading(true);
      let audio = new Audio();
      audio.preload = 'metadata';
      fetch(DOMAIN + audioUrl)
        .then(response => response.blob())
        .then(blob => {
          audio.src = URL.createObjectURL(blob);
          audio.load();
        })
        .catch();
      audio.onloadedmetadata = function () {
        setAudioTrack(audio);
        setAudioDuration(audio.duration);
        play(audio);
        setLoading(false);
      };
    },

    playHandler = () => {
      if (audioTrack) {
        play(audioTrack);
      } else {
        loadAudio();
      }
    };

  useEffect(() => {
    createTimeStamp(audioTrack?.duration);
  }, [audioDuration, ]);

  return (
    <>
      {audioUrl && (
        <div className={styles.root}>
          <div className={styles.root__audioTrack}>
            <div className={styles.root__audioTrack__timeline}>
              <div className={`${styles.root__audioTrack__image} ${color === 'gray' ? styles.root__audioTrack__image__gray : ''}`} />
              <div
                ref={soundTrack}
                style={{
                  width: `${audioState === AUDIO_STATE.PAUSE ? soundTrackWidthOnPause : 0}px`,
                  transitionDuration: `${(audioState === AUDIO_STATE.PLAY && audioDuration) ? (audioDuration - (timerMinute * 60 + timerSecond)) : 0}s`,
                  animationPlayState: `${audioState === AUDIO_STATE.PLAY ? 'running' : 'paused '}`,
                }}
                className={`${styles.root__audioTrack__timeline__animation} ${
                  audioState === AUDIO_STATE.PLAY ? styles.root__audioTrack__timeline__animation__play : ''} ${
                  color === 'gray' ? styles.root__audioTrack__timeline__animation__gray : ''
                }`}
              />
            </div>
            <div className={styles.root__audioTrack__timeStamp}>
              {audioTrack && (
                <>
                  {(audioState === AUDIO_STATE.STOP) ? timestamp :
                    `${timerMinute < 10 ? 0 : ''}${timerMinute}:${timerSecond < 10 ? 0 : ''}${timerSecond}`}
                </>
              )}
            </div>
          </div>
          <div className={styles.root__recorder__buttons}>
            <div
              onClick={pause}
              className={`${styles.root__recorder__buttons__button} ${
                styles.root__recorder__buttons__button__pause} ${
                color === 'gray' ? styles.root__recorder__buttons__button__gray : ''
              }`}
              style={{ display: audioState === AUDIO_STATE.PLAY ? 'flex' : 'none', }}
            >
              <PauseIcon />
            </div>
            <div
              onClick={playHandler}
              className={`${styles.root__recorder__buttons__button} ${
                styles.root__recorder__buttons__button__play} ${
                color === 'gray' ? styles.root__recorder__buttons__button__gray : ''
              }`}
              style={{ display: (audioState === AUDIO_STATE.PAUSE || audioState === AUDIO_STATE.STOP) ? 'flex' : 'none', }}
            >
              {loading ? (
                <div className={styles.root__recorder__buttons__button__play__loading}>
                  <CircularProgress />
                </div>
              ) : (
                <PlayIcon />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
