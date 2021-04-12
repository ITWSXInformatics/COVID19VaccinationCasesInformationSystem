import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import Typography from "@material-ui/core/Typography";
import { Box, withStyles } from "@material-ui/core";

function StateInfo(props) {
    const { name, stat, topic, view } = props;

    const display = (stat, topic, view) => {
        if (topic === "cases" && view === "total") {
        } else if (topic === "cases" && view === "new-report-24h") {
        } else if (topic === "cases" && view === "new-report-7d") {
        } else if (topic === "deaths" && view === "total") {
        } else if (topic === "deaths" && view === "new-report-24h") {
        } else if (topic === "deaths" && view === "new-report-7d") {
        }
    };

    return (
        <Box p={1} minWidth="175px">
            <Typography variant="h5" component="h2">
                {name}
            </Typography>
            {topic === "cases" && view === "total" && (
                <React.Fragment>
                    <Typography color="textSecondary">
                        {stat["cases"]} total cases
                    </Typography>
                    <Typography color="textSecondary">
                        {stat["deaths"]} total deaths
                    </Typography>
                </React.Fragment>
            )}
            {topic === "cases" && view === "new-report-24h" && (
                <React.Fragment>
                    <Typography color="textSecondary">
                        {stat["cases_day"]} new cases
                    </Typography>
                    <Typography color="textSecondary">
                        {stat["deaths_day"]} new deaths
                    </Typography>
                </React.Fragment>
            )}
            {topic === "cases" && view === "new-report-7d" && (
                <React.Fragment>
                    <Typography color="textSecondary">
                        {stat["cases_day"]} new cases
                    </Typography>
                    <Typography color="textSecondary">
                        {stat["deaths_day"]} new deaths
                    </Typography>
                </React.Fragment>
            )}
            {topic === "deaths" && view === "total" && (
                <React.Fragment>
                    <Typography color="textSecondary">
                        {stat["cases"]} total cases
                    </Typography>
                    <Typography color="textSecondary">
                        {stat["deaths"]} total deaths
                    </Typography>
                </React.Fragment>
            )}
            {topic === "deaths" && view === "new-report-24h" && (
                <React.Fragment>
                    <Typography color="textSecondary">
                        {stat["cases_day"]} new cases
                    </Typography>
                    <Typography color="textSecondary">
                        {stat["deaths_day"]} new deaths
                    </Typography>
                </React.Fragment>
            )}
            {topic === "deaths" && view === "new-report-7d" && (
                <React.Fragment>
                    <Typography color="textSecondary">
                        {stat["cases_day"]} new cases
                    </Typography>
                    <Typography color="textSecondary">
                        {stat["deaths_day"]} new deaths
                    </Typography>
                </React.Fragment>
            )}
        </Box>
    );
}

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: "rgba(0, 0, 0, 0.87)",
        boxShadow: theme.shadows[1],
    },
    arrow: {
        "&::before": {
            backgroundColor: "#fff",
            boxSizing: "border-box",
        },
    },
}))(Tooltip);

function TippedPath(props) {
    const {
        name,
        placement,
        d,
        stroke,
        strokeLinejoin,
        stat,
        topic,
        view,
    } = props;

    const [position, setPosition] = useState({
        x: undefined,
        y: undefined,
    });

    function generateGetBoundingClientRect(x = 0, y = 0) {
        return () => ({
            width: 0,
            height: 0,
            top: y,
            right: x,
            bottom: y,
            left: x,
        });
    }

    return (
        <LightTooltip
            title={
                <StateInfo name={name} stat={stat} topic={topic} view={view} />
            }
            TransitionComponent={Zoom}
            placement={placement}
            onMouseMove={(e) => {
                setPosition({ x: e.clientX, y: e.clientY });
            }}
            PopperProps={{
                anchorEl: {
                    getBoundingClientRect: generateGetBoundingClientRect(
                        position.x,
                        position.y
                    ),
                },
            }}
            arrow
        >
            <path d={d} stroke={stroke} strokeLinejoin={strokeLinejoin} />
        </LightTooltip>
    );
}

TippedPath.defaultProps = {
    placement: "right",
    stroke: "white",
    strokeLinejoin: "round",
};

export default TippedPath;
