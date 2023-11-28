import { Row, Col, Form, Input, Radio } from "antd";
import "./addProdPage.scss";
import { useState } from "react";

const UpdateProductPage = () => {
  const { TextArea } = Input;
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  //radio
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <>
      <h2>Create New Product</h2>
      <div style={{ background: "#f5f5f5" }}>
        <Row>
          <Col className="container-form-add" span={24}>
            <div className="main-form-add" style={{ padding: "10px" }}>
              <Form
                name="basic"
                onFinish={onFinish}
                style={{ background: "#ffffff", padding: "30px" }}
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
                          <Input />
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
                          <Input />
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
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Category"
                          name="product_category"
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
                          name="product_type"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Please input status!",
                            },
                          ]}
                        >
                          <Radio.Group onChange={onChange} value={value}>
                            <Radio value={1}>Enable</Radio>
                            <Radio value={2}>Disable</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Form.Item labelCol={{ span: 24 }}>
                          <button className="btn-add-prod">Create New</button>
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

export default UpdateProductPage;
