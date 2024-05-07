import { api } from "@/utils/api";
import { defaultHead } from "next/head";
import React from "react";

const Demo: React.FC = () => {

  const get = api.code.getBoilerPlateCodeInRepl.useMutation({
    onSuccess: data => {
      console.log(data);
    }
  })

  const handleclick = () => {
    get.mutateAsync({
      projectName: "hi",
      repl: "NodeJs"
    })
  }

  return (
    <div>
      <button onClick={handleclick} >Click</button>
    </div>
  )
}

export default Demo; 
