import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import { HeaderComponent } from './Components/HeaderComponent'
import { AssetList } from './Components/AssetsList'
import { AddTransaction } from './Components/AddTransaction'
import { SelectTransactionDetails } from './Components/SelectTransactionDetails'
import { db } from './firebase-config'
import { collection, getDocs, addDoc, doc, setDoc,arrayUnion } from 'firebase/firestore'



function App() {

  const [allCryptosValue,setAllCryptosValue] = useState(0)
  const [totalVariation,setTotalVariation] = useState(0)
  const [chosenCrypto, setChosenCrypto] = useState()
  const [transactionPopup, setTransactionPopup] = useState(false)
  const [buttonPopup, setButtonPopup] = useState(false)
  const [selectedPortfolio, setSelectedPortfolio] = useState("noportfolioselected")
  const [portfolios, setPortfolios] = useState([])
  const [transaction, setTransaction] = useState({ cryptoname: "", amount: 0, pricepercoin: 0 })
  const portfoliosCollectionRef = collection(db, "portfolios")

  const getPortfolios = async () => {
    const data = await getDocs(portfoliosCollectionRef)
    setPortfolios(data.docs.map((doc) => ({
      ...doc.data(), id: doc.id
    })))
  }

  useEffect(() => {

    getPortfolios()

  }, [])

  useEffect(() => {

    if (transaction.cryptoname != ""){
      console.log("record transaction")
      updatePortfolio()
    }
    
      
  }, [transaction])

  const addPortfolio = async () => {

    await addDoc(portfoliosCollectionRef, { name: "New Portfolio " + (portfolios.length + 1), transactions: [] })
    getPortfolios()
    console.log(portfolios)
  }

  const selectPortfolio = (event) => {
    setSelectedPortfolio(event.childNodes[0].textContent)
  }

  const ulElements = portfolios.map((portfolios) => {
    return <li key={portfolios.name} onClick={e => selectPortfolio(e.target)}>{portfolios.name}</li>
  })

  const updatePortfolio = async () => {
    const portDoc = doc(db, "portfolios", "3sl2pUcaIRhspDwK1SEw")
    await setDoc(portDoc, {transactions : arrayUnion(transaction)},{merge:true})
    getPortfolios()
  }

  const checkIfPortfolioIsSelected = () => {

    if (selectedPortfolio != "noportfolioselected") {
      setButtonPopup(true)
    } else {
      alert("Select a porfolio first.")
    }


  }

  return (

    <div className='App'>
      <HeaderComponent />
      <div className='MainContent'>
        <button onClick={checkIfPortfolioIsSelected}>Add transaction</button>
        <div className='PortfoliosListDiv'>

          <ul className="PortfolioUl">
            {ulElements}
            <li onClick={addPortfolio}>Add Portfolio +</li>
          </ul>
        </div>
        <AssetList allPort={portfolios} selectedPort={selectedPortfolio} />

      </div>
      
      <AddTransaction trigger={buttonPopup} setTrigger={setButtonPopup} transactionCallback={setTransactionPopup} chosenCryptoCallback={setChosenCrypto}>
        <h3>Select coin</h3>
      </AddTransaction>
      <SelectTransactionDetails trigger={transactionPopup} setTrigger={setTransactionPopup} chosenCrypto={chosenCrypto} setTransaction={setTransaction} />



    </div>

  )

}

export default App
