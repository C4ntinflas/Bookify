import React from "react";
import { useLocation } from "react-router-dom";

function StorePage() {
    const location = useLocation()
    const { from } = location.state
    
    return (
        console.log(from)
    )
}

export default StorePage