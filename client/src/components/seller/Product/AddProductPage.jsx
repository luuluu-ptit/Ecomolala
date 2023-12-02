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
import "./addProdPage.scss";
import { useState } from "react";

import ApiService from "../../../api/index";

const AddProductPage = () => {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  //handle form
  const onFinish = async (values) => {
    const {
      brand,
      isPublished,
      material,
      product_description,
      product_name,
      product_price,
      product_quantity,
      product_ratingsAverage,
      product_thumb,
      product_type,
      product_variations,
      size,
    } = values;

    const dataNewProd = {
      product_name: product_name,
      product_thumb: product_thumb,
      product_description: product_description,
      product_price: product_price,
      product_quantity: product_quantity,
      product_ratingsAverage: product_ratingsAverage,
      product_variations: [product_variations],
      product_type: product_type,
      product_attributes: {
        brand: brand,
        size: size,
        material: material,
      },
      isDraft: false,
      isPublished: isPublished,
    };

    const res = await ApiService.createProduct(dataNewProd);
    if (res && res?.data) {
      console.log("res=>", res);
      message.success(res.data.message);
      form.resetFields();
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: "Xảy ra lỗi khi tạo mới sản phẩm",
      });
    }
    console.log("Re-render");
  };

  //handle radio
  const [valueRadio, setValueRadio] = useState(true);
  const onChange = (e) => {
    //console.log("radio checked", e.target.value);
    setValueRadio(e.target.value);
  };

  //console.log('check rerender');

  return (
    <>
      <h2>Create New Product</h2>
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
                          label="Name Product"
                          name="product_name"
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
                    <Row gutter={[30]}>
                      <Col span={8}>
                        <Form.Item
                          label="Brand"
                          name="brand"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input brand!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Size"
                          name="size"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input size!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Material"
                          name="material"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input material!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Price"
                          name="product_price"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input price!",
                            },
                          ]}
                        >
                          <InputNumber style={{ width: 172 }} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Rating"
                          name="product_ratingsAverage"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input rating!",
                            },
                          ]}
                        >
                          <InputNumber style={{ width: 172 }} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Quantity"
                          name="product_quantity"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input quantity!",
                            },
                          ]}
                        >
                          <InputNumber style={{ width: 172 }} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Type"
                          name="product_type"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input category!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Variations"
                          name="product_variations"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input variations!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>

                      <Col span={8}>
                        <Form.Item
                          label="Status"
                          name="isPublished"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input status!",
                            },
                          ]}
                        >
                          <Radio.Group onChange={onChange} value={valueRadio}>
                            <Radio value={true}>Enable</Radio>
                            <Radio value={false}>Disable</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Form.Item labelCol={{ span: 24 }}>
                          <button
                            className="btn-add-prod"
                            onClick={(e) => {
                              e.preventDefault();
                              form.setFieldsValue({ isPublished: valueRadio });
                              form.submit();
                            }}
                          >
                            Create New
                          </button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row gutter={[20, 20]}>
                      <Col span={24}>
                        <Form.Item
                          label="Description"
                          name="product_description"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input description!",
                            },
                          ]}
                        >
                          <TextArea rows={5} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          label="IMG URL"
                          name="product_thumb"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input img url!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AddProductPage;
