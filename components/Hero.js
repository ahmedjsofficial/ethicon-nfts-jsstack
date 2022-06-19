import Image from "next/image";

export default function Hero() {
  const viewOnOpensea = () => {
    const URl = `https://testnets.opensea.io/collection/100-ethicon-v2`;
    window.open(URl, '_blank');
  }
  return (
    <>
      <div className="h-[55vh] grid items-center justify-items-center bg-black border border-slate-700 relative rounded-md">
        <div className="grid items-center justify-items-center text-center opacity-100 z-[1700]">
            <h1 className="text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-bold text-slate-300">Much Anticipated Mystery</h1>
            <h1 className="text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-bold text-slate-300">NFT Collection is live now!</h1>
            <p className="my-5 text-slate-400 text-sm sm:text-xs w-[50vw] lg:w-11/12">I Design Your Dreams. I believe you have a unique taste, discover
            the possibilities of the NFT World. Mint Your NFTs on the top of
            Ethereum Blockchain. Your dreams is my first priority. So,
            let&apos;s enjoy this incredible NFTs World.</p>
            <button type="button" onClick={viewOnOpensea} className="text-base sm:text-sm px-7 py-2 bg-gradient-to-br from-pink-600 to-violet-600 rounded-md shadow-lg shadow-rose-600 active:scale-90 hover:translate-y-2 transition-all">View Collection</button>
        </div>
        <div className="h-[54vh] absolute top-1 right-0 rounded-md overflow-hidden opacity-100 z-[1500]">
            <Image src={`https://img.seadn.io/files/4b5e1469b134d0c6cc20a113e34b2c65.jpg?fit=max&auto=format`} alt='hero/ethiconimg' decoding="async" priority width={400} height={450} objectFit='fill' />
        </div>
      </div>
    </>
  );
}
