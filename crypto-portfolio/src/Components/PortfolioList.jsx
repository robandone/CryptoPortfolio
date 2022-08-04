import React from "react";
import ReactDOM from "react-dom";
import data from './data/data.json'
export function PortfolioList(){
    //var portfoliosNames = []

    /*for(let i = 0 ; i< data.length;i++){
        console.log(data[i].name)
    }*/
    return(
        

        <div>
            <ul className="PortfolioUl">
                {data.portfolios.map(element => <li>{element.name}</li>)}
            </ul>
        </div>
    )
}