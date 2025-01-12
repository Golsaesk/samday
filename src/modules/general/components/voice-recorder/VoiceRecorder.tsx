'use client';

import Fade from '@mui/material/Fade';
import { useTranslations, } from 'next-intl';
import styles from './VoiceRecorder.module.scss';
import { Typography, useTheme, } from '@mui/material';
import MicIcon from '@modules/general/components/icons/mic';
import StopIcon from '@modules/general/components/icons/stop';
import PlayIcon from '@modules/general/components/icons/play';
import PauseIcon from '@modules/general/components/icons/pause';
import ClearIcon from '@modules/general/components/icons/clear';
import { Voice, } from '@modules/general/libraries/general-types';
import { AUDIO_STATE, ENABLE_VOICE_RECORD, } from '@modules/general/libraries/constants';
import AudioReactRecorder, { RecordState, } from './audio-react-recorder/AudioReactRecorder';
import React, {
  useEffect, useRef, useState,
} from 'react';

const VoiceRecorder = ({
  onRecordStateChange,
  onRecordStop,
}: {
  onRecordStateChange: (state: boolean) => any;
  onRecordStop: (voice: Voice | null) => any; }
) => {

  const
    t = useTranslations(),
    { mode, } = useTheme().palette,
    soundTrack = useRef<any>(null),
    [audioData, setAudioData, ] = useState<any>(null),
    [timerSecond, setTimerSecond, ] = useState<number>(0),
    [timerMinute, setTimerMinute, ] = useState<number>(0),
    [audioDuration, setAudioDuration, ] = useState<string>(''),
    [recordState, setRecordState, ] = useState<any>(RecordState.NONE),
    [audioState, setAudioState, ] = useState<number>(AUDIO_STATE.STOP),
    [audioTrack, setAudioTrack, ] = useState<HTMLAudioElement | null>(null),
    [soundTrackWidthOnPause, setSoundTrackWidthOnPause, ] = useState<number>(0),

    start = async () => {
      if (ENABLE_VOICE_RECORD) {
        navigator.mediaDevices
          .getUserMedia({
            video: false, audio: true,
          })
          .then((stream) => {
            if (stream) {
              setRecordState(RecordState.START);
              onRecordStateChange(true);
            }
          })
          .catch(() => {
          });
      }
    },

    stop = () => {
      if (audioState === AUDIO_STATE.PLAY) {
        setAudioState(AUDIO_STATE.STOP);
        setTimerSecond(0);
        setTimerMinute(0);
      } else {
        setRecordState(RecordState.STOP);
      }
    },

    onStop = async (data: Voice) => {
      setAudioData(data);
      onRecordStop(data);
      onRecordStateChange(false);
      setAudioTrack(new Audio(data.url));
      setSoundTrackWidthOnPause(0);
    },

    reset = () => {
      setAudioData(null);
      setRecordState(RecordState.NONE);
      onRecordStop(null);
      setAudioTrack(null);
    },

    pause = () => {
      if (audioTrack) {
        if (soundTrack.current) {
          setSoundTrackWidthOnPause(soundTrack.current.offsetWidth);
        }
        audioTrack.pause();
        setAudioState(AUDIO_STATE.PAUSE);
      }
    },

    play = () => {
      if (audioTrack) {
        audioTrack.play();
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
        audioTrack.onended = function () {
          setAudioState(AUDIO_STATE.STOP);
          clearInterval(intervalInstance);
          setTimerSecond(0);
          setTimerMinute(0);
        };
        audioTrack.onpause = function () {
          setAudioState(AUDIO_STATE.PAUSE);
          clearInterval(intervalInstance);
        };
      }
    },

    createTimeStamp = (duration: number) => {
      let roundedDuration = Math.round(duration);
      let second = Math.round(roundedDuration % 60);
      let minute = Math.floor(roundedDuration / 60);
      setAudioDuration(`${minute < 10 ? 0 : ''}${minute}:${second < 10 ? 0 : ''}${second}`);
    };

  useEffect(() => {
    setTimeout(() => {
      if (audioTrack) {
        createTimeStamp(audioTrack.duration);
      } else {
        setAudioDuration('');
      }
    }, 100);
  }, [audioTrack, ]);

  return (
    <>
      {(ENABLE_VOICE_RECORD) && (
        <>
          <div className={styles.root}>
            <div className={styles.root__recorder}>
              {audioData && (
                <div className={styles.root__reset} onClick={reset}>
                  <ClearIcon />
                </div>
              )}
              <Fade in={!audioData && recordState === RecordState.NONE}>
                <div className={`${styles.root__recorder__placeholder} ${!(!audioData && recordState === RecordState.NONE) ? styles.root__recorder__placeholder__hide : ''}`}>
                  <Typography onClick={start}>
                    {t('common.voice_recorder_placeholder')}
                  </Typography>
                </div>
              </Fade>
              {audioData ? (
                <Fade in={true}>
                  <div className={styles.root__audioTrack}>
                    <div className={styles.root__audioTrack__timeline}>
                      <div className={styles.root__audioTrack__image}>
                      </div>
                      <div
                        ref={soundTrack}
                        style={{
                          width: `${audioState === AUDIO_STATE.PAUSE ? soundTrackWidthOnPause : 0}px`,
                          transitionDuration: `${(audioState === AUDIO_STATE.PLAY && audioTrack) ? (Math.round(audioTrack?.duration - (timerMinute * 60 + timerSecond))) : 0}s`,
                          animationPlayState: `${audioState === AUDIO_STATE.PLAY ? 'running' : 'paused '}`,
                        }}
                        className={`${styles.root__audioTrack__timeline__animation} ${audioState === AUDIO_STATE.PLAY ? styles.root__audioTrack__timeline__animation__play : ''}`}
                      />
                    </div>
                    {audioTrack && (
                      <div className={styles.root__audioTrack__timeStamp}>
                        {audioState !== AUDIO_STATE.STOP ? `${timerMinute < 10 ? 0 : ''}${timerMinute || 0}:${timerSecond < 10 ? 0 : ''}${timerSecond || 0}` : `${audioDuration || 0}`}
                      </div>
                    )}
                  </div>
                </Fade>
              ) : (
                <Fade in={true}>
                  <div
                    className={styles.root__recorder__wave}
                    hidden={recordState === RecordState.NONE}
                  >
                    <AudioReactRecorder
                      state={recordState}
                      onStop={onStop}
                      backgroundColor={mode === 'dark' ? 'rgb(30,30,30)' : 'rgb(255,255,255)'}
                      foregroundColor='rgb(119,77,253)'
                      canvasWidth={160}
                      canvasHeight={30}
                    />
                  </div>
                </Fade>
              )}
              <div className={styles.root__recorder__buttons}>
                <>
                  <div
                    onClick={start}
                    className={styles.root__recorder__buttons__button}
                    style={{ display: recordState === RecordState.NONE ? 'flex' : 'none', }}
                  >
                    <MicIcon />
                  </div>
                  <div
                    onClick={stop}
                    className={styles.root__recorder__buttons__button}
                    style={{ display: (recordState === RecordState.START) ? 'flex' : 'none', }}
                  >
                    <StopIcon />
                  </div>
                  <div
                    onClick={pause}
                    className={`${styles.root__recorder__buttons__button} ${styles.root__recorder__buttons__button__pause}`}
                    style={{ display: (recordState === RecordState.STOP && audioState === AUDIO_STATE.PLAY) ? 'flex' : 'none', }}
                  >
                    <PauseIcon />
                  </div>
                  <div
                    onClick={play}
                    className={`${styles.root__recorder__buttons__button} ${styles.root__recorder__buttons__button__play}`}
                    style={{ display: (recordState === RecordState.STOP && audioState !== AUDIO_STATE.PLAY) ? 'flex' : 'none', }}
                  >
                    <PlayIcon />
                  </div>
                </>
              </div>
            </div>
          </div>
          {/* <div className={styles.root}>
              <div className={styles.root__disabled}>
                {t<string>('common:microphone_is_disabled')}
              </div>
            </div> */}
        </>
      )}
    </>
  );
};

export default VoiceRecorder;
