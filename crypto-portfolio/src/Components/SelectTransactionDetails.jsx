import React from 'react'
import { useEffect, useState } from 'react'
import { AddTransactionCryptoFinder } from './AddTransactionCryptoFinder'
import './AddTransaction.css'

export function SelectTransactionDetails(props) {

    const [isShown, setIsShown] = useState(false)
    const [selectedOperation, setSelectedOperation] = useState("Buy")
    const buySellDivs = document.getElementsByClassName("buySellButton")

    useEffect(() => {
        
        if (isShown) {
            console.log(buySellDivs)
            console.log("unloading buy sell")
            props.setTrigger(false)
            setIsShown(false)
        }
    })

    const closePopup = (element) => {

        if (element.className == 'transactionPopup')
            setIsShown(true)

    }

    const selectOperation = (element) =>{
        setSelectedOperation(element.innerHTML)
    }

    const execTransaction = () =>{
        const quantity = parseFloat(document.getElementById("quantity").value)
        const pricepercoin =parseFloat(document.getElementById("pricepercoin").value)
        props.setTransaction({cryptoname:props.chosenCrypto.symbol.toUpperCase(),amount:quantity,pricepercoin:pricepercoin})
    }

    return (props.trigger) ? (
        <div className='transactionPopup' onClick={e => closePopup(e.target)}>

            <div className='popup-inner'>
                <div className='buySellContainer'>
                    <div className='buySellButton' onClick={e => selectOperation(e.target)}>
                    Buy
                    </div>
                    <div className='buySellButton' onClick={e => selectOperation(e.target)}>
                    Sell
                    </div>
                </div>
                <div><img src={props.chosenCrypto.image} className="liCryptoImage"/>{props.chosenCrypto.name}</div>
                <p>Quantity</p><input type="number" className='searchBox' id='quantity' defaultValue={0}/>
                <p>Price per coin</p><input type="number" className='searchBox' id='pricepercoin' defaultValue={0}/>
                <button className='addTransactionBtn' onClick={execTransaction}>Add Transaction</button>
            </div>
        </div>
    ) : ""

}