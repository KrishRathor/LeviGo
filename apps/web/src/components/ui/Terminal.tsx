import React, { useState } from "react";
import Terminal, { ColorMode, TerminalInput, TerminalOutput } from 'react-terminal-ui';

export const TerminalUI: React.FC = () => {

    const [data, setData] = useState<React.ReactElement[]>([
        <TerminalOutput>Welcome to LeviGo Terminal!</TerminalOutput>
    ])

    const handleInput = (data: string) => {
        console.log(data);
        const input: React.ReactElement = <TerminalInput>{data}</TerminalInput>
        const output: React.ReactElement = <TerminalOutput>output coming soon...</TerminalOutput>
        setData(prev => [...prev, input, output]);
    }

    return (
        <div>
            <Terminal colorMode={ColorMode.Dark} name="LeviGo Terminal" onInput={handleInput} >
                { data }
            </Terminal>
        </div>
    )
}