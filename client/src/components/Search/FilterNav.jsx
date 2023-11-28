import React from "react";
import { Button, Space } from "antd";

const FilterNav = ({ onFilter }) => {
  return (
    <Space size="middle">
      <Button type="primary" onClick={() => onFilter("newest")}>
        Mới nhất
      </Button>
      <Button type="primary" onClick={() => onFilter("popular")}>
        Bán chạy
      </Button>
      <Button type="primary" onClick={() => onFilter("cheapest")}>
        Giá thấp nhất
      </Button>
      <Button type="primary" onClick={() => onFilter("expensive")}>
        Giá cao nhất
      </Button>
      {/* Add more filter buttons as needed */}
    </Space>
  );
};

export default FilterNav;
