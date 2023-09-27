import { HeaderPanel, FooterPanel } from "../../components";
import { CardsPage } from "../CardsPage/CardPage";
import { Space } from "antd";
const ListSearchAds = () => {
    return (
        <>
            <Space>
                <div style={{ marginTop: "70px" }}>
                    <CardsPage />
                </div>
            </Space>
            {/* <FooterPanel /> */}
        </>
    );
};

export default ListSearchAds;
