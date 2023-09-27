import React from "react";
import { Pagination } from "antd";

export const PaginationMenu: React.FC = () => <Pagination defaultCurrent={1} total={3} showSizeChanger showQuickJumper showTotal={(total) => `Total ${total} items`} />;
