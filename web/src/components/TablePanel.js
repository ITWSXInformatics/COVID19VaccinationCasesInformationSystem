import { Box, Grid } from "@material-ui/core";
import React, { useState } from "react";
import data from "../data/table.json";

import DataTable from "./DataTable";

function TablePanel() {
    const [table, setTable] = useState([...data]);

    return (
        <Box m={4}>
            <Grid container spacing={2} direction="row">
                <Grid item sm={false} md={1} xl={2} />
                <Grid container item md={10} xl={8} justify="center">
                    <h2>This is a table</h2>
                    <DataTable data={table} />
                </Grid>
                <Grid item sm={false} md={1} xl={2} />
            </Grid>
        </Box>
    );
}

export default TablePanel;
