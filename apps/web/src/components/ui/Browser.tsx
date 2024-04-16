import React, { useState } from "react";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import CachedIcon from '@mui/icons-material/Cached';
import { Input } from "@/components/ui/input"
import { useRecoilValue } from "recoil";
import { showFrame } from "@/atoms/EditorPage/showFrame";

export const Browser: React.FC = () => {

  const [frameKey, setFrameKey] = useState<boolean>(false);
  const frame = useRecoilValue(showFrame);

  return (
    <div className="text-white">
      <div>
        <div
          className={`flex h-fit max-w-[10vw] cursor-pointer items-center justify-between rounded-sm border-l-[0.5px] border-r-[0.5px] border-l-[#27272A] border-r-[#27272A] bg-[#27272A] p-2 hover:bg-[#09090B]`}
        >
          WebView
        </div>
        <hr className="h-[1px] border-none bg-[#27272A]" />
        <div className="items-center flex h-[40px]">
          <div className="flex items-center" >
            <WestIcon className="ml-2 p-1 cursor-pointer" />
            <EastIcon className="ml-2 p-1 cursor-pointer " />
            <div onClick={() => setFrameKey(prev => !prev)} >
              <CachedIcon className="ml-3 p-1 cursor-pointer" />
            </div>
            <Input className="ml-5 h-[25px] w-[30vw] text-green" placeholder="/" />
          </div>
        </div>
        <hr className="h-[1px] border-none bg-[#27272A]" />
        <div className="h-[100vh]" >
            { !frame && <iframe key={frameKey} src="http://localhost:2000/" className="w-[100%] h-[60%]" frameborder="0"></iframe>}
        </div>
      </div>
    </div>
  );
};
