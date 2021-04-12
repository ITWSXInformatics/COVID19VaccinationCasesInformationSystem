import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import BarChart from "./BarChart";
import covid from "../data/covid.json";

const useStyle = makeStyles((theme) => ({
    info_number: {
        fontSize: "60px",
        fontWeight: "bold",
        color: "#717171",
        fontFamily:
            'Helvetica, Arial, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;',
        [theme.breakpoints.down("sm")]: {
            fontSize: "30px",
        },
    },
    info_header: {
        fontSize: "25px",
        fontWeight: "bold",
        color: "#474747",
        fontFamily:
            'Helvetica, Arial, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;',
    },
    info_body: {
        fontSize: "25px",
        color: "#474747",
        fontFamily:
            'Helvetica, Arial, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;',
        [theme.breakpoints.down("sm")]: {
            fontSize: "16px",
        },
    },
}));

function Overview() {
    const [cases, setCases] = useState([
        ...covid.covid.map((d) => {
            return { x: d.date, y: d.cases };
        }),
    ]);

    const [deaths, setDeaths] = useState([
        ...covid.covid.map((d) => {
            return { x: d.date, y: d.deaths };
        }),
    ]);

    const [caseTotal, setCaseTotal] = useState(
        Math.max(...covid.covid.map((d) => d.cases))
    );

    const [deathTotal, setDeathTotal] = useState(
        Math.max(...covid.covid.map((d) => d.deaths))
    );

    const classes = useStyle();

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <Grid
            item
            container
            spacing={4}
            direction="column"
            alignContent="space-around"
        >
            <Grid item xs={1} />
            <Grid item sm="auto">
                <Typography variant="h3" className={classes.info_header}>
                    US National Situation
                </Typography>
            </Grid>

            <Grid container item direction="row" sm="auto">
                <Grid item sm={1} xs={2}>
                    <Typography variant="h2" className={classes.info_number}>
                        {numberWithCommas(caseTotal)}
                    </Typography>
                    <Typography
                        variant="h5"
                        className={classes.info_body}
                        noWrap
                        display="inline"
                    >
                        Comfirmed Cases
                    </Typography>
                </Grid>
                <Grid item sm={11} xs={10}>
                    <BarChart data={cases} />
                </Grid>
            </Grid>

            <Grid container item direction="row" sm="auto">
                <Grid item sm={1} xs={2}>
                    <Typography variant="h2" className={classes.info_number}>
                        {numberWithCommas(deathTotal)}
                    </Typography>
                    <Typography
                        variant="h5"
                        className={classes.info_body}
                        noWrap
                        display="inline"
                    >
                        Deaths
                    </Typography>
                </Grid>
                <Grid item sm={11} xs={10}>
                    <BarChart data={deaths} />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Overview;
