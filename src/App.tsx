import React, { RefObject, useEffect, useRef, useState } from "react";
import { AspectRatio, Flex, Image, Spinner } from "@chakra-ui/react";
import HeaderBar from "./components/HeaderBar";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-wasm";
import { draw } from "./utils/draw";

export const App = () => {
  const imgRef: any = useRef(null);
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);
  const [update, setUpdate] = useState<any>(null);
  const [style, setStyle] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    console.log("EFFECT");
    setStyle({
      //border: "3px solid black",
      position: "absolute",
    });
  }, [update]);

  console.log(imgRef.current);

  const coco = async () => {
    setIsLoading(true);
    await tf.ready();
    console.log("COCO");
    const net = await cocossd.load();
    await detect(net);
  };

  const detect = async (net: cocossd.ObjectDetection) => {
    const obj = await net.detect(imgRef.current);
    setIsLoading(false);

    //ovdje draw
    canvasRef.current!.width = imgRef.current.width;
    canvasRef.current!.height = imgRef.current.height;
    const ctx = canvasRef!.current!.getContext("2d");
    draw(ctx, obj);
    console.log(obj);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (file) {
      const reader = new FileReader();
      const { current } = imgRef;

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        current.src = e.target?.result;
        setUpdate(file);
        coco();
      };
    }
  };
  return (
    <Flex h="60vh" flexDir="column">
      <HeaderBar imageUpload={handleUpload} />
      <Flex
        flex={1}
        flexDir="row"
        alignContent="center"
        justifyContent="center"
      >
        <Image ref={imgRef} maxW="1000px" minW="1000px" />
        {isLoading ? (
          <Spinner
            size="xl"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#628ea8"
            style={{ position: "absolute", top: "50%" }}
          />
        ) : (
          <canvas style={style} ref={canvasRef}></canvas>
        )}
      </Flex>
    </Flex>
  );
};
