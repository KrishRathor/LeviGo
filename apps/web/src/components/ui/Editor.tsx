import React from "react";
import { Tabs } from "./Tabs";
import { Editor } from "@monaco-editor/react";
import { useRecoilValue } from "recoil";
import { currentTab } from "@/atoms/EditorPage/currentTab";

export const CodeEditor: React.FC = () => {
  const currentTabValue = useRecoilValue(currentTab);   

  return (
    <div>
      <div className="m-2 text-white">
        <Tabs />
      </div>
      <div>
        {currentTabValue && (
          <Editor
            height={"80vh"}
            defaultLanguage="javascript"
            theme="vs-dark"
            width={"95%"}
            className="ml-6"
          />
        )}
      </div>
    </div>
  );
};
