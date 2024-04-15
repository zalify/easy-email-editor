import { Spin } from "@arco-design/web-react";
import { FC } from "react";

interface LoadingScreenProps {
  size?: number;
  isFullScreen?: boolean;
}

const FullScreenLoading: FC<LoadingScreenProps> = ({
  size = 40,
  isFullScreen,
}) => {
  return (
    <div
      style={{
        width: isFullScreen ? "100vw" : "100%",
        height: isFullScreen ? "100vh" : "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin size={size} />
    </div>
  );
};

export default FullScreenLoading;
