import React from "react";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentTab } from "@/atoms/EditorPage/currentTab";
import { openTabs } from "@/atoms/EditorPage/openTabs";

export const Tabs: React.FC = () => {

    const openTabsValue = useRecoilValue(openTabs);

  return (
    <div>
      <div className="scrolling-hide flex min-h-[4vh] rounded-sm text-white">
        {
            openTabsValue.map(tab => {
                if (tab.length > 1) {
                    return (
                        <SingleTab name={tab} />
                    )
                }
            })
        }
      </div>
      <div>
        <hr className="m-0 h-[1px] border-none bg-[#27272A]" />
      </div>
    </div>
  );
};

interface ISingleTab {
  name: string;
}

const SingleTab: React.FC<ISingleTab> = (props) => {
  const { name } = props;

  const getLogo = (name: string): React.ReactElement | null => {
    const lastDotIndex = name.lastIndexOf(".");
    if (lastDotIndex === -1) {
      return null;
    }
    const extensionName = name.substring(lastDotIndex + 1); // Asserting type safety
    if (Object.keys(logos).includes(extensionName)) {
      //@ts-ignore
      return logos[extensionName];
    }
    return <Image src={"/filelogo.jpeg"} alt="file" width={30} height={30} />;
  };

  const [currentTabValue, setCurrentTab] = useRecoilState(currentTab);
  const [_openTabsValue, setOpenTabs] = useRecoilState(openTabs);

  return (
    <div
      onClick={() => {
        setCurrentTab((_prev) => name);
      }}
      className={`flex h-fit min-w-[10vw] cursor-pointer items-center justify-between rounded-sm border-l-[0.5px] border-r-[0.5px] border-l-[#27272A] border-r-[#27272A] p-2 hover:bg-[#27272A] ${currentTabValue === name ? "bg-[#27272A]" : ""} `}
    >
      <div className="flex items-center">
        <div>{getLogo(name)}</div>
        <div className="ml-2">{name}</div>
      </div>
      <div onClick={() => {
        setOpenTabs(prev => prev.filter(p => p !== name));
      }} >
        <CloseIcon className="rounded-full text-sm hover:bg-[#09090B]" />
      </div>
    </div>
  );
};

const logos: { [key: string]: React.ReactElement } = {
  js: (
    <Image
      className="rounded-full"
      alt="js"
      src={"/jslogo.webp"}
      width={20}
      height={10}
    />
  ),
  html: (
    <Image
      className="rounded-full"
      alt="html"
      src={"/htmllogo.png"}
      width={20}
      height={10}
    />
  ),
  folder: (
    <Image
      className="rounded-full"
      alt="folder"
      src={"/folderlogo.png"}
      width={20}
      height={10}
    />
  ),
  css: (
    <Image
      className="rounded-full"
      alt="css"
      src={"/csslogo.png"}
      width={20}
      height={10}
    />
  ),
  ts: (
    <Image
      className="rounded-full"
      alt="ts"
      src={"/tslogo.png"}
      width={20}
      height={10}
    />
  ),
  tsx: (
    <Image
      className="rounded-full"
      alt="tsx"
      src={"/tsxlogo.png"}
      width={20}
      height={10}
    />
  ),
  jsx: (
    <Image
      className="rounded-full"
      alt="jsx"
      src={"/jsxlogo.png"}
      width={20}
      height={10}
    />
  ),
};
