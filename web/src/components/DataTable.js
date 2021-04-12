import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import { Grid, Paper, TableSortLabel, Typography } from "@material-ui/core";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
const columns = [
    { id: "state", label: "State", minWidth: 50 },
    {
        id: "case_t",
        label: "Cases - total",
        minWidth: 60,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "case_new",
        label: "Cases - last 24 hours",
        minWidth: 60,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "death_t",
        label: "Deaths - total",
        minWidth: 60,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "death_new",
        label: "Deaths - last 24 hours",
        minWidth: 60,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "vac_distributed",
        label: "Vaccine - distributed",
        minWidth: 60,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "vac_initiated",
        label: "Vaccine - first dose",
        minWidth: 60,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "vac_completed",
        label: "Vaccine - second dose",
        minWidth: 60,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: "70vh",
        maxWidth: "80vw",
        [theme.breakpoints.down("sm")]: {
            maxWidth: "90vw",
        },
    },
}));

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function DataTable({ data }) {
    const classes = useStyles();

    const [order, setOrder] = useState("desc");

    const [orderBy, setOrderBy] = useState("case_t");

    const handleSort = (id) => {
        const isDesc = orderBy === id && order === "desc";
        setOrder(isDesc ? "asc" : "desc");
        setOrderBy(id);
    };

    return (
        <TableContainer className={classes.container} component={Paper}>
            {data.length !== 0 ? (
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    sortDirection={
                                        orderBy === column.id ? order : false
                                    }
                                    style={{
                                        minWidth: column.minWidth,
                                    }}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={
                                            orderBy === column.id
                                                ? order
                                                : "desc"
                                        }
                                        onClick={() => handleSort(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stableSort(data, getComparator(order, orderBy)).map(
                            (row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.state}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.format &&
                                                    typeof value === "number"
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            }
                        )}
                    </TableBody>
                </Table>
            ) : (
                <Grid
                    item
                    className={classes.container}
                    container
                    component={Paper}
                    style={{ height: "50vh" }}
                    alignContent="center"
                    alignItems="center"
                    justify="center"
                    direction="column"
                >
                    <ErrorOutlineIcon style={{width:100, height:100, color: "#717171"}}/>
                    <Typography variant="h5" style={{color:"#717171"}}>Oops...no data shown :(</Typography>
                </Grid>
            )}
        </TableContainer>
    );
}

export default DataTable;
