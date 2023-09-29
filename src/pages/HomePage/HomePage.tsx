import React from "react";

import { Link as LinkRout } from "react-router-dom";
import FormLostFound from "../FormLostFound";

import { MainManualLostAndFound } from "../MainManualLostAndFound";
import { CardsPage } from "../CardsPage/CardPage";
import FloatingButtonHelpInfo from "../../components/FloatingButtonHelpInfo";

const overlayStyle: React.CSSProperties = {
    height: "100vh",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity value (0.5) to control the darkness
};

const HomePage: React.FC = () => {
    return (
        <>
            <div style={{ position: "relative", zIndex: 50 }}>
                <img src="backgroundImg.jpg" alt="backgroundImg" style={{ height: "100vh", width: "100%", objectFit: "cover" }} />
                <div style={overlayStyle} />
                {/* <div style={{ display: "flex", position: "absolute", top: 100, left: 0, right: 0, bottom: 0, zIndex: 50 }}> */}
                <FormLostFound />
            </div>
            {/* </div> */}
            <MainManualLostAndFound />
            <CardsPage />
            <LinkRout to="/list">SHOW MORE</LinkRout>
            <FloatingButtonHelpInfo />
        </>
    );
};

export default HomePage;
