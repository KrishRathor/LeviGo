import { showFrame } from "@/atoms/EditorPage/showFrame";
import { api } from "@/utils/api";
import React, { useState } from "react";
import Terminal, { ColorMode, TerminalInput, TerminalOutput } from 'react-terminal-ui';
import { useSetRecoilState } from "recoil";

export const TerminalUI: React.FC = () => {

    const setShowFrame = useSetRecoilState(showFrame);

    const exec = api.code.executeCommand.useMutation({
        onSuccess: data => {
            console.log(data);
            data ? setData(prev => [...prev, <TerminalOutput>{data?.output}</TerminalOutput>])
            : setData(prev => [...prev, <TerminalOutput>Error</TerminalOutput>])

        }
    })

    const [data, setData] = useState<React.ReactElement[]>([
        <TerminalOutput>Welcome to LeviGo Terminal!</TerminalOutput>
    ])

    const handleInput = async (data: string) => {
        console.log(data);
        if (data === 'clear') {
            setData([<TerminalOutput>Welcome to LeviGo Terminal!</TerminalOutput>]);
            return;
        }
        if (data === 'npm run dev') {
            setShowFrame(true);
        }
        await exec.mutate({command: data});
        const input: React.ReactElement = <TerminalInput>{data}</TerminalInput>
        // const output: React.ReactElement = <TerminalOutput>output coming soon...</TerminalOutput>
        setData(prev => [...prev, input]);
    }

    return (
        <div>
            <Terminal colorMode={ColorMode.Dark} name="LeviGo Terminal" height="100vh" onInput={handleInput} >
                { data }
            </Terminal>
        </div>
    )
}