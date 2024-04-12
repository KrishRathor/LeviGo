import React from "react";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentTab } from "@/atoms/EditorPage/currentTab";
import { openTabs } from "@/atoms/EditorPage/openTabs";
import { fileTree } from "@/atoms/EditorPage/fileTree";

export const Tabs: React.FC = () => {
  const openTabsValue = useRecoilValue(openTabs);

  return (
    <div>
      <div className="scrolling-hide flex min-h-[4vh] rounded-sm text-white">
        {openTabsValue.map((tab) => {
          if (tab.length > 1) {
            return <SingleTab name={tab} />;
          }
        })}
      </div>
      <div>
        <hr className="m-0 h-[1px] border-none bg-[#27272A]" />
      </div>
      <div>
        <BreadCrumb />
      </div>
    </div>
  );
};

interface ISingleTab {
  name: string;
}

interface IChildren {
  name: string;
  type: "file" | "folder";
  children?: IChildren[];
}

const BreadCrumb: React.FC = () => {
  const currentTabValue = useRecoilValue(currentTab);
  const files = useRecoilValue(fileTree);

  const findParentStructure = (
    tree: IChildren[],
    fileName: string,
    parentStructure = ["apps"],
    allPaths = [],
  ) => {
    for (const item of tree) {
      if (item.name === fileName) {
        //@ts-ignore
        allPaths.push([...parentStructure, item.name]); // Store the path
      }
      if (item.type === "folder") {
        const parent = [...parentStructure, item.name];
        //@ts-ignore
        findParentStructure(item.children, fileName, parent, allPaths);
      }
    }
    return allPaths.length > 0 ? allPaths : null; // Return all paths if found, null otherwise
  };

  //@ts-ignore
  const paths = findParentStructure(files, currentTabValue);
  console.log(paths);

  return (
    <div className="mt-2" >
      <div className="flex justify-start">
        
        {
            //@ts-ignore
        paths && typeof paths[0] !== undefined && paths[0].map((path) => {
          console.log(path);
          return (
            <div className="flex">
              <div className="m-1 ml-4 hover:underline hover:text-gray-300 hover:cursor-pointer ">{path}</div>
              <div className="ml-4 flex items-center">&gt;</div>
            </div>
          );
        })}
      </div>
      <div>
        <hr className="border-none h-[1px] mt-2 bg-[#27272A]" />
      </div>
    </div>
  );
};

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
      <div
        onClick={() => {
          setOpenTabs((prev) => prev.filter((p) => p !== name));
        }}
      >
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
