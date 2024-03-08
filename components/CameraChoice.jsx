import React, { useCallback, useContext, useRef, useState } from "react";
import Webcam from "react-webcam";
import { ClienteContext } from "contexts/ClienteContext";
import Image from "next/image";
import { CameraOutlined, SwapOutlined } from '@ant-design/icons';
import { Button } from "antd";
const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

export default function WebcamCompChoise() {
  const { img, handleImagem } = useContext(ClienteContext);
  const [facingMode, setFacingMode] = useState(FACING_MODE_ENVIRONMENT);

  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "environment",
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      handleImagem(imageSrc);
    }
  }, [webcamRef, handleImagem]);

  const handleClick = React.useCallback(() => {
    setFacingMode(
      prevState =>
        prevState === FACING_MODE_ENVIRONMENT
          ? FACING_MODE_USER
          : FACING_MODE_ENVIRONMENT
    );
  }, []);

  return (
    <div className="Container">
      {img === null ? (
        <div className="flex flex-col justify-center items-center space-y-3">
          <Button type="text" icon={<SwapOutlined />} onClick={handleClick}>Trocar Câmera</Button>
          <Webcam
            className="rounded-full"
            audio={false}
            mirrored={true}
            height={400}
            width={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ ...videoConstraints, facingMode }}
          />
          <div className="pt-5 pb-5">
            <Button type="text" icon={<CameraOutlined />} onClick={capture}>Tirar foto</Button>
          </div>

        </div>
      ) : (
        <div className="flex flex-col justify-center items-center space-y-3">
          <Image
            src={img}
            height={400}
            width={400}
            alt="screenshot"
            className="rounded-full"
          />
          <Button type="text" icon={<CameraOutlined />} onClick={() => handleImagem(null)}>Tirar outra foto</Button>
        </div>
      )}
    </div>
  );
}
