import { FC } from "react";
import { ChatPromptIcon } from "./PromptCloseIcon";

interface Props {
  output: any;
  tone: any;
  writing: any;
  format: any;
  outputData: any[] | null;
  toneData: any[] | null;
  writingData: any[] | null;
  formatData: any[] | null;
  setPopupShow: () => void;
  setTone: (tone: any) => void;
  setOutput: (output: any) => void;
  setWriting: (writing: any) => void;
  setFormat: (writing: any) => void;
}

const Prompt: FC<Props> = ({
  outputData,
  toneData,
  writingData,
  formatData,
  output,
  tone,
  writing,
  format,
  setPopupShow,
  setTone,
  setOutput,
  setWriting,
  setFormat,
}) => {
  return (
    <div className="flex items-center justify-center flex-col sm:flex-row space-x-1 sm:gap-0 mx-auto mt-2">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 max-w-lg">
        <div className="flex justify-center">
          <select value={output} onChange={(e) => setOutput(e.target.value)} id="output" className="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {outputData?.map((data, index) => (
              <option value={data?.name} key={index}> { data?.name } </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center">
          <select value={tone} onChange={(e) => setTone(e.target.value)} id="tone" className="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {toneData?.map((data, index) => (
              <option value={data?.name} key={index}> { data?.name } </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center">
          <select value={writing} onChange={(e) => setWriting(e.target.value)} id="writing" className="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {writingData?.map((data, index) => (
              <option value={data?.name} key={index}> { data?.name } </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center">
          <select value={format} onChange={(e) => setFormat(e.target.value)} id="format" className="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {formatData?.map((data, index) => (
              <option value={data?.name} key={index}> { data?.name } </option>
            ))}
          </select>
        </div>
      </div>
      <div className="cursor-pointer flex items-center justify-center" onClick={setPopupShow}><ChatPromptIcon /></div>
    </div>
  );
}

export default Prompt;