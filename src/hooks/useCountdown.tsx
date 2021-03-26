import { useState, useEffect, useCallback } from 'react';
import { useInterval } from './useInterval';

export interface ICountdownProps {
  seconds: number;
}

const ONE_MINUTE = 60;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;

const formatTime = (t: number) => {
  return t < 10 ? '0' + t : t;
};

const getTime = (seconds: number) => {
  if (seconds <= 0) {
    return {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
    };
  }
  const day = Math.floor(seconds / ONE_DAY);
  const hour = Math.floor((seconds - day * ONE_DAY) / ONE_HOUR);
  const minute = Math.floor(
    (seconds - day * ONE_DAY - hour * ONE_HOUR) / ONE_MINUTE
  );
  const second = Math.floor(
    seconds - day * ONE_DAY - hour * ONE_HOUR - minute * ONE_MINUTE
  );
  return {
    day,
    hour,
    minute,
    second,
  };
};

const getMillisecond = () =>
  parseInt(new Date().getTime().toString().substr(-3).substr(0, 1) + '0');

export function useCountdown(
  seconds: number,
  option: {
    autoStart: boolean;
    callback?: () => void;
    needMillisecond?: boolean;
  }
) {
  const { autoStart = true, needMillisecond = false, callback } = option;
  const [countSeconds, setCountSeconds] = useState(seconds);

  const [millisecond, setMillisecond] = useState<number>(getMillisecond());

  const [isStart, setIsStart] = useState(autoStart);

  useInterval(() => {
    if (!isStart) return;
    if (!needMillisecond) return;
    setMillisecond(getMillisecond());
  }, 1000 / 60);

  useInterval(() => {
    if (!isStart) return;
    setCountSeconds((countSeconds) => {
      return countSeconds - 1;
    });
  }, 1000);

  useEffect(() => {
    if (isStart && countSeconds === 0) {
      callback && callback();
    }
  }, [isStart, callback, countSeconds]);

  const play = useCallback(() => {
    setIsStart(true);
  }, []);

  const { hour, minute, second, day } = getTime(countSeconds);
  return {
    day: formatTime(day),
    hour: formatTime(hour),
    minute: formatTime(minute),
    second: formatTime(second),
    millisecond: formatTime(millisecond),
    play,
    setCountSeconds,
  };
}
