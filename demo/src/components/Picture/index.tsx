import React, { useEffect, useState } from 'react';

interface IPictureProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLImageElement>,
    HTMLElement
  > {
  src: string;
  className?: string;
}

export function Picture(props: IPictureProps) {
  const [url, setUrl] = useState(props.src);

  useEffect(() => {
    setUrl(props.src);
  }, [props.src]);

  return (
    <picture
      {...{ ...props }}
      {...{
        src: undefined,
        style: {
          display: 'inline-block',
          ...props.style,
        },
      }}
    >
      <img
        style={{
          width: props.style?.width || '100%',
          height: props.style?.height || '100%',
        }}
        src={url}
        alt=''
      />
    </picture>
  );
}
