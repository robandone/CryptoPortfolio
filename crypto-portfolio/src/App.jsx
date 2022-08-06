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
  
  const [newName, setNewName] = useState("New Portfolio")
  const [portfolios,setPortfolios] = useState([])
  const portfoliosCollectionRef = collection(db,"portfolios")
  useEffect(()=>{
    
    const getPortfolios = async () =>{
      const data = await getDocs(portfoliosCollectionRef)
      setPortfolios(data.docs.map((doc)=>({
        ...doc.data(), id: doc.id
      })))}

      
    getPortfolios()
  },[portfolios])
  
  
  
  const addPortfolio = async () =>{
       
      await addDoc(portfoliosCollectionRef,{name: newName+" "+(portfolios.length+1), transactions : [""]})  
      
    }

  const selectPortfolio = () =>{
    console.log("portfolio selected")
  }
  
  return (

    <div className='App'>
      <HeaderComponent />
      
      <button onClick={addPortfolio}>add portfolio</button>
      <div>
            <ul className="PortfolioUl">
              {portfolios.map((portfolios)=>{
                return <li key={portfolios.name} onClick={selectPortfolio}>{portfolios.name}</li>
              })}
            </ul>
      </div>
      <AssetList />

      

      
    
    </div>

  )

}

export default App
