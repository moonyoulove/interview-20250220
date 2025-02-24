import { normalize } from "csstips";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { cssRaw } from "typestyle";
import App from "./App.tsx";
import mainStyle from "./index.css?inline";

cssRaw(
    `@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Noto+Sans+TC:wght@100..900&family=Roboto+Mono:wght@600&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');`
);

normalize();

cssRaw(mainStyle);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
