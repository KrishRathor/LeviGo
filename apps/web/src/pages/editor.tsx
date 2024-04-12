import { GetServerSideProps } from "next";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
// import { Tree } from "@geist-ui/react";
import { Tree } from "react-arborist";
import { FileTree } from "@/components/ui/FileTree";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username, repl } = context.query;

  return {
    props: {
      username: username,
      repl: repl,
    },
  };
};

interface EditorProps {
  username?: string;
  repl?: string;
}

const Editor: React.FC<EditorProps> = (props) => {
  const { username, repl } = props;

  return (
    <div className="m-0 h-[92vh] w-screen p-0">
      <div className="h-[8vh] border-b border-[#27272A] bg-[#09090B] text-white">
        hi there
      </div>
      <ResizablePanelGroup className="bg-[#09090B]" direction="horizontal">
        <ResizablePanel defaultSize={15} >
         <FileTree /> 
        </ResizablePanel>
        <ResizableHandle className="bg-[#27272A]" />
        <ResizablePanel>Two</ResizablePanel>
        <ResizableHandle className="bg-[#27272A]" />
        <ResizablePanel>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel>Two</ResizablePanel>
            <ResizableHandle className="bg-[#27272A]" />
            <ResizablePanel>Three</ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Editor;
