import { api } from "@/utils/api";
import { useState } from "react";

export default function Demo() {
    
    const [command, setCommand] = useState<string>('');
    const [output, setOutput] = useState<string>('');

  const spawn = api.code.spawnContainer.useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const exec = api.code.executeCommand.useMutation({
    onSuccess: data => {
        console.log(data);
        if (data?.code === 200) {
            setOutput(data.output);
        }
    }
  })


  return (
    <div>
      <button onClick={async () => await spawn.mutate()}> click</button>
      <input
        type="text"
        name=""
        id=""
        placeholder="Enter command"
        onChange={(e) => setCommand((_prev) => e.target.value)}
      />
      <button onClick={async () => {
        await exec.mutate({command})
      }} >Execute</button>
      <div>
        {output}
      </div>
    </div>
  );
}
