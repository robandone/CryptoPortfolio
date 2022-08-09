import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios'
import './AddTransaction.css'
import { SelectTransactionDetails } from "./SelectTransactionDetails";

export function AddTransactionCryptoFinder(props) {

    const [transactionPopup, setTransactionPopup] = useState(false)
    const [searchBoxText,setSearchBoxText] = useState("")
    const [apiData, setApiData] = useState([])
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"

    useEffect(() => {
        console.log(props)
        axios.get(url).then((response) => {
            setApiData(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })

    }, [])

    const ulElements = apiData.map((crypto) => {

        if(searchBoxText == ""){
            return <li className="AddTransactionCryptoListItem" key={crypto.id} onClick={() => { props.setTrigger(true); props.transactionCallback(true); props.chosenCryptoCallback(crypto) }}>
            <img src={crypto.image} className="liCryptoImage" />
            {crypto.name}    
            </li>
        }else

        if(crypto.name.toLowerCase().includes(searchBoxText.toLowerCase())){
            return <li className="AddTransactionCryptoListItem" key={crypto.id} onClick={() => { props.setTrigger(true); props.transactionCallback(true); props.chosenCryptoCallback(crypto) }}>
            <img src={crypto.image} className="liCryptoImage" />
            {crypto.name}
        </li>

        }

        
    })

    return (
        <div>
            <input type="text" className='searchBox' onChange={(e)=>{setSearchBoxText(e.target.value)}}/>
            <div className='scrollableListDiv'>
                <ul className="cryptosList">
                    {ulElements}
                </ul>

            </div>
        </div>
    )

}