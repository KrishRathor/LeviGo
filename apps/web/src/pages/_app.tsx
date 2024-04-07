import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`font-sans ${inter.variable}`}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
      <ToastContainer />
    </main>
  );
};

export default api.withTRPC(MyApp);
