import { useEffect, useState } from "react";
import { useMetamask, useAddress, useDisconnect } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import { ethers } from "ethers";

export default function Navbar() {
  const [popupState, setPopupState] = useState(false);
  const [balanceState, setBalanceState] = useState("");
  const [networkState, setNetworkState] = useState("");
  const connectMetaMask = useMetamask();
  const address = useAddress();
  const disconnectToWallet = useDisconnect();
  
  const onTriggerPopup = () => setPopupState(!popupState);

  useEffect(() => {
    const handleBalance = async () => {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      // console.log(provider)
      const accounts = await provider.send('eth_requestAccounts', []);
      // console.log(accounts)
      const balance = await provider.getBalance(accounts[0]);
      // console.log(balance)
      const network = await provider._network.name;
      setBalanceState(ethers.utils.formatEther(balance));
      setNetworkState(network);
    }
    handleBalance();
  },[])

  // console.log(balanceState)
  // console.log(networkState)

  const handleDisconnect = () => {
    disconnectToWallet();
    onTriggerPopup();
  }

  return (
    <>
      <header className="border border-l-0 border-r-0 bg-[#1B2129] border-white/10 h-[9vh] flex items-center justify-center fixed top-0 left-0 right-0 opacity-100 z-[2000]">
        <nav className="flex items-center justify-between w-10/12  lg:w-11/12 m-auto">
            <Link href={`/`} passHref><a className="flex items-center"><Image src={`https://raw.githubusercontent.com/thirdweb-dev/typescript-sdk/main/logo.svg`} alt='thirdweb/logo' width={45} height={43} priority decoding="async" objectFit="contain" /> <span className="text-2xl text-slate-300 font-bold ml-2">NFTs</span></a></Link>

            {!address ? (
              <ul className="flex items-center">
                <button type="button" className="text-lg text-blue-500 ring-2 ring-blue-600 rounded-lg px-5 py-1.5 hover:bg-blue-600 hover:text-slate-300 transition-all active:scale-90 shadow-lg hover:shadow-blue-600 md:text-sm md:px-4 md:py-1" onClick={connectMetaMask}>Connect Wallet</button>
              </ul>
            ) : (
              <ul className="group relative">
                <div className="border border-slate-600 bg-black/50 cursor-pointer flex items-center justify-between px-3 gap-3 py-1 rounded-md hover:border-blue-500 group-hover:bg-slate-900 xsm:gap-2 transition-all" onClick={onTriggerPopup}>
                  <div className="flex items-center "><Image src={`https://ethereum.org/static/a183661dd70e0e5c70689a0ec95ef0ba/81d9f/eth-diamond-purple.webp`} alt='img/eth' width={15} height={25} objectFit='contain' /></div>
                  <div className="grid items-center">
                    <p className="text-xs leading-tight text-gray-400 group-hover:text-slate-300">{balanceState?.substring(0, 6)} <span className="capitalize">{networkState}</span>Eth</p>
                    <p className="text-xs leading-tight text-gray-400 group-hover:text-slate-300">{address?.substring(0,4)}...{address?.substring(address.length - 4)} <span className="capitalize">{networkState}</span></p>
                  </div>
                  <div className="flex items-center"><Image src={`https://thirdweb.com/_next/static/media/metamask-fox.a725b9ae.svg`} alt='img/eth' width={23} height={23} objectFit='contain' /></div>
                </div>
              </ul>
            )}
        </nav>
      </header>


      {address && <div>
        <div className={`border border-gray-600 bg-[#1B2129] px-2.5 py-2 flex items-start justify-center flex-col w-[13rem] rounded-md absolute top-[8vh] right-[7.5rem] lg:right-[2.5rem] md:right-[1.3rem] opacity-100 z-[2000] transition-all ${popupState ? 'onpopupshow' : 'onpopupnotshow'}`}>
          <div className="text-sm font-bold flex items-center text-slate-300">Personal Wallet <span className="ml-1 bg-lime-300 text-black text-xs px-1 py-0.5 rounded animate-pulse">Connected</span></div>
          <div className="text-slate-400 text-sm">Copy Wallet Address</div>
          <div className="text-sm text-slate-300 border border-gray-500 px-2 py-0.5 rounded w-full">Network: Rinkeby Eth</div>
          <button type="button" className="text-sm w-full py-1 bg-gradient-to-br from-pink-600 to-violet-600 rounded-md shadow-md shadow-rose-600 active:scale-90 my-2" onClick={handleDisconnect}>Disconnect</button>
        </div>
      </div>}
    </>
  );
};