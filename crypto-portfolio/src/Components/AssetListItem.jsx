import React from "react";
import {useEffect,useState} from 'react'
import '../App.css'
export function AssetListItem(props){

    const [currentPrice,setCurrentPrice] = useState(0)
    const [priceChange24h,setPriceChange24h] = useState(0)
    const [priceChange24hColor,setPriceChange24hColor] = useState("black")
    const ticker = props.infos.split("/")[0]
    const totalAmountSpentInDollars = parseInt(props.infos.split("/")[1])
    const totalCoins = parseFloat(props.infos.split("/")[2])

    useEffect(()=>{
        getCoinData()
        setColor()
    })

    const getCoinData = () =>{
        props.coinGeckoApiData.forEach((data)=>{
            if (data.symbol == ticker.toLowerCase()){
                setCurrentPrice(data.current_price)
                setPriceChange24h(data.price_change_percentage_24h.toFixed(2))
            }
        })
    }

    //console.log(ticker + "    total coins "+totalCoins+"/current price"+currentPrice)
    const totalAmount= (totalCoins * currentPrice).toFixed(2)
    var profitLoss = (totalAmount - totalAmountSpentInDollars).toFixed(2)

    if(profitLoss >= 0){
        profitLoss = "+"+profitLoss
    }

    const setColor = ()=>{
        if(priceChange24h>=0){
            setPriceChange24hColor("greenPercentage")        
        }else{
            setPriceChange24hColor("redPercentage")
        }

    }


    return(
        <tr>
            <td>{ticker}</td>
            <td>{currentPrice}</td>
            <td className={priceChange24hColor}>{priceChange24h+"%"}</td>
            <td>{totalAmount}</td>
            <td>{profitLoss}</td>
        </tr>
    )

    

}