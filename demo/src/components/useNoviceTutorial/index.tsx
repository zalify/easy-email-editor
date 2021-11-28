
import ReactDOM from 'react-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import React from 'react';
import styles from './index.module.scss';
import { Popover, PopoverProps } from 'antd';

interface Step extends PopoverProps {
  target: HTMLElement | string;
};

type TutorialStatus = 'processing' | 'finish' | 'skip';

export function useNoviceTutorial() {
  const [status, setStatus] = useState<TutorialStatus>('processing');
  const [stepIndex, setStepIndexHandler] = useState(-1);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [intransit, setIntransit] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);

  const currentStep = steps[stepIndex] as Step | undefined;

  const ele = currentStep?.target;

  const setStepIndex = useCallback((v: Parameters<typeof setStepIndexHandler>[0]) => {
    setIntransit(true);
    setStepIndexHandler(v);
  }, [setStepIndexHandler]);

  useEffect(() => {
    if (stepIndex >= steps.length && status === 'processing') {
      setStatus('finish');
    }
  }, [status, stepIndex, steps.length]);

  useEffect(() => {

    const timer = setTimeout(() => {
      setIntransit(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [stepIndex]);

  useEffect(() => {
    const setPosition = () => {
      if (!ele) return;

      const target = typeof ele === 'string' ? document.querySelector(ele) : ele;
      if (!target) return;
      target.scrollIntoView({ block: 'center' });
      const rect = target.getBoundingClientRect();

      const newStyle: React.CSSProperties = {
        left: rect.left +
          document.documentElement.scrollLeft,
        top: rect.top + document.documentElement.scrollTop,
        width: target.clientWidth,
        height: target.clientHeight
      };
      setStyle(newStyle);

    };
    setPosition();

    window.addEventListener('scroll', setPosition);
    document.documentElement.addEventListener('scroll', setPosition);
    return () => {
      window.removeEventListener('scroll', setPosition);
      document.documentElement.removeEventListener('scroll', setPosition);
    };
  }, [ele]);

  const content = useMemo(() => {
    if (!currentStep) return null;

    return (
      ReactDOM.createPortal(
        <div id="newUserGuide" className={styles.wraper}>
          <Popover key={stepIndex} {...currentStep} visible={!intransit}>
            <div className={styles.container} style={style} />
          </Popover>

          <div className={styles.mask} />
        </div>,
        document.body
      )

    );
  }, [currentStep, stepIndex, style, intransit]);

  const prevStep = useCallback(() => {
    setStepIndex(i => Math.max(i - 1, 0));
  }, [setStepIndex]);

  const nextStep = useCallback(() => {
    setStepIndex(i => i + 1);
  }, [setStepIndex]);

  const skip = useCallback(() => {
    setStatus('skip');
    setStepIndex(steps.length);
  }, [setStepIndex, steps.length]);

  return {
    status,
    content,
    prevStep,
    nextStep,
    setStepIndex,
    setSteps,
    skip,
    steps
  };
}
