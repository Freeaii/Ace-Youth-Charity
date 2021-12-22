import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store";
import ScrollToTop from "./utils/ScrollToTop";
import {ConfigProvider} from "antd";
import zhCN from 'antd/lib/locale/zh_CN'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ScrollToTop>
                <ConfigProvider locale={zhCN}>
                    <App/>
                </ConfigProvider>
            </ScrollToTop>
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);