import { Table, Badge, Select } from "antd";
// import { useSelector } from "react-redux";
import "./TableUserManagerment.scss";
import { useEffect, useState } from "react";
import ApiService from "../../../api/index";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const TableUserManagerment = () => {
  // const userAccount = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [listUserOrShop, setListUserOrShop] = useState([]);
  // console.log(userAccount);
  //Table Component--------------------------------------------
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Verify",
      dataIndex: "verify",
      render: (text, record, index) => {
        return record?.verify ? (
          <Badge status="success" text="Đã xác thực" />
        ) : (
          <Badge status="warning" text="Chưa xác thực" />
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Ngày đăng kí",
      dataIndex: "registerDate",
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
  // useEffect(() => {
  //   getAllUsers();
  // }, []);

  const getAllUsers = async () => {
    const res = await ApiService.getAllUsers();
    if (res && res?.data) {
      const userList = res.data;
      const dataList = userList?.map((item, index) => {
        return {
          key: index,
          name: item.name,
          email: item.email,
          phone: item.phone,
          verify: item.verify,
          status: item.status,
          role: item.role,
          registerDate: item.registerDate,
        };
      });
      setListUserOrShop(dataList);
      console.log(dataList);
    }
    console.log("res >>>", res);
  };

  return (
    <>
      <div>
        <div className="header-table">
          <div className="title-table">DANH SÁCH NGƯỜI DÙNG</div>
          <button
            className="btn-add-prod"
            onClick={() => navigate("/admin/new-user")}
          >
            Thêm người dùng
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
                  Người Mua
                </span>
                <span style={{ padding: "5px 8px", border: "1px solid black" }}>
                  Cửa Hàng
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
          dataSource={listUserOrShop}
        />
      </div>
    </>
  );
};

export default TableUserManagerment;
