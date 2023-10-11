import React, { useRef } from "react";
import { Content, Footer } from "antd/es/layout/layout";
import { HeaderPanel, FooterPanel } from "../components";

import HomePage from "../pages/HomePage/HomePage";
import FormLostFound from "../pages/FormLostFound";
import { MainManualLostAndFound } from "../pages/MainManualLostAndFound";
import { CardsPage } from "../pages/CardsPage/CardPage";

import { Routes, Route } from "react-router";
import TestForm from "../pages/FormLostFound/test";
import ListSearchAds from "../pages/ListSearchAds";

const contentStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "white",
    position: "relative",
};

const siderStyle: React.CSSProperties = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#3ba0e9",
};

const footerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#7dbcea",
    backgroundImage: "url(",
};

const overlayStyle: React.CSSProperties = {
    height: "100vh",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity value (0.5) to control the darkness
};

const ContentLayout: React.FC = () => {
    return (
        <Content style={contentStyle}>
            <HeaderPanel />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/formlostandfound" element={<FormLostFound />} />
                <Route path="/manual" element={<MainManualLostAndFound />} />

                <Route path="/cards" element={<CardsPage />} />
                <Route path="/list" element={<ListSearchAds />} />
            </Routes>
            {/* 
            // <FooterPanel /> */}
        </Content>
    );
};

export default ContentLayout;
