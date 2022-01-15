import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {createTheme, ThemeProvider} from '@mui/material/styles';
import {RecoilRoot} from "recoil";
import { SWRConfig } from 'swr'
import {RETRY_INTERVAL} from "config";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

ReactDOM.render(
    <React.StrictMode>
        <SWRConfig value={{
            revalidateOnFocus: true,
            shouldRetryOnError: true,
            errorRetryCount: 3,
            errorRetryInterval: RETRY_INTERVAL
        }}>
            <RecoilRoot>
                <ThemeProvider theme={darkTheme}>
                    <App />
                </ThemeProvider>
            </RecoilRoot>
        </SWRConfig>
    </React.StrictMode>,
    document.getElementById('root')
);