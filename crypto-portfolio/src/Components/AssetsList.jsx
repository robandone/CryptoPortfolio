import React from "react";
import { useEffect,useState } from "react";
import ReactDOM from "react-dom";
import { AssetListItem } from "./AssetListItem";

export function AssetList(props){


    const portfolios = props.allPort
    const selectedPortfolio = props.selectedPort
    const [ListItems,setListItems] = useState([])
    var generalInfos = new Map([])
    var generalInfosArray = []
    useEffect(()=>{
        getGeneralInfos(portfolios,selectedPortfolio)
        
        generalInfos.forEach((value,key) =>{
            generalInfosArray.push(key+"/"+value)
        })

        // generalInfosArray = Array.from(generalInfos,([key,value]) =>{
        //     return {key}+"/"+{value}
        // })


        setListItems(generalInfosArray)
        console.log(ListItems)
        console.log(generalInfos)
        
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


    const AssetListItems = ListItems.map(element => <AssetListItem key={element} infos={element}></AssetListItem>)

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