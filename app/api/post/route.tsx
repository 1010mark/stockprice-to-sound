// @ts-nocheck
import { NextRequest } from "next/server"
import yahooFinance from 'yahoo-finance2';

export async function POST(request: NextRequest) {
  const body = await request.json()
  const queryOptions = { 
    period1: '2024-01-26'
   ,lang: "jp"
   ,interval:"1h"
  };
  const corsHeaders = {
    'Access-Control-Allow-Origin': process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://stockprice-to-sound.vercel.app/", // 許可するオリジン
    'Access-Control-Allow-Methods': 'POST', // 許可するメソッド
    'Access-Control-Allow-Headers': 'Content-Type', // 許可するリクエストヘッダー
  }
  const result = await yahooFinance.chart(`${body.stockcode}.T`, queryOptions);
  let res = new Response(JSON.stringify({ quotes: result.quotes.slice(-40) }), {
    status: 200,
    headers: corsHeaders
  });
  return res;
}