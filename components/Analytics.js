
export default function Analytics({ totalNFTsSupply, totalClaimedSupply, totalUnClaimedSupply }) {
  const supplyArray = [
    {title: 'Total NFTs', count: totalNFTsSupply},
    {title: 'Claimed NFTs', count: totalClaimedSupply},
    {title: 'UnClaimed NFTs', count: totalUnClaimedSupply},
  ];
  return (
    <>
      <div className="my-11">
        <div className="text-center mb-5">
          <h1 className="text-4xl lg:text-4xl md:text-2xl font-bold text-slate-300">NFTs Analytics</h1>
        </div>
        <div className="grid grid-cols-3 gap-11 lg:gap-7 md:grid-cols-2 sm:grid-cols-1">
        {supplyArray && supplyArray.map((val,ind) => (
          <div key={ind} className="border border-slate-700 rounded-md bg-black/30 shadow-lg shadow-black/30 grid items-center justify-items-center py-11 xl:py-7 md:py-5">
            <p className="text-2xl lg:text-xl text-slate-300 font-bold">{val.title}</p>
            <p className="text-2xl lg:text-xl text-slate-300 font-bold mt-1">{val.count}</p>
          </div>
        ))}
        </div>
      </div>
    </>
  );
};