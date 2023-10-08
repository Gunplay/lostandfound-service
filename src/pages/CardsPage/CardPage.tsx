import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { Link as LinkRout } from "react-router-dom";
import { Card, Pagination, Button, Row, Col, Space, Typography, Switch } from "antd";
import CardNewItem from "../../components/CardNewItem";

import { selectCardData } from "../../redux/card/selectors";
import { fetchCards } from "../../redux/card/asyncActions";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux/es/hooks/useSelector";

const { Text, Link } = Typography;

interface CardsPageProps {
    move?: React.MutableRefObject<HTMLDivElement | null>;
}

export const CardsPage: React.FC<CardsPageProps> = ({ move }) => {
    const dispatch = useAppDispatch();
    const { items, status } = useSelector(selectCardData);

    const [switcher, setSwitcher] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [listSearchAds, setListSearchAds] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6;

    const onChange = (checked: boolean) => {
        setSwitcher(checked);
    };

    useEffect(() => {
        dispatch(fetchCards());
    }, []);

    const onChangeComponent = () => {
        setShowMore(true);
    };

    const indexOfLastCard = currentPage * cardsPerPage;

    const indexOfFirstCard = indexOfLastCard - cardsPerPage;

    const currentCards = items?.slice(indexOfFirstCard, indexOfLastCard);

    return (
        <div ref={move} id="viewrecentitems">
            <Space size="middle">
                <h1 style={{ color: "black" }}>RECENTLY LOST THINGS</h1>
                <Switch checked={switcher} onChange={onChange}></Switch>
                <Text type="success">Open more information</Text>
            </Space>

            <Row gutter={[0, 32]}>
                <Col span={24} />
                {currentCards?.map((item) => (
                    <Col key={item["_id"]} xl={6} md={8} sm={12} xs={24}>
                        <Row justify="center">
                            <Row>
                                <Col>
                                    {" "}
                                    <Button type="link">Alert Owner</Button>
                                </Col>
                                <Col>
                                    {" "}
                                    <Button type="link">View lost thing</Button>
                                </Col>
                            </Row>
                            <CardNewItem checked={switcher} cardInfo={item} />
                        </Row>
                    </Col>
                ))}
                <Col span={24} />
            </Row>
        </div>
    );
};
