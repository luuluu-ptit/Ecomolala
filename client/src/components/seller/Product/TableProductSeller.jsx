import { Table, Badge, Select } from "antd";
// import { useSelector } from "react-redux";
import "./tableProductSeller.scss";
import { useEffect, useState } from "react";
import ApiService from "../../../api/index";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const TableProductSeller = () => {
  // const userAccount = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [listProduct, setListProduct] = useState([]);
  // console.log(userAccount);
  //Table Component--------------------------------------------
  const columns = [
    {
      title: "IMG",
      dataIndex: "product_thumb",
      render: (text, record, index) => {
        return (
          <div className="prod-name">
            <div className="prod-img-preview">
              <img src={record?.product_thumb} alt="#imgPreview" />
            </div>
          </div>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "product_name",
      render: (text, record, index) => {
        return (
          <Link to={"/seller/update-product"}>{record?.product_name}</Link>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "product_price",
    },
    {
      title: "Type",
      dataIndex: "product_type",
    },
    {
      title: "Quantity",
      dataIndex: "product_quantity",
    },
    {
      title: "Status",
      dataIndex: "isPublished",
      render: (text, record, index) => {
        return (
          <>
            {record?.isPublished ? (
              <Badge status="success" text="Public" />
            ) : (
              <Badge status="warning" text="UnPublic" />
            )}
          </>
        );
      },
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  //Selected Component-----------------------------------------
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const options = [
    {
      label: "Please Select",
      disabled: true,
    },
    {
      value: "all",
      label: "All",
    },
    {
      value: "enable",
      label: "Enable",
    },
    {
      value: "disable",
      label: "Disable",
    },
  ];

  //----------------------------------------------------------
  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const res = await ApiService.getAllPublishForShop();
    if (res && res?.data?.metadata) {
      const prodList = res.data.metadata;
      const dataList = prodList?.map((item, index) => {
        return {
          key: index,
          product_name: item.product_name,
          product_price: item.product_price,
          product_type: item.product_type,
          product_thumb: item.product_thumb,
          product_quantity: item.product_quantity,
          isPublished: item.isPublished,
        };
      });
      setListProduct(dataList);
      console.log(dataList);
    }
    console.log("res >>>", res);
  };

  return (
    <>
      <div>
        <div className="header-table">
          <div className="title-table">Products</div>
          <button
            className="btn-add-prod"
            onClick={() => navigate("/seller/new-product")}
          >
            New Product
          </button>
        </div>
        <div
          style={{
            marginLeft: 8,
          }}
        >
          {/* selectedRowKeys la array gom cac phan tu da select */}
          <span>
            {selectedRowKeys.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginBottom: "20px",
                }}
              >
                <span style={{ padding: "5px 8px", border: "1px solid black" }}>
                  {`Selected ${selectedRowKeys.length} items`}
                </span>
                <span style={{ padding: "5px 8px", border: "1px solid black" }}>
                  Disable
                </span>
                <span style={{ padding: "5px 8px", border: "1px solid black" }}>
                  Enable
                </span>
                <span style={{ padding: "5px 8px", border: "1px solid black" }}>
                  Delete
                </span>
              </div>
            ) : (
              ""
            )}
          </span>
        </div>
        <Table
          title={() => {
            return (
              <div
                className="selected-status"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: "-15px",
                }}
              >
                <Select
                  defaultValue="all"
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  options={options}
                />
              </div>
            );
          }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={listProduct}
        />
      </div>
    </>
  );
};

export default TableProductSeller;
