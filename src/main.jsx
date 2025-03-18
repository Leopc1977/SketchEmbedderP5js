import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import isPropValid from "@emotion/is-prop-valid";
import { StyleSheetManager } from 'styled-components';

ReactDOM.createRoot(document.getElementById('root')).render(
    <StyleSheetManager enableVendorPrefixes shouldForwardProp={isPropValid}>
        <App />
    </StyleSheetManager>,
);
