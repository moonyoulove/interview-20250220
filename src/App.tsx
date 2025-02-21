import { cssRule } from "typestyle";
import Forecast from "./components/Forecast";
import Search from "./components/Search";
import Weather from "./components/Weather";

cssRule(`#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
`);

function App() {
    return (
        <>
            <Search></Search>
            <Weather></Weather>
            <Forecast></Forecast>
        </>
    );
}

export default App;
