import React from "react";
import { useEffect, useState } from "react";
import { AssetListItem } from "./AssetListItem";
import axios from 'axios'
import '../App.css'

export function AssetList(props) {

    const portfolios = props.allPort
    const selectedPortfolio = props.selectedPort
    const selectedPortfolioId = props.selectedPortId
    const [portfolioValue, setPortfolioValue] = useState(0)
    const [portfolioValue24h, setPortfolioValue24h] = useState(0)
    const [portfolioValue24hColor, setPortfolioValue24hColor] = useState("black")
    const [ListItems, setListItems] = useState([])
    var generalInfos = new Map([])
    var generalInfosArray = []

    const [apiData, setApiData] = useState(null)
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"

    


    useEffect(() => {

        setPortfolioValue24h(0)
        setPortfolioValue(0)

        axios.get(url).then((response) => {
            setApiData(response.data)

        }).catch((error) => {
            console.log(error)
        })

        setInterval(() => {
            axios.get(url).then((response) => {
                setApiData(response.data)
            }).catch((error) => {
                console.log(error)
            })
        }, 2500)


        


        getGeneralInfos(portfolios, selectedPortfolioId)
        generalInfosArray = []
        generalInfos.forEach((value, key) => {
            if (parseInt(value.split('/')[1]) > 0) {
                generalInfosArray.push(key + "/" + value)
                console.log(key + "   value" + value)
            }
        })


        setListItems(generalInfosArray)


    }, [selectedPortfolioId, portfolios])


    useEffect(() => {

        setColor()
    })

    

        



    const getGeneralInfos = (ports, selectedPortId) => {

        for (let i = 0; i < ports.length; i++) {
            if (ports[i].id == selectedPortId) {
                ports[i].transactions.forEach(element => {
                    if (generalInfos.get(element.cryptoname) == undefined) {
                        generalInfos.set(element.cryptoname, (element.amount * element.pricepercoin) + "/" + element.amount)
                        //console.log(element.cryptoname+"   element.amount"+element.amount)
                    } else {
                        generalInfos.set(element.cryptoname, ((element.amount * element.pricepercoin) + parseInt(generalInfos.get(element.cryptoname).split("/")[0])) + "/" + (parseInt(generalInfos.get(element.cryptoname).split("/")[1]) + parseInt(element.amount)))
                    }
                });
            }
        }
    }


    const setColor = () => {
        
        if (portfolioValue24h > 0) {
            setPortfolioValue24hColor("greenPercentage")
        } else {
            setPortfolioValue24hColor("redPercentage")
        }

    }

    const AssetListItems = ListItems.map(element => <AssetListItem key={element} infos={element} coinGeckoApiData={apiData} openTradingViewPopup={props.openTradingViewPopup} setPortfolioValue={setPortfolioValue} setPortfolioValue24h={setPortfolioValue24h}></AssetListItem>)

    return (
        <div className="AssetListDiv">
            <div className="portfolioStatsContainer">
                <h2>{selectedPortfolio}</h2>
                <h4>Value : ${portfolioValue}</h4>
            </div>
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