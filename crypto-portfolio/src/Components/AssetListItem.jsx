import React from "react";
import {useEffect,useState} from 'react'

export function AssetListItem(props){

    const [coinData,setCoinData] = useState(props.coinGeckoApiData)
    const ticker = props.infos.split("/")[0]
    const totalAmount = props.infos.split("/")[1]
    


    useEffect(()=>{
        getCoinData()
        //console.log(coinData)
        console.log(coinData.price_change_percentage_24h)
        
    },[])

    const getCoinData = () =>{
        coinData.forEach((data)=>{
            if (data.symbol == ticker.toLowerCase()){
                setCoinData(data)
            }
        })
    }

    const currentPrice = coinData.current_price
    const priceChange24h = coinData.price_change_percentage_24h

    return(
        <tr>
            <td>{ticker}</td>
            <td>{currentPrice}</td>
            <td>{priceChange24h}</td>
            <td>{totalAmount}</td>
            <td>TO DO</td>
        </tr>
    )

    

}