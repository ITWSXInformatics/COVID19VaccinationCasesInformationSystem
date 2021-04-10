import { Card, Grid, makeStyles } from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  }));

function StateCards() {

    const classes = useStyle();

    return (
        <Grid container item spacing={4}>
            <Grid item xl={4} md={6} spacing={2}>
                <Card >
                    <h2> Hello </h2>
                </Card>
            </Grid>
        </Grid>
    );
}

export default StateCards;
