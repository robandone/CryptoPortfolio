import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import { HeaderComponent } from './Components/HeaderComponent'
import { AssetList } from './Components/AssetsList'
import { AddTransaction } from './Components/AddTransaction'
import { SelectTransactionDetails } from './Components/SelectTransactionDetails'
import { TradingViewGraph } from './Components/TradingViewGraph'
import { db } from './firebase-config'
import { collection, getDocs, addDoc, doc, setDoc, arrayUnion, deleteDoc } from 'firebase/firestore'



function App() {

  const [allCryptosValue, setAllCryptosValue] = useState(0)
  const [totalVariation, setTotalVariation] = useState(0)
  const [chosenCrypto, setChosenCrypto] = useState()
  const [transactionPopup, setTransactionPopup] = useState(false)
  const [buttonPopup, setButtonPopup] = useState(false)
  const [TradingViewPopup, setTradingViewPopup] = useState(false)
  const [selectedPortfolio, setSelectedPortfolio] = useState("Select a portfolio")
  const [portfolios, setPortfolios] = useState([])
  const [transaction, setTransaction] = useState({ cryptoname: "", amount: 0, pricepercoin: 0, timestamp: Date.now() })
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

    if (transaction.cryptoname != "") {
      console.log("record transaction")
      updatePortfolio()
    }


  }, [transaction])

  // useEffect(()=>{
  //   console.log(TradingViewPopup)
  // },[TradingViewPopup])

  const addPortfolio = async () => {

    await addDoc(portfoliosCollectionRef, { name: "New Portfolio " + (portfolios.length + 1), transactions: [] })
    getPortfolios()
    console.log(portfolios)
  }

  const selectPortfolio = (event) => {
    setSelectedPortfolio(event.childNodes[0].textContent)
  }






  const getIdOfSelectedPortfolio = () => {
    var id = ""
    for (let i = 0; i < portfolios.length; i++) {
      if (portfolios[i].name == selectedPortfolio) {
        id = portfolios[i].id
      }

    }
    return id
  }

  const removePortfolio = async () => {
    var dialog = confirm("Are you sure you want to delete this portfolio?");
    if (dialog) {
      const id = getIdOfSelectedPortfolio()
      const portDoc = doc(db, "portfolios", id)
      await deleteDoc(portDoc)
      getPortfolios()
    }

  }

  const updatePortfolio = async () => {
    const id = getIdOfSelectedPortfolio()
    const portDoc = doc(db, "portfolios", id)
    await setDoc(portDoc, { transactions: arrayUnion(transaction) }, { merge: true })
    getPortfolios()
  }

  const checkIfPortfolioIsSelected = () => {

    if (selectedPortfolio != "Select a portfolio") {
      setButtonPopup(true)
    } else {
      alert("Select a porfolio first.")
    }


  }


  const ulElements = portfolios.map((portfolios) => {
    return <div className='ulElement'><li className='liElement' key={portfolios.name} onClick={e => selectPortfolio(e.target)}>{portfolios.name}</li><p onClick={removePortfolio}>X</p></div>
  })

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
        <AssetList allPort={portfolios} selectedPort={selectedPortfolio} openTradingViewPopup={setTradingViewPopup} />

      </div>

      <AddTransaction trigger={buttonPopup} setTrigger={setButtonPopup} transactionCallback={setTransactionPopup} chosenCryptoCallback={setChosenCrypto}>
        <h3>Select coin</h3>
      </AddTransaction>
      <SelectTransactionDetails trigger={transactionPopup} setTrigger={setTransactionPopup} chosenCrypto={chosenCrypto} setTransaction={setTransaction} />
      <TradingViewGraph trigger={TradingViewPopup} setTrigger={setTradingViewPopup} />


    </div>

  )

}

export default App
