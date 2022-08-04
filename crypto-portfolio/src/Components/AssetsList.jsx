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
                        <td>Cardano</td>
                        <td>20.65</td>
                        <td>+5%</td>
                        <td>$500</td>
                        <td>+$344</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                    <td>Cardano2</td>
                        <td>560.65</td>
                        <td>+13%</td>
                        <td>$270</td>
                        <td>+$54</td>
                    </tr>
                </tfoot>
            </table>
            

        </div>
    )
}