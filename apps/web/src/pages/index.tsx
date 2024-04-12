import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      router.push('/home');    
    }
  })

  return (
    <div>
      hello 
    </div>
  );
}
