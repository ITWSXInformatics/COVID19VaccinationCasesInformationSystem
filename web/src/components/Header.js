import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import covid from "../data/covid19.mp4";
// import { makeStyles } from "@material-ui/core";

// const useStyles = makeStyles({
//     videobar: {
//         width: "100vw",
//         overflow: "hidden",
//         // display: "flex",
//         height: "360px",
//     },
// });

function Header() {

    // const classes = useStyles();

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6">COVID-19 Databoard</Typography>
            </Toolbar>
        </AppBar>
        // <AppBar position="static" color="primary">
        //     <video className={classes.videobar} autoPlay loop muted>
        //         <source src={covid} type="video/mp4" />
        //     </video>
        // </AppBar>
    );
}

export default Header;
