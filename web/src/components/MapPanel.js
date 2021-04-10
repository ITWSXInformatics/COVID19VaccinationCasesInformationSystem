import React, { useEffect } from "react";
import FilterCard from "./FilterCard";
import NationMap from "./NationMap";

function MapPanel() {
    const [topic, setTopic] = React.useState("cases");
    const [view, setView] = React.useState("total");
    const [data, setData] = React.useState({});

    const changeTopic = (event) => {
        setTopic(event.target.value);
    };

    const changeView = (event) => {
        setView(event.target.value);
    };

    useEffect(() => {
        const fetchCovidAllStates = async () => {
            const res = await fetch('http://localhost:5000/covid_states');
            const data = await res.json();

            console.log(data);
            setData(data);
        }

        fetchCovidAllStates();
    }, [topic, view])

    return (
        <div style={{ position: "relative"}}>
            <NationMap data={data} topic={topic} view={view} />
            <FilterCard
                topic={topic}
                view={view}
                onChangeTopic={changeTopic}
                onChangeView={changeView}
            />
        </div>
    );
}

export default MapPanel;
