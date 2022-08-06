import React from "react";
import ReactDOM from "react-dom";

export function AssetList(){
    return(
        <div>
            {/* <ul className="AssetsUl">
                <li>Cardano</li>
                <li>Ethereum</li>
                <li>Bitcoin</li>
            </ul> */}

            <div className="AddTransactionBtn">Add transaction</div>

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
                    <tr>
                      {portfolios.map((portfolios)=>{
                        return <AssetListItem key={portfolios.transactions} transactrions={portfolios.transactions}></AssetListItem>
                      })}
                    </tr>
                </tbody>
                <tfoot> 
                </tfoot>
            </table>
            

        </div>
    )
}