import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { makeStyles, Tooltip, Typography, withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";

function BarInfo({ x, y }) {
    return (
        <Box p={1}>
            <Typography
                component="h2"
                style={{ marginBottom: "5px", fontWeight: "bold" }}
            >
                {x}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                <b>{y.toLocaleString("en-US")}</b> counts
            </Typography>
        </Box>
    );
}

const useStyles = makeStyles({
    bar: {
        "&:hover": {
            fill: "#118AB2",
        },
    },
});

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

function BarChart(props) {
    const { data, width, height, color, margin } = props;

    useEffect(() => {
        d3.select(xAxis_ref.current).call(
            d3.axisBottom(xTime).ticks(4).tickSizeOuter(0)
        );
        d3.select(yAxis_ref.current)
            .call(d3.axisRight(yAxis).ticks(5, "s"))
            .call((g) => g.select(".domain").remove());
    }, [data]);

    const classes = useStyles();

    const xAxis_ref = useRef();
    const yAxis_ref = useRef();

    const paddedExtent = [
        d3.min(
            data.map((d) => {
                var date = new Date(d.x);
                date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
                return d3.timeDay.offset(date, -1);
            })
        ),
        d3.max(
            data.map((d) => {
                var date = new Date(d.x);
                date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
                return d3.timeDay.offset(date, 1);
            })
        ),
    ];

    const xTime = d3
        .scaleTime()
        .domain(paddedExtent)
        .range([margin.left, width - margin.right]);

    const xBand = d3
        .scaleBand()
        .domain(d3.timeDay.range(...xTime.domain()))
        .range([margin.left, width - margin.right])
        .padding(0.25);

    const yAxis = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.y)])
        .rangeRound([height - margin.bottom, margin.top]);

    const computeHeight = (d) => {
        return yAxis(0) - yAxis(d.y);
    };

    const barXPosition = (d) => {
        var date = new Date(d.x);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        return xTime(date) - xBand.bandwidth() / 2;
    };

    const barYPosition = (d) => {
        return yAxis(d.y);
    };

    const barWidth = () => {
        return xBand.bandwidth();
    };

    return (
        <div>
            <svg viewBox={"0 0 " + width + " " + height}>
                <g>
                    {data.map((d) => {
                        return (
                            <LightTooltip
                                key={d.x}
                                title={<BarInfo x={d.x} y={d.y} />}
                                placement="bottom"
                                arrow
                                TransitionProps={{ timeout: 0 }}
                            >
                                <rect
                                    className={classes.bar}
                                    x={barXPosition(d)}
                                    y={barYPosition(d)}
                                    width={barWidth()}
                                    height={computeHeight(d)}
                                    fill={color}
                                    ry="2"
                                    rx="2"
                                ></rect>
                            </LightTooltip>
                        );
                    })}
                    <g
                        ref={xAxis_ref}
                        color="#474747"
                        transform={
                            "translate(0, " + (height - margin.bottom) + ")"
                        }
                    />
                    <g
                        ref={yAxis_ref}
                        color="#474747"
                        transform={
                            "translate(" + (width - margin.right) + ", 0)"
                        }
                    />
                </g>
            </svg>
        </div>
    );
}

BarChart.defaultProps = {
    height: 200,
    width: 1000,
    color: "#d0d0d0",
    margin: {
        left: 40,
        right: 40,
        top: 20,
        bottom: 30,
    },
};

export default BarChart;
