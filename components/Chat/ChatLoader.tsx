import { FC, useEffect, useState } from "react";

interface Props {}

export const ChatLoader: FC<Props> = () => {
  const [dots, setDots] = useState(".");

  const numDots = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= numDots) {
          return ".";
        } else {
          return prevDots + ".";
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, [numDots]);

  return (
    <div
      className={`flex justify-center py-[30px] whitespace-pre-wrap`}
      style={{ overflowWrap: "anywhere" }}
    >
      <div className="w-full px-4 flex">
        <div className="mr-4 font-bold min-w-[40px]">AI:</div>
        {/* <IconDots className="animate-pulse" /> */}
        {dots}
      </div>
    </div>
  );
};
