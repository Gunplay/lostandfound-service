import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCards } from "../../redux/card/asyncActions"; // Import your fetchCards action
import { RootState } from "../../redux/store";
import { Col, Pagination, Row, Space, Switch } from "antd";
import { CardsPage } from "../CardsPage/CardPage";
import CardNewItem from "../../components/CardNewItem";

const ListSearchAds = () => {
    const { items, status } = useSelector((store: RootState) => store.card);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Number of items to display per page

    useEffect(() => {
        // Fetch data when the component mounts
        dispatch(fetchCards() as any);
    }, [dispatch]);

    const handlePageChange = (page: number) => {
        console.log("page", page);
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage; // 0 4
    console.log("startIndex", startIndex);
    const endIndex = startIndex + itemsPerPage;
    console.log("endIndex", endIndex);
    const itemsToDisplay = items.slice(startIndex, endIndex);

    return (
        <>
            <Row gutter={[0, 32]}>
                <Col span={24} />
                <Col span={24} />
                {itemsToDisplay?.map((item) => (
                    <Col key={item["_id"]} xl={16} md={16} sm={16} xs={24}>
                        <Row justify="start">
                            <CardNewItem checked={Switch} cardInfo={item} />
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
