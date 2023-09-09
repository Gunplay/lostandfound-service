import { useState } from "react";
import { Card, Pagination, Button, Row, Col, Space, Typography, Switch } from "antd";

import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";

const { Text, Link } = Typography;

const { Meta } = Card;

interface CardData<S, N> {
    address: S;
    categoryName: S;
    createdAt: S;
    photo: S;
    title: S;
    typeId: N;
    _id: S;
}

interface CardProps {
    checked: boolean;
    cardInfo: CardData<string, number>;
}

const CardNewItem: React.FC<CardProps> = ({ checked, cardInfo }) => {
    const { address, categoryName, createdAt, photo, title, typeId, _id } = cardInfo;

    return (
        <Card
            style={{ maxWidth: "320px", width: "100%", padding: "0px" }}
            hoverable
            size="default"
            cover={<img style={{ width: "100%" }} alt="example" src={photo} />}
            actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
        >
            <Space direction="vertical" size="middle">
                <Meta title={title} description="This is the description" />
                {checked && (
                    <>
                        <Text type="danger">{categoryName}</Text>
                        <Text strong>{createdAt}</Text>

                        <Text style={{ wordWrap: "break-word" }} type="success">
                            {address}
                        </Text>
                    </>
                )}
            </Space>
        </Card>
    );
};

export default CardNewItem;
