import React, { useRef, useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { PRIMARY_COLOR } from '@example/constants';

type LoadingProps = {
  loading: boolean;
  children: React.ReactNode;
  color?: string;
};
export function Loading({ loading, children, color = PRIMARY_COLOR }: LoadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({
    width: 0,
    height: 0,
    fontSize: 12
  });

  useEffect(() => {

    if (loading) {
      const node = ref.current;
      const parentNode = node && node.parentNode as HTMLElement;
      if (node && parentNode) {
        const { width, height } = parentNode.getBoundingClientRect();
        setState({
          height,
          width,
          fontSize: Math.min(64, width * 0.15)
        });
      }
    }

  }, [loading]);

  return (
    <>
      {
        loading
          ? (
            <div ref={ref} style={{ height: state.height, width: state.width, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LoadingOutlined style={{ fontSize: state.fontSize, color }} />
            </div>
          )
          : children
      }
    </>

  );
}