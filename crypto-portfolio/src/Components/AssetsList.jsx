import React from "react";
import { useEffect,useState } from "react";
import { AssetListItem } from "./AssetListItem";
import axios from 'axios'

export function AssetList(props){

    const portfolios = props.allPort
    const selectedPortfolio = props.selectedPort
    const [ListItems,setListItems] = useState([])
    var generalInfos = new Map([])
    var generalInfosArray = []
    
    const [apiData,setApiData] = useState(null)
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"

    useEffect(()=>{
        
        axios.get(url).then((response) =>{
            setApiData(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })

        getGeneralInfos(portfolios,selectedPortfolio)
        generalInfos.forEach((value,key) =>{
            generalInfosArray.push(key+"/"+value)
        })


        setListItems(generalInfosArray)
        
        
    },[selectedPortfolio])

    const getGeneralInfos = (ports,selectedPort) =>{

        for(let i = 0; i < ports.length;i++){
            if (ports[i].name == selectedPort){
                ports[i].transactions.forEach(element => {
                    if(generalInfos.get(element.cryptoname) == undefined){
                        generalInfos.set(element.cryptoname,(element.amount * element.pricepercoin))
                    }else{
                        generalInfos.set(element.cryptoname,((element.amount * element.pricepercoin)+generalInfos.get(element.cryptoname)))
                    }
                });
            }
        }
    }


    const AssetListItems = ListItems.map(element => <AssetListItem key={element} infos={element} coinGeckoApiData={apiData}></AssetListItem>)

    return(
        <div className="AssetListDiv">
            <table className="AssetsTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>24H</th>
                        <th>Holdings</th>
                        <th>Profit / Loss</th>
                    </tr>
                </thead>
                <tbody>
                    {AssetListItems}
                </tbody>
                <tfoot> 
                </tfoot>
            </table>
            

        </div>
    )
}