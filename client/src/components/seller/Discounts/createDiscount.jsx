import {
  Row,
  Col,
  Form,
  Input,
  Radio,
  InputNumber,
  message,
  notification,
} from "antd";
import "./addDiscountPage.scss";
import { useState } from "react";
import { useSelector } from "react-redux";

import ApiService from "../../../api/index";

export const AddDiscountPage = () => {
  const userAccount = useSelector((state) => state.auth.user);

  const [form] = Form.useForm();
  const { TextArea } = Input;

  //handle form
  const onFinish = async (values) => {
    const {
      discount_name,
      discount_description,
      discount_type,
      discount_value,
      discount_max_value,
      discount_code,
      discount_start_date,
      discount_end_date,
      discount_max_uses,
      discount_max_uses_per_user,
      discount_min_order_value,
      discount_is_active,
      discount_applies_to,
      //   discount_product_ids,
    } = values;
    // const product_ids = discount_product_ids || [];

    // const dataNewDiscount = {
    //   name: discount_name,
    //   description: discount_description,
    //   type: discount_type,
    //   value: discount_value,
    //   maxValue: discount_max_value,
    //   code: discount_code,
    //   startDate: formatted_start_date,
    //   endDate: formatted_end_date,
    //   max_uses: discount_max_uses,
    //   max_uses_per_user: discount_max_uses_per_user,
    //   min_order_value: discount_min_order_value,
    //   is_active: discount_is_active,
    //   applies_to: discount_applies_to,
    //   product_ids: product_ids,
    // };
    // console.log("dataNewDiscount", dataNewDiscount);
    const res = await ApiService.createDiscount({
      name: discount_name,
      description: discount_description,
      type: discount_type,
      value: discount_value,
      maxValue: discount_max_value,
      code: discount_code,
      startDate: discount_start_date,
      endDate: discount_end_date,
      max_uses: discount_max_uses,
      max_uses_per_user: discount_max_uses_per_user,
      min_order_value: discount_min_order_value,
      is_active: discount_is_active,
      applies_to: discount_applies_to,
      product_ids: [],
      users_used: [],
      uses_count: 0,
      created_by: {},
    });
    if (res && res?.data.metadata) {
      console.log("res=>", res.data.metadata);
      message.success("Thêm mã giảm giá thành công.");
      form.resetFields();
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: "Xảy ra lỗi khi tạo mới discount",
      });
    }
    console.log("Re-render");
  };

  //handle radio
  const [valueRadio, setValueRadio] = useState(true);
  const onChange = (e) => {
    setValueRadio(e.target.value);
  };

  return (
    <>
      <h2>Create New Discount</h2>
      <div style={{ background: "#f5f5f5" }}>
        <Row>
          <Col className="container-form-add" span={24}>
            <div className="main-form-add" style={{ padding: "12px" }}>
              <Form
                form={form}
                onFinish={onFinish}
                style={{ background: "#ffffff", padding: "20px" }}
              >
                <Row gutter={[30]}>
                  <Col span={12}>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          label="Discount Name"
                          name="discount_name"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input name!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <Form.Item
                          label="Discount Type"
                          name="discount_type"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please select a discount type!",
                            },
                          ]}
                        >
                          <Radio.Group>
                            <Radio value="fixed_amount">Fixed Amount</Radio>
                            <Radio value="percentage">Percentage</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>

                      <Col span={8}>
                        <Form.Item
                          label="Discount Value"
                          name="discount_value"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input value!",
                            },
                          ]}
                        >
                          <InputNumber style={{ width: 172 }} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Max Value"
                          name="discount_max_value"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input max value!",
                            },
                          ]}
                        >
                          <InputNumber style={{ width: 172 }} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Discount Code"
                          name="discount_code"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input code!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Start Date"
                          name="discount_start_date"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input start date!",
                            },
                          ]}
                        >
                          <Input type="date" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="End Date"
                          name="discount_end_date"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input end date!",
                            },
                          ]}
                        >
                          <Input type="date" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Max Uses"
                          name="discount_max_uses"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input max uses!",
                            },
                          ]}
                        >
                          <InputNumber style={{ width: 172 }} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Max Uses Per User"
                          name="discount_max_uses_per_user"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input max uses per user!",
                            },
                          ]}
                        >
                          <InputNumber style={{ width: 172 }} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Min Order Value"
                          name="discount_min_order_value"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input min order value!",
                            },
                          ]}
                        >
                          <InputNumber style={{ width: 172 }} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Applies To"
                          name="discount_applies_to"
                          labelCol={{ span: 24 }}
                          initialValue="all" // Set the default value here
                          rules={[
                            {
                              required: true,
                              message: "Please input applies to!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>

                      <Col span={8}>
                        <Form.Item
                          label="Product IDs"
                          name="discount_product_ids"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: false,
                              message: "Please input product IDs!",
                            },
                          ]}
                        >
                          <Input disabled="false" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Mô tả giảm giá"
                      name="discount_description"
                      labelCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mô tả giảm giá!",
                        },
                      ]}
                    >
                      <TextArea />
                    </Form.Item>
                  </Col>

                  {/* Continue with the remaining form items for other details */}

                  <Col span={12}>
                    {/* Continue with the remaining form items for other details */}
                  </Col>
                </Row>

                {/* Add the radio button for discount_is_active here */}
                <Form.Item
                  label="Is Active?"
                  name="discount_is_active"
                  labelCol={{ span: 24 }}
                >
                  <Radio.Group onChange={onChange} value={valueRadio}>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item>
                  <button type="submit">Create Discount</button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AddDiscountPage;
