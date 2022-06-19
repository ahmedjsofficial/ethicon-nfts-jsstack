import { useEffect, useState } from "react";
import { useAddress, useNFTDrop } from "@thirdweb-dev/react";
import Link from 'next/link';
import ReactLoading from 'react-loading';
import toast, { Toaster } from 'react-hot-toast';
import Analytics from "./Analytics";
import Hero from "./Hero";
import MintNFTs from "./MintNFTs";

export default function Dashboard() {
  const [allNFTs, setAllNFTs] = useState([]);
  const [nftsPrice, setNFTsPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalNFTsSupply, setTotalNFTSupply] = useState(0);
  const [totalClaimedSupply, setTotalClaimedSupply] = useState(0);
  const [totalUnClaimedSupply, setTotalUnClaimedSupply] = useState(0);

  const address = useAddress();
  const nftdrop = useNFTDrop("0xA14d91F3e840476483Ae9bBddC3F63BBD700826b");

  useEffect(() => {
    if(!nftdrop || !address) return;
    const fetchNFTsMetaData = async () => {
      setLoading(true);

      const getNFTs = await nftdrop.getAllUnclaimed();
      const price = await nftdrop.claimConditions.getAll();

      const totalSupply = await nftdrop.totalSupply();
      const clmsupply = await nftdrop.totalClaimedSupply();
      const unclmsupply = await nftdrop.totalUnclaimedSupply();
      
      setAllNFTs(getNFTs);
      setNFTsPrice(price?.[0].currencyMetadata);

      setTotalNFTSupply(totalSupply.toNumber());
      setTotalClaimedSupply(clmsupply.toNumber());
      setTotalUnClaimedSupply(unclmsupply.toNumber());

      setLoading(false);
    }
    fetchNFTsMetaData();
  },[nftdrop])


  const OnMintingNFTs = () => {
    if(!nftdrop || !address) return;
    const quantity = 1; // how much you wants to mint!

    const notification = toast.loading('Minting the NFT...', {
      style: {
        background: 'white',
        color: 'green',
        fontWeight: 'bold',
        fontSize: '16px',
        padding: '0.7rem 1rem'
      }
    })

    nftdrop.claimTo(address, quantity).then(async (tx) => {
      const receipt = tx[0].receipt;
      const claimedNFT = tx[0].id;
      const NFTData = await tx[0].data();

      toast((t) => ( <>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="#06cf3c"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
          </div>
          <div className="text-center">
            <h1>NFT Minted Successfully!</h1>
            <Link href={`https://testnets.opensea.io/collection/100-ethicon-v2`}><a target={`_blank`} className="text-blue-500 underline">View On Opensea</a></Link>
          </div>
          <button type="button" className="active:scale-90 transition-all" onClick={() => toast.dismiss(t.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="#f23023"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
          </button>
        </div>
      </>), { duration: 15000 });

      console.log(receipt)
      console.log(claimedNFT)
      console.log(NFTData)
    }).catch((error) => {
      console.log(`NFT Could NOt Minted: ${error.message}`);
      toast('NFT not Minted. Check the Consol', {
        style: {
          background: '#f23023',
          color: '#fff',
          fontSize: '16px',
          padding: '0.75rem 1rem',
          fontWeight: 'bold'
        }
      })
    }).finally(() => {
      toast.dismiss(notification);
    })
  }

  return (
    <>
      <main className="h-screen overflow-y-scroll scroll-style">
        <div className="w-10/12 lg:w-11/12 mr-auto ml-auto mt-[13vh]">
            <Toaster position="top-center" reverseOrder={loading} />
            <Hero/>
            <Analytics totalNFTsSupply={totalNFTsSupply} totalClaimedSupply={totalClaimedSupply} totalUnClaimedSupply={totalUnClaimedSupply} />
            {loading ? <div className="h-[45vh] flex items-center justify-center scroll-smooth">
              <ReactLoading type={'spinningBubbles'} color={'#ccc'} width={65} height={65} className='flex items-center' />
            </div> : <MintNFTs allNFTs={allNFTs} nftsPrice={nftsPrice} OnMintingNFTs={OnMintingNFTs} />}
        </div>
      </main>
    </>
  );
};