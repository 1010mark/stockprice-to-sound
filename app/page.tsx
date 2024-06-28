"use client"
import { useState } from "react";
import dynamic from "next/dynamic";
const CanvasComponent = dynamic(() => import("./canvas"), {ssr:false});


export default function Home() {
  const [stockcode, setStockCode] = useState("9468");
  const [stockprice, setStockPrice] = useState([{open:440, close:220}, {open:220, close:660}]);
  async function getStockPrice(){
    try{
      const res = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({stockcode})
      });
      const data = await res.json();
      console.log(data);
      setStockPrice(data.quotes);
    } catch (e) {
      console.error(e);
      setStockCode("存在しないシンボルです");
    }
  } 
  return (
    <div className="text-center">
      <p>株価 to sound</p>
      <div className="mx-auto flex justify-center">
        <input value={stockcode} onChange={(e) => setStockCode(e.target.value)} type="text" placeholder="シンボル" className="w-16 mx-2 border p-2"></input>
        <div onClick={getStockPrice} className="w-28 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          取得
        </div>
      </div>

      <main className="m-0 flex justify-center">
        <div>
          <CanvasComponent stockprice={stockprice} stockcode={stockcode} />
        </div>
      </main>

      <small className="text-gray-400 text-xs">{JSON.stringify(stockprice)}</small>

    </div>

  );
}
