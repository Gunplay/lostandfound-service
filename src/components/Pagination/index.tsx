import React from 'react';
import { Pagination } from 'antd';

export const PaginationMenu: React.FC = () => (
  <Pagination
    total={85}
    showSizeChanger
    showQuickJumper
    showTotal={(total) => `Total ${total} items`}
  />
);

