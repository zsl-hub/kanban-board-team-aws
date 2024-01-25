import App from "./App.tsx";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";

const rootElement = document.getElementById("root")!;
ReactDOM.createRoot(rootElement).render(
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
);
