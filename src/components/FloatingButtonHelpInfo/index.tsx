import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import React from "react";
import { FloatButton } from "antd";

const FloatingButtonHelpInfo: React.FC = () => (
    <>
        {/* <FloatButton.Group trigger="click" type="primary" style={{ right: 24 }} icon={<CustomerServiceOutlined />}>
            <FloatButton />
            <FloatButton icon={<CommentOutlined />} />
        </FloatButton.Group> */}
        <FloatButton.Group tooltip={() => "HELP"} trigger="hover" type="primary" style={{ marginRight: 25, marginBottom: 80 }} icon={<CustomerServiceOutlined />}>
            <FloatButton />
            <FloatButton icon={<CommentOutlined />} />
        </FloatButton.Group>
    </>
);

export default FloatingButtonHelpInfo;
