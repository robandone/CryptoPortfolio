import React from "react";
import { useEffect,useState } from "react";
import axios from 'axios'
import './AddTransaction.css'

export function AddTransactionCryptoFinder(props){

    const [apiData,setApiData] = useState([])
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"

    useEffect(()=>{

        axios.get(url).then((response) =>{
            setApiData(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })

    },[])

    const ulElements = apiData.map((crypto) =>{
        return <li className="AddTransactionCryptoListItem" key={crypto.id}>
                    <img src={crypto.image} className="liCryptoImage"/>
                    {crypto.name}
                </li>
    })

    return(
        <div>
            <input type="text" className='searchBox'></input>
                <div className='scrollableListDiv'>
                    <ul className="cryptosList">
                        {ulElements}
                    </ul>            
                </div>
        </div>
    )

}