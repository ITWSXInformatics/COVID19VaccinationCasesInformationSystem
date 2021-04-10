import React, { useEffect, useRef } from "react";
import us from "../data/states-albers-10m.json";
import * as topojson from "topojson-client";
import * as d3 from "d3";
import ZoomButton from "./ZoomButton";
import TippedPath from "./TippedPath";

const stateList = {
    Arizona: "AZ",
    Alabama: "AL",
    Alaska: "AK",
    Arkansas: "AR",
    California: "CA",
    Colorado: "CO",
    Connecticut: "CT",
    Delaware: "DE",
    "District of Columbia": "DC",
    Florida: "FL",
    Georgia: "GA",
    Hawaii: "HI",
    Idaho: "ID",
    Illinois: "IL",
    Indiana: "IN",
    Iowa: "IA",
    Kansas: "KS",
    Kentucky: "KY",
    Louisiana: "LA",
    Maine: "ME",
    Maryland: "MD",
    Massachusetts: "MA",
    Michigan: "MI",
    Minnesota: "MN",
    Mississippi: "MS",
    Missouri: "MO",
    Montana: "MT",
    Nebraska: "NE",
    Nevada: "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    Ohio: "OH",
    Oklahoma: "OK",
    Oregon: "OR",
    Pennsylvania: "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    Tennessee: "TN",
    Texas: "TX",
    Utah: "UT",
    Vermont: "VT",
    Virginia: "VA",
    Washington: "WA",
    "West Virginia": "WV",
    Wisconsin: "WI",
    Wyoming: "WY",
};

const stateCode = (fullName) => {
    return stateList[fullName];
};

function NationMap({ data, topic, view }) {
    const svg = useRef();

    const g = useRef();

    const features = topojson.feature(us, us.objects.states).features;

    const geoGenerator = d3.geoPath();

    const zoom = d3
        .zoom()
        .scaleExtent([1, 8])
        .on("zoom", (e) => {
            const { transform } = e;
            d3.select(g.current).attr("transform", transform);
            d3.select(g.current).attr("stroke-width", 1 / transform.k);
        });

    const centroid_x = (feature) => {
        return geoGenerator.centroid(feature)[0];
    };

    const centroid_y = (feature) => {
        return geoGenerator.centroid(feature)[1];
    };

    const handleZoomIn = () => {
        d3.select(svg.current)
            .transition()
            .duration(400)
            .call(zoom.scaleBy, 1.5);
    };

    const handleZoomOut = () => {
        d3.select(svg.current)
            .transition()
            .duration(400)
            .call(zoom.scaleBy, 0.5);
    };

    useEffect(() => {
        d3.select(svg.current).call(zoom).on("wheel.zoom", null);
    }, []);

    return (
        <div style={{ position: "relative" }}>
            <svg
                style={{
                    backgroundColor: "#f0f0f0",
                    maxHeight: "85vh",
                    overflow: "auto",
                }}
                ref={svg}
                viewBox="-120 0 1200 700"
            >
                <g ref={g}>
                    <g fill="#118AB2" cursor="pointer">
                        {features.map((feature) => {
                            return (
                                <TippedPath
                                    key={feature.properties.name}
                                    name={feature.properties.name}
                                    stat={
                                        data[stateCode(feature.properties.name)]
                                    }
                                    topic={topic}
                                    view={view}
                                    d={geoGenerator(feature)}
                                />
                            );
                        })}
                        {features.map((feature) => {
                            return stateCode(feature.properties.name) ===
                                "DC" ? (
                                <text
                                    key={feature.properties.name}
                                    fill="white"
                                    stroke="#474747"
                                    strokeWidth="0.05"
                                    style={{
                                        fontSize: "1px",
                                        fontWeight: "bold",
                                    }}
                                    x={centroid_x(feature) - 1}
                                    y={centroid_y(feature)}
                                >
                                    {stateCode(feature.properties.name)}
                                </text>
                            ) : (
                                <text
                                    key={feature.properties.name}
                                    fill="white"
                                    stroke="#474747"
                                    strokeWidth="0.3"
                                    style={{
                                        fontSize: "8px",
                                        fontWeight: "bold",
                                    }}
                                    x={centroid_x(feature) - 4}
                                    y={centroid_y(feature) + 2}
                                >
                                    {stateCode(feature.properties.name)}
                                </text>
                            );
                        })}
                    </g>
                </g>
            </svg>
            <ZoomButton
                handleZoomIn={handleZoomIn}
                handleZoomOut={handleZoomOut}
            />
        </div>
    );
}

NationMap.defaultProps = {
    width: 975,
    height: 610,
};

export default NationMap;
