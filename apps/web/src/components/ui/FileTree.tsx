import React, { useState } from "react";
import Image from "next/image";
import { isValid } from "zod";
import { useSetRecoilState } from "recoil";
import { fileClicked } from "@/atoms/EditorPage/fileClicked";
import { openTabs } from "@/atoms/EditorPage/openTabs";
import { currentTab } from "@/atoms/EditorPage/currentTab";

export const FileTree: React.FC = () => {
  const [files, setFiles] = useState<IChildren[]>([
    {
      name: "index.html",
      type: "file",
    },
    {
      name: "index.js",
      type: "file",
    },
    {
      name: "index.css",
      type: "file",
    },
    {
      name: "components",
      type: "folder",
      children: [
        {
          name: "login.js",
          type: "file",
        },
        {
          name: "signup.js",
          type: "file",
        },
        {
          name: "ui",
          type: "folder",
          children: [
            {
              name: "button.js",
              type: "file",
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div className="mt-4">
      <Folder name="apps" children={files} />
    </div>
  );
};

const Folder: React.FC<FolderInterFace> = (props) => {
  const { name, children } = props;

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="m-1 flex h-[3vh] cursor-pointer items-center justify-between rounded-sm p-2 text-white hover:bg-[#27272A]"
      >
        <div className="flex items-center">
          <div>{logos.folder}</div>
          <div className="ml-2">{name}</div>
        </div>
        <div>
          <div className="text-2xl"> {open ? "-" : "+"} </div>
        </div>
      </div>
      <div
        className={`transition-max-height ml-4 overflow-hidden duration-300 ease-out ${open ? "max-h-[1000px]" : "max-h-0"}`}
      >
        {open &&
          children?.map((child) => {
            if (child.type === "folder") {
              return <Folder name={child.name} children={child.children} />;
            } else if (child.type === "file") {
              return <File name={child.name} />;
            }
          })}
      </div>
    </div>
  );
};

const File: React.FC<FileInterface> = (props) => {
  const { name } = props;
  const setFileClicked = useSetRecoilState(fileClicked);
  const setOpenTabs = useSetRecoilState(openTabs);
  const setCurrentTab = useSetRecoilState(currentTab);

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

  return (
    <div
      onClick={() => {
        console.log(name, " was clicked!");
        setFileClicked((_prev) => name);
        setOpenTabs((prev) => [...prev, name]);
        setCurrentTab((_prev) => name);
      }}
      className="m-1 flex h-[3vh] w-full cursor-pointer items-center rounded-sm p-2 text-white hover:bg-[#27272A]"
    >
      <div className="flex items-center">
        <div>{getLogo(name)}</div>
        <div className="ml-2">{name}</div>
      </div>
      <div></div>
    </div>
  );
};

interface FileInterface {
  name: string;
}

interface IChildren {
  name: string;
  type: "file" | "folder";
  children?: IChildren[];
}

interface FolderInterFace {
  name: string;
  children?: IChildren[];
}

const logos: { [key: string]: React.ReactElement } = {
  js: (
    <Image
      className="rounded-full"
      alt="js"
      src={"/jslogo.webp"}
      width={30}
      height={20}
    />
  ),
  html: (
    <Image
      className="rounded-full"
      alt="html"
      src={"/htmllogo.png"}
      width={30}
      height={20}
    />
  ),
  folder: (
    <Image
      className="rounded-full"
      alt="folder"
      src={"/folderlogo.png"}
      width={30}
      height={20}
    />
  ),
  css: (
    <Image
      className="rounded-full"
      alt="css"
      src={"/csslogo.png"}
      width={30}
      height={20}
    />
  ),
  ts: (
    <Image
      className="rounded-full"
      alt="ts"
      src={"/tslogo.png"}
      width={30}
      height={20}
    />
  ),
  tsx: (
    <Image
      className="rounded-full"
      alt="tsx"
      src={"/tsxlogo.png"}
      width={30}
      height={20}
    />
  ),
  jsx: (
    <Image
      className="rounded-full"
      alt="jsx"
      src={"/jsxlogo.png"}
      width={30}
      height={20}
    />
  ),
};
