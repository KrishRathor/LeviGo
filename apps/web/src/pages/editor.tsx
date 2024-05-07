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
import { CodeEditor } from "@/components/ui/Editor";
import { TerminalUI } from "@/components/ui/Terminal";
import { Browser } from "@/components/ui/Browser";
import { Button } from "@/components/ui/button"

 
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { project, repl } = context.query;

  return {
    props: {
      project: project,
      repl: repl,
    },
  };
};

interface EditorProps {
  project ?: string;
  repl?: string;
}

const Editor: React.FC<EditorProps> = (props) => {
  const { project, repl } = props;

  return (
    <div className="m-0 h-[92vh] w-screen p-0">
      <div className="h-[8vh] border-b flex items-center justify-between border-[#27272A] bg-[#09090B] text-white">
        <div className="text-3xl p-4" >
          LeviGo
        </div>
        <div className="flex justify-between" >
          <Button variant='outline' className="ml-2 bg-[#0E1525] text-white" >Run</Button>
          <Button variant='outline' className="ml-2 mr-4 bg-[#0E1525] text-white" >Invite</Button>
        </div>
      </div>
      <ResizablePanelGroup className="bg-[#09090B]" direction="horizontal">
        <ResizablePanel defaultSize={15}>
          <FileTree />
        </ResizablePanel>
        <ResizableHandle className="bg-[#27272A]" />
        <ResizablePanel>
          <CodeEditor />
        </ResizablePanel>
        <ResizableHandle className="bg-[#27272A]" />
        <ResizablePanel>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel>
              <Browser />
            </ResizablePanel>
            <ResizableHandle className="bg-[#27272A]" />
            <ResizablePanel>
              <TerminalUI />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Editor;
