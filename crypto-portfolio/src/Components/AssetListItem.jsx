import React from "react";
import ReactDOM from "react-dom";

export function AssetListItem(props){

    const ticker = props.infos.split("/")[0]
    const totalAmount = props.infos.split("/")[1]


    return(
        <tr><td>{ticker}</td><td>5</td><td>35</td><td>{totalAmount}</td><td>500</td></tr>
    )

    

}