import React, { useCallback, useContext, useRef, useState } from "react";
import Webcam from "react-webcam";
import { ClienteContext } from "contexts/ClienteContext";
import Image from "next/image";
import { CameraOutlined } from '@ant-design/icons';
import { Button } from "antd";

export default function WebcamComp() {
  const { img, handleImagem } = useContext(ClienteContext);

  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      handleImagem(imageSrc);
    }
  }, [webcamRef,handleImagem]);

  return (
    <div className="Container">
      {img === null ? (
        <>
          <Webcam
            className="rounded-full"
            audio={false}
            mirrored={true}
            height={400}
            width={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <div className="pt-5 pb-5">
          <Button type="text" icon={<CameraOutlined />} onClick={capture}>Tirar foto</Button>
          </div>
         
        </>
      ) : (
        <>
          <Image
            src={img}
            height={400}
            width={400}
            alt="screenshot"
            className="rounded-full mx-5"
          />
          <div className="pt-5">
          <Button type="text" icon={<CameraOutlined />}  onClick={() => handleImagem(null)}>Tirar outra foto</Button>
          </div>
        </>
      )}
    </div>
  );
}
