import { Table, Badge, Select } from "antd";
import "./tableProductSeller.scss";
import { useEffect, useCallback, useState } from "react";
import ApiService from "../../../api/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ProductsSeller from "../../../store/actions/Seller/productsManager.action";
import RowKey from "../../../store/actions/Seller/setSelectedRowKeys.action";

const TableProductSeller = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const userAccount = useSelector((state) => state.auth.user);
  const [listProduct, setListProduct] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // const selectedRowKeys = useSelector(
  //   (state) => state.setSelectedRowKeys.selectedRowKeys
  // );
  // const listProduct = useSelector(
  //   (state) => state.productsSellerReducer.products
  // );

  // console.log(userAccount);
  //Table Component--------------------------------------------
  const columns = [
    {
      title: "IMG",
      dataIndex: "product_thumb",
      render: (text, record, index) => {
        return (
          <div style={{ width: 30 }} className="prod-name">
            <div className="prod-img-preview">
              <img src={record?.product_thumb[0]} alt="#imgPreview" />
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
              <Badge status="error" text="Private" />
            )}
          </>
        );
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    // dispatch(RowKey.setSelectedRowKeys(newSelectedRowKeys));
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  //Selected Component-----------------------------------------
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
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
    getAllProductsShop();
  }, []);

  const getAllProductsShop = async () => {
    const res1 = await ApiService.getAllPublishForShop();
    const res2 = await ApiService.getAllDraftsForShop();
    if (res1 && res2 && res1?.data?.metadata && res2?.data?.metadata) {
      const res = [...res1.data.metadata, ...res2.data.metadata];
      const prodList = res;
      const dataList = prodList?.map((item) => {
        return {
          key: item._id,
          product_name: item.product_name,
          product_price: item.product_price,
          product_type: item.product_type,
          product_thumb: item.product_thumb,
          product_quantity: item.product_quantity,
          isPublished: item.isPublished,
        };
      });
      setListProduct(dataList);
      // dispatch(ProductsSeller.productsSeller(res));

      // console.log(dataList);
    }
    // console.log("re1s >>>", res1, "res2 >>>", res2);
  };

  const publishProductByShop = async (keyID) => {
    console.log(selectedRowKeys, "selectedRowKeys1");
    const res = await ApiService.publishProductByShop(keyID);
    if (res) {
      alert("Mở bán sản phẩm thành công...");
      getAllProductsShop();
      setSelectedRowKeys([]);
    }
    // console.log("publishProductByShop >>>", res);
  };

  const unPublishProductByShop = async (keyID) => {
    const res = await ApiService.unPublishProductByShop(keyID);
    if (res) {
      alert("Lưu trữ sản phẩm thành công...");
      getAllProductsShop();
      setSelectedRowKeys([]);
    }
    // console.log("unPublishProductByShop >>>", res);
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
                <span
                  style={{
                    padding: "5px 8px",
                    border: "1px solid black",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    publishProductByShop(selectedRowKeys[0]);
                  }}
                >
                  Public
                </span>
                <span
                  style={{
                    padding: "5px 8px",
                    border: "1px solid black",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    unPublishProductByShop(selectedRowKeys[0]);
                  }}
                >
                  Private
                </span>
                {/* <span style={{ padding: "5px 8px", border: "1px solid black" }}>
                  Delete
                </span> */}
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
          // dataSource={memoizedListProduct()}
        />
      </div>
    </>
  );
};

export default TableProductSeller;
