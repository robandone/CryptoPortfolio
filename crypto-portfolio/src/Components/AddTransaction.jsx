import React from 'react'
import { useEffect, useState } from 'react'
import { AddTransactionCryptoFinder } from './AddTransactionCryptoFinder'
import './AddTransaction.css'

export function AddTransaction(props) {

    const [isShown, setIsShown] = useState(false)

    useEffect(() => {
        if (isShown) {
            props.setTrigger(false)
            setIsShown(false)
        }
    }, [isShown])

    const closePopup = (element) => {

        if (element.className == 'transactionPopup')
            setIsShown(true)

    }

    return (props.trigger) ? (
        <div className='transactionPopup' onClick={e => closePopup(e.target)}>
            <div className='popup-inner'>
                <h3>Select coin</h3>
                <AddTransactionCryptoFinder trigger={isShown} setTrigger={setIsShown} transactionCallback={props.transactionCallback} chosenCryptoCallback={props.chosenCryptoCallback} />
            </div>
        </div>
    ) : ""
}