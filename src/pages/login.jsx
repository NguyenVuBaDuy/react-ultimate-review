import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd"
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";

const LoginPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()

    const handleSubmitFormLogin = async (values) => {
        const res = await loginAPI(values.email, values.password)
        if (res.data) {
            message.success("Log in successfully")
            navigate("/")
        } else {
            notification.error({
                message: "Login",
                description: JSON.stringify(res.message)
            })
        }
    }

    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset
                    style={{
                        padding: "15px",
                        margin: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px"
                    }}>
                    <legend>Log in</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={(values) => { handleSubmitFormLogin(values) }}
                        autoComplete="off">
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!"
                                },
                                {
                                    type: "email",
                                    message: "Email is not in correct format"
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Button
                                    type="primary"
                                    onClick={() => form.submit()}
                                >
                                    Log in </Button>

                                <Link to={"/"}>Go to home page <ArrowRightOutlined /></Link>
                            </div>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <div>Don't have an account yet? <Link to={"/register"}>Register here</Link></div>
                </fieldset>
            </Col>
        </Row>
    )
}

export default LoginPage