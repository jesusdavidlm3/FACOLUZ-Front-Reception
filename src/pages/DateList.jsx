import React, { useState } from "react";
import { List, Button, Tooltip, Input, DatePicker } from 'antd'

const DateList = () => {

    const [showList, setShowList] = useState([])

    return(
        <div className="DateList">
            <div className="bar"></div>
        </div>
    )
}

export default DateList;