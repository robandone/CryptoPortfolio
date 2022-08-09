import React from 'react';
import { useEffect, useState } from 'react';
import { TradingViewStockChartWidget } from 'react-tradingview-components'
import './AddTransaction.css'


export function TradingViewGraph(props) {


    const [isShown, setIsShown] = useState(false)


    useEffect(() => {


        if (isShown) {
            props.setTrigger(false)
            setIsShown(false)
        }


    })

    useEffect(() => {
        console.log(props)
    }, [isShown])

    const closePopup = (element) => {
        if (element.className == 'transactionPopup')
            setIsShown(true)
    }

    return (props.trigger) ? (

        <div className='transactionPopup' onClick={e => closePopup(e.target)}>
            <div className='popup-inner-tv'>
                <TradingViewStockChartWidget
                    symbol="BINANCE:BTCUSDT"
                    theme="Dark"
                    range="60m"/>
            </div>
        </div>

    ) : ""

}