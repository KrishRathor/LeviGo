import { useState } from 'react';
import Terminal, { ColorMode, TerminalInput, TerminalOutput } from 'react-terminal-ui';

export default function Demo() {
 
    const [data, setData] = useState([
        <TerminalOutput>Welcome to the React Terminal UI!</TerminalOutput>,
    ])

  return (
    <div>
      Terminal
      <Terminal name='LeviGo Terminal' colorMode={ColorMode.Dark} onInput={data => console.log(data)} >
        { data }
        <TerminalInput>hi hte</TerminalInput>
        <TerminalOutput>hi hte</TerminalOutput>
      </Terminal>
    </div>
  );
}
