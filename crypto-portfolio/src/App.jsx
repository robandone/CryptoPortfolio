import { useState,useEffect } from 'react'
import React from 'react'
import Cookies from 'js-cookie'
import reactLogo from './assets/react.svg'
import './App.css'
import { HeaderComponent } from './Components/HeaderComponent'
import { PortfolioList } from './Components/PortfolioList'
import { AssetList } from './Components/AssetsList'
import {db} from './firebase-config'
import {collection,getDocs} from 'firebase/firestore'
import { AssetListItem } from './Components/AssetListItem'



function App() {
  
  const [portfolios,setPortfolios] = useState([])
  const portfoliosCollectionRef = collection(db,"portfolios")
  useEffect(()=>{
    
    const getPortfolios = async () =>{
      const data = await getDocs(portfoliosCollectionRef)
      setPortfolios(data.docs.map((doc)=>({
        ...doc.data(), id: doc.id
      })))
      console.log(data.docs)
    }

    getPortfolios()
    
  }, [])

  function addPortfolio(){

  }

  return (

    <div className='App'>
      <HeaderComponent />
      <div>
            <ul className="PortfolioUl">
            </ul>
      </div>

      <div className="AddTransactionBtn">Add transaction</div>

      <button onClick={addPortfolio}>add portfolio</button>
    
    </div>

  )

}




export default App
