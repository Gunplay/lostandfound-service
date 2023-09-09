import React from "react";
import { Divider, Typography, Space, Row, Col } from "antd";

const { Title, Paragraph, Text, Link } = Typography;

const style: React.CSSProperties = { color: "black" };

export const MainManualLostAndFound: React.FC = () => (
    <div>
        <div style={{ backgroundColor: "snow" }}>
            <Typography>
                <Title>Online Lost and Found</Title>
                <div style={{ textAlign: "left", marginLeft: "50px", marginRight: "25px" }}>
                    <Paragraph>
                        Lostings Online Lost and Found is a unique platform that incorporates a dynamic lost and found matching system for individual users, accompanied by a Lost
                        and Found Inventory Management Software for businesses. Our approach is unique compared to traditional lost and found methods, however, the intention is
                        still to reunite items lost or found with their respective owners.
                    </Paragraph>
                    <Paragraph>
                        The multi-level lost and found platform for individual users allows them to easily view, report, describe, and categorize lost or found items. Additionally
                        users can add location information, upload photos, provide more in-depth details, and print fliers for local awareness. The matching system gives users the
                        ability to receive up-to-date email notifications and system alerts of matching or similar lost or found items. The system works with individuals reporting
                        lost or found items, along with businesses registered to use the lost and found inventory management software.
                        <Text strong>along with businesses registered to use the lost and found inventory management software.</Text>.
                    </Paragraph>
                    <Paragraph>"Our goal is to provide individual users and businesses with the tools necessary for an effective and efficient online lost and found."</Paragraph>
                </div>
                <Title level={2} style={{ textAlign: "center" }}>
                    Step-By-Step Process
                </Title>
                {/* <Paragraph>
      We supply a series of design principles, practical patterns and high quality design resources
      (<Text code>Sketch</Text> and <Text code>Axure</Text>), to help people create their product
      prototypes beautifully and efficiently.
    </Paragraph> */}
                <div style={{ textAlign: "center", marginBottom: "30px", margin: "auto 50px" }}>
                    <Paragraph code={false}>
                        <ul>
                            <li>Enter lost or found item details (e.g., item lost or found, category, photos, date, time, etc).</li>
                            <li>Review details entered and submit the lost or found item report.</li>
                            <li>Receive an email with your user dashboard login and account information.</li>
                            <li>Within the dashboard you can print fliers of the submitted lost or found item.</li>
                            <li>Receive notifications when newly submitted items match the details on your entry.</li>
                        </ul>
                    </Paragraph>
                </div>
            </Typography>
        </div>
        );
    </div>
);
