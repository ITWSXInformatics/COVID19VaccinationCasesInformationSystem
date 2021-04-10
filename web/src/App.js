import { responsiveFontSizes, useTheme, ThemeProvider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Header from "./components/Header";
import TabBar from "./components/TabBar";

function App() {
    const theme = useTheme();
    responsiveFontSizes(theme);

    return (
        <ThemeProvider theme={theme}>
            <Grid container direction="column">
                <Header />
                <TabBar />
            </Grid>
        </ThemeProvider>
    );
}

export default App;
