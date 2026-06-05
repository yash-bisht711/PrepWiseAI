import {
  useRef,
  useState,
  useEffect,
} from "react";

import Webcam from "react-webcam";
import { motion } from "framer-motion";

const VideoRecorder = ({
  onRecordingComplete,
}) => {

  const webcamRef =
    useRef(null);

  const mediaRecorderRef =
    useRef(null);

  const recordedChunksRef =
    useRef([]);

  const secondsRef =
    useRef(0);

  const [recording,
  setRecording] =
    useState(false);

  const [seconds,
  setSeconds] =
    useState(0);

  useEffect(() => {
    secondsRef.current =
      seconds;
  }, [seconds]);

  useEffect(() => {

    let interval;

    if (recording) {

      interval =
      setInterval(() => {

        setSeconds(
          prev => prev + 1
        );

      }, 1000);

    }

    return () =>
      clearInterval(interval);

  }, [recording]);

  const startRecording =
  () => {

    setSeconds(0);
    recordedChunksRef.current = [];

    const stream =
      webcamRef.current?.video
      ?.srcObject;

    if (!stream) {
      return;
    }

    const recorder =
      new MediaRecorder(
        stream
      );

    mediaRecorderRef.current =
      recorder;

    recorder.ondataavailable =
      (event) => {

        if (
          event.data.size > 0
        ) {

          recordedChunksRef.current = [
            ...recordedChunksRef.current,
            event.data,
          ];

        }

      };

    recorder.onstop = () => {
      if (
        recordedChunksRef.current.length === 0
      ) {
        return;
      }

      const blob =
        new Blob(
          recordedChunksRef.current,
          {
            type:
            "video/webm",
          }
        );

      onRecordingComplete({
        blob,
        duration:
          secondsRef.current,
      });

      recordedChunksRef.current = [];
    };

    recorder.start();

    setRecording(true);

  };

  const stopRecording =
  () => {

    mediaRecorderRef.current?.stop();

    setRecording(false);

  };

  return (
    <div>

      <Webcam
        ref={webcamRef}
        audio={true}
        className="
        w-full
        rounded-2xl
        border
        border-white/15
        shadow-[0_18px_50px_rgba(0,0,0,0.25)]
        "
      />

      <div
      className="
      mt-4
      flex
      flex-wrap
      gap-4
      "
      >

        <motion.button
          whileHover={{
            scale: recording ? 1 : 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={
            startRecording
          }
          disabled={
            recording
          }
          className="
          bg-emerald-500/20
          border
          border-emerald-300/30
          disabled:opacity-50
          text-white
          px-5
          py-3
          rounded-xl
          font-semibold
          "
        >
          Start Answer
        </motion.button>

        <motion.button
          whileHover={{
            scale: !recording ? 1 : 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={
            stopRecording
          }
          disabled={
            !recording
          }
          className="
          bg-red-500/20
          border
          border-red-300/30
          disabled:opacity-50
          text-white
          px-5
          py-3
          rounded-xl
          font-semibold
          "
        >
          Stop Answer
        </motion.button>

      </div>

      <div
      className="
      mt-4
      inline-flex
      px-4
      py-2
      rounded-xl
      bg-white/10
      border
      border-white/15
      text-lg
      font-semibold
      "
      >
        Timer:{" "}
        {seconds}s
      </div>

    </div>
  );
};

export default
VideoRecorder;
