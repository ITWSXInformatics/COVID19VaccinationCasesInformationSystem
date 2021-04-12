import React from "react";
import { Box, IconButton, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyle = makeStyles(() => ({
    zoomControl: {
        position: "absolute",
        right: "1.5%",
        top: "3%",
    },
    zoomButton: {
        margin: "0.8vh",
        backgroundColor: "white",
        boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        "&:hover": {
            backgroundColor: "rgb(212,212,212)",
        }
    },
}));

function ZoomButton({ handleZoomIn, handleZoomOut }) {

    const classes = useStyle();

    return (
        <Box
            className={classes.zoomControl}
            display="flex"
            flexDirection="column"
        >
            <IconButton aria-label="zoom-in" color="default" className={classes.zoomButton} onClick={handleZoomIn}>
                <AddIcon />
            </IconButton>
            <IconButton aria-label="zoom-out" color="default" className={classes.zoomButton} onClick={handleZoomOut}>
                <RemoveIcon />
            </IconButton>
        </Box>
    );
}

export default ZoomButton;
