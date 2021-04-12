import { Card, CardContent, makeStyles } from "@material-ui/core";
import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyle = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(0.5),
        minWidth: 120,
      },
}));

function FilterCard({ topic, view, onChangeTopic, onChangeView }) {
    const classes = useStyle();

    return (
        <Card
            className="map-filter"
            style={{ position: "absolute", bottom: "5%", left: "3%" }}
            direction="column"
        >
            <CardContent>
                <FormControl className={classes.formControl}>
                    <Select
                        value={topic}
                        onChange={onChangeTopic}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                    >
                        <MenuItem value="cases">Cases</MenuItem>
                        <MenuItem value="deaths">Deaths</MenuItem>
                        <MenuItem value="vaccination">Vaccination</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <Select
                        value={view}
                        onChange={onChangeView}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                    >
                        <MenuItem value="total">Total</MenuItem>
                        <MenuItem value="new-report-24h">Newly reported in last 24 hours</MenuItem>
                        <MenuItem value="new-report-7d">Newly reported in last 7 days</MenuItem>
                    </Select>
                </FormControl>
            </CardContent>
        </Card>
    );
}

export default FilterCard;
