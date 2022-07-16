import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "./infoBox.css";
function Infobox({ title, active,cases, isRed,total,...props }) {
  return (
    
      <Card className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`} onClick={props.onClick}>
        <CardContent>
          {/* title */}
          <Typography color="textSecondary" className="infoBox_">
            {title}
          </Typography>

          {/* No of cases  */}
          <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>{cases}</h2>

          {/* totla cases */}
          <Typography
            color="textSecondary"
            className="infoBox_total"
          >{`${total} total`}</Typography>
        </CardContent>
      </Card>
    
  );
}

export default Infobox;
