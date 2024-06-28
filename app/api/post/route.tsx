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
  const result = await yahooFinance.chart(`${body.stockcode}.T`, queryOptions);
  let res = new Response(JSON.stringify({ quotes: result.quotes.slice(-40) }));
  return res;
}