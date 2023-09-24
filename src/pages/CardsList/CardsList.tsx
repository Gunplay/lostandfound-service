import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
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

    const onChange = (checked: boolean) => {
        setSwitcher(checked);
    };

    // const [card, setCard] = useState([]);
    //console.log("card:", card);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCards());
        // async function fetchAds() {
        //     try {
        //         const { data } = await axios.get(`http://localhost:3001/ads/new`);
        //         setCard(data);
        //         // await dispatch(fetchCards());
        //     } catch (error) {
        //         alert("Помилка при отриманні card!");
        //         navigate("/");
        //     }
        // }

        // fetchAds();
    }, []);

    return (
        <div ref={move} id="viewrecentitems">
            <Space size="middle">
                <h1 style={{ color: "black" }}>RECENTLY LOST THINGS</h1>
                <Switch checked={switcher} onChange={onChange}></Switch>
                <Text type="success">Open more inforamtion</Text>
            </Space>

            <Row gutter={[0, 32]}>
                <Col span={24} />
                {items?.map((item) => (
                    <Col key={item["_id"]} xl={6} md={8} sm={12} xs={24}>
                        <Row justify="center">
                            <Row>
                                <Col>
                                    {" "}
                                    <Button type="link">ALert Owner</Button>
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
            <Pagination />
        </div>
    );
};
