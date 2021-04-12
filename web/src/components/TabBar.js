import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import MapPanel from "./MapPanel";
import Grid from "@material-ui/core/Grid";
import Overview from "./Overview";
import TablePanel from "./TablePanel";

function TabBar() {
    const [value, setValue] = React.useState("overview");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <AppBar position="sticky" color="default">
                <TabList aria-label="views" centered onChange={handleChange}>
                    <Tab value="overview" label="Overview" />
                    <Tab value="data-table" label="Data Table" />
                    <Tab value="other" label="Other" />
                </TabList>
            </AppBar>
            <TabPanel style={{ padding: 0 }} value="overview">
                <MapPanel />
                <Grid container direction="row">
                    <Grid item xs={false} md={1} xl={2} />
                    <Grid container item spacing={1} md={10} xl={8}>
                        <Overview />
                        {/* <StateCards /> */}
                    </Grid>
                    <Grid item xs={false} md={1} xl={2} />
                </Grid>
            </TabPanel>
            <TabPanel style={{ padding: 0 }} value="data-table">
                <TablePanel />
            </TabPanel>
            <TabPanel style={{ padding: 0 }} value="other">
                Item Three
            </TabPanel>
        </TabContext>
    );
}

export default TabBar;
