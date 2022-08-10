import React from "react";
import {useEffect,useState} from 'react'
import '../App.css'
export function AssetListItem(props){

    const [currentPrice,setCurrentPrice] = useState(0)
    const [priceChange24h,setPriceChange24h] = useState(0)
    const [priceChange24hColor,setPriceChange24hColor] = useState("black")
    const [imgUrl,setImgUrl] = useState("")
    const ticker = props.infos.split("/")[0]
    const totalAmountSpentInDollars = parseFloat(props.infos.split("/")[1])
    const totalCoins = parseFloat(props.infos.split("/")[2])

    useEffect(()=>{
        getCoinData()
        setColor()
    })

    useEffect(()=>{
        
        console.log("totalAmountSpent in dollars"+totalAmountSpentInDollars + " //ticker "+ticker)
        props.setPortfolioValue((currentValue) => ((parseFloat(currentValue) + parseFloat(totalAmount)).toFixed(2)))
        props.setPortfolioValue24h((currentValue) =>((totalAmountSpentInDollars + parseFloat(currentValue)).toFixed(2)))
        
        
        
    },[priceChange24h])

    const getCoinData = () =>{
        props.coinGeckoApiData.forEach((data)=>{
            if (data.symbol == ticker.toLowerCase()){
                setCurrentPrice(data.current_price)
                setPriceChange24h(data.price_change_percentage_24h.toFixed(2))
                setImgUrl(data.image)

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

    const openTVGraph = ()=>{
        props.openTradingViewPopup(true)
    }

    return(
        <tr>
            <td onClick={openTVGraph}><img className="cryptoImage" src={imgUrl}/><p>{ticker}</p></td>
            <td>{currentPrice}</td>
            <td className={priceChange24hColor}>{priceChange24h+"%"}</td>
            <td>{totalAmount}</td>
            <td>{profitLoss}</td>
        </tr>
    )

    

}