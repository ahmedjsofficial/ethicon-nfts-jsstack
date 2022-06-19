import { useAddress } from "@thirdweb-dev/react";
import Head from "next/head";
import Connect from "../components/Connect";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Index() {
  const address = useAddress();
  return (
    <>
      <Head>
        <title>Mint Ethicon - JSSTACK</title>
        <link rel="favicon" href="./favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar/>
      {!address ? <Connect/> : <Dashboard/>}
      <Footer/>
    </>
  );
};