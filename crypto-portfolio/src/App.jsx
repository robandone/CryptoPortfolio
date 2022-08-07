import { useState,useEffect } from 'react'
import React from 'react'
import Cookies from 'js-cookie'
import reactLogo from './assets/react.svg'
import './App.css'
import { HeaderComponent } from './Components/HeaderComponent'
import { PortfolioList } from './Components/PortfolioList'
import { AssetList } from './Components/AssetsList'
import {db} from './firebase-config'
import {collection,getDocs,addDoc} from 'firebase/firestore'
import { AssetListItem } from './Components/AssetListItem'



function App() {
  
  const [selectedPortfolio,setSelectedPortfolio] = useState("Portfolio 1")
  const [portfolios,setPortfolios] = useState([])
  const portfoliosCollectionRef = collection(db,"portfolios")
  
  const getPortfolios = async () =>{
    const data = await getDocs(portfoliosCollectionRef)
    setPortfolios(data.docs.map((doc)=>({
      ...doc.data(), id: doc.id
    })))}

  useEffect(()=>{

    getPortfolios()
    
  
  },[])
  
  const addPortfolio = async () =>{
       
      await addDoc(portfoliosCollectionRef,{name: "New Portfolio "+(portfolios.length+1), transactions : [""]})  
      getPortfolios()
      console.log(portfolios)
    }

  const selectPortfolio = (event) =>{
    setSelectedPortfolio(event.childNodes[0].textContent)
  }
  
  const ulElements = portfolios.map((portfolios)=>{
    return <li key={portfolios.name} onClick={e => selectPortfolio(e.target)}>{portfolios.name}</li>
  })

  return (

    <div className='App'>
      <HeaderComponent />
      <div className='MainContent'>
        
        <div className='PortfoliosListDiv'>
              
              <ul className="PortfolioUl">
                {ulElements}
                <li onClick={addPortfolio}>Add Portfolio +</li>
              </ul>
        </div>
        <AssetList allPort={portfolios} selectedPort={selectedPortfolio}/>
      </div>
      

      
    
    </div>

  )

}

export default App
