import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCards } from "../../redux/card/asyncActions"; // Import your fetchCards action
import { RootState } from "../../redux/store";
import { Col, Pagination, Row, Input, Space } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined, AudioOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import type { SearchProps } from "antd/es/input";
const { Search } = Input;
const { Meta } = Card;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: "#1677ff",
        }}
    />
);

const ListSearchAds = () => {
    const { items, status } = useSelector((store: RootState) => store.card);
    const dispatch = useDispatch();
    const onSearch: SearchProps["onSearch"] = (value: string, info: any) => console.log(info?.source, value);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Number of items to display per page

    // useEffect(() => {
    //     // Fetch data when the component mounts
    //     dispatch(fetchCards());
    // }, [dispatch]);

    const handlePageChange = (page: number) => {
        // console.log("page", page);
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage; // 0 4

    const endIndex = startIndex + itemsPerPage;

    const itemsToDisplay = items.slice(startIndex, endIndex);

    return (
        <>
            <Row gutter={[0, 32]} style={{ backgroundColor: "green", color: "red" }}>
                <Col span={24} />
                <Col span={24} />

                <>
                    <Row gutter={[8, 8]}>
                        <Col span={12}>
                            {" "}
                            <Search placeholder="Seacrh by word..." enterButton="Search" size="large" loading />
                            <Search placeholder="input search text" onSearch={onSearch} enterButton />
                            <Search placeholder="input search text" onSearch={onSearch} enterButton />
                        </Col>
                        <Col span={12}>
                            <Search placeholder="Search by place..." enterButton="Search" size="large" loading />
                            <Search placeholder="input search text" onSearch={onSearch} enterButton />
                        </Col>

                        <Col span={12} />
                        <Col span={12} />
                    </Row>
                    <Row gutter={[8, 8]}>
                        <Col span={12} />
                        <Col span={12} />
                    </Row>
                    {/* Col xl={24} md={16} sm={16} xs={12}> */}
                </>
                {itemsToDisplay?.map((item) => (
                    <Col key={item["_id"]} xl={16} md={16} sm={16} xs={24}>
                        <Row justify="space-around">
                            <Card
                                style={{ width: 300 }}
                                cover={<img alt="example" src={item.photo} />}
                                hoverable
                                actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
                            >
                                <Meta avatar={<Avatar src={item.photo} />} title={item.title} description={item.address} />
                                <Meta title={item.categoryName} description={item.createdAt.slice(0, -4)} />
                            </Card>
                            );
                        </Row>
                    </Col>
                ))}
                <Col span={24} />
            </Row>
            <Pagination current={currentPage} total={items.length} pageSize={itemsPerPage} onChange={handlePageChange} />
        </>
    );
};

export default ListSearchAds;
