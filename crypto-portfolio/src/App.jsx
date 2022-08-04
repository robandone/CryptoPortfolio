import { useState } from 'react'
import React from 'react'
import Cookies from 'js-cookie'
import reactLogo from './assets/react.svg'
import './App.css'
import { HeaderComponent } from './Components/HeaderComponent'
import { PortfolioList } from './Components/PortfolioList'
import { AssetList } from './Components/AssetsList'
import data from './Components/data/data.json'

function App() {
  const [count, setCount] = useState(0)
  var numbers = ["Portfolio1","Portafoglio2"]; 
  //const portfolios = numbers.map(portfolioName => <p>{portfolioName.name}</p>)
  //console.log(portfolios)
  return (
    
    <div className='App'>
      <HeaderComponent />
      <div className='BodyContent'>
        <PortfolioList />
        <AssetList />
      </div>
    </div>
  )
}




export default App
