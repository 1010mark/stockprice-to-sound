import "././globals.js";
import "p5/lib/addons/p5.sound";
import React, { useEffect } from "react"
import p5 from 'p5'
let i = 0;
let osc : p5.Oscillator;
let o = [{open:440, high:550, low:210 ,close:220}, {open:220,high:680,low:210, close:660}];

const sketch = (p: p5) => {
    //console.log(props.stockprice);
    console.log(o)
    p.setup = () => {
        osc = new p5.Oscillator('sine')
        osc.start();
        p.createCanvas(
            p.windowWidth * 0.8,
            280
        )
        p.background(255, 255, 255);
    }
    p.windowResized = () => {
        p.resizeCanvas(
            p.windowWidth * 0.8,
            280
        )
    }
    p.draw = () => {
        p.background(255);
        p.fill("#ffffff");
        p.rect(20, 20, p.windowWidth * 0.8 - 40, 240)
        let bpm = 240;
        let measures = 4;
        let musictimemillis = (60 / bpm) * measures * 4 * 1000;
        let ratio = (p.millis() % musictimemillis) / musictimemillis;
        let x = 20 * (1 - ratio) + (p.windowWidth * 0.8 - 20) * ratio;
        let minPrice = Math.min(...o.map(item => item.open), ...o.map(item => item.close))
        let maxPrice = Math.max(...o.map(item => item.open), ...o.map(item => item.close))
        let amountofbar = o.length;
        let barwidth = (p.windowWidth * 0.8 - 40) / amountofbar;

        for (let i = 0; i < amountofbar; i++) {
            let stockPrice = o[i];
            p.noStroke()
            if(stockPrice.open > stockPrice.close) p.fill("#ff0000");
            else p.fill("#00ff00");
            let leftUpY = linerclamp(stockPrice.open, minPrice, maxPrice, 240, 30);
            let rightDownY = linerclamp(stockPrice.close, minPrice, maxPrice, 240, 30);
            let highY = linerclamp(stockPrice.high, minPrice, maxPrice, 240, 30);
            let lowY = linerclamp(stockPrice.low, minPrice, maxPrice, 240, 30);
            p.rect(20 + i * barwidth, 
                leftUpY, 
                barwidth, 
                rightDownY-leftUpY);
            p.stroke("#000000");
            //p.line(20 + i * barwidth, 
            //    leftUpY, 
            //    20 + (i + 1) * barwidth, 
            //    rightDownY
            //)
            p.line(20+(i+1/2)*barwidth, highY, 20+(i+1/2)*barwidth, lowY);
            
        }
        p.textAlign(p.LEFT);
        p.fill("#000000");
        p.text(minPrice, 0, 240);
        p.text(maxPrice, 0, 30);
        let nowStockPriceNum = Math.floor(ratio * amountofbar);
        let frequent = linerclamp(ratio - (1/amountofbar)*Math.floor(ratio/(1/amountofbar)), 0, 1/amountofbar, o[nowStockPriceNum].open, o[nowStockPriceNum].close);
        osc.freq(frequent);
        p.line(x, 20, x, 260);
    }
}
function linerclamp(val, minA, maxA, minB, maxB){
    return  minB + (maxB-minB) * (val-minA)/(maxA-minA) 
}
const CanvasComponent = (props: any) => {
    o = props.stockprice;
    const a = new p5(sketch)
    useEffect(() => {
        if (i) a.remove();
        console.log(i)
        i++
    }, [props])
    return (<></>)
}
export default CanvasComponent