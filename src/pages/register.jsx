import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerUserAPI } from "../services/api.service";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()

    const handleSubmitRegister = async (values) => {
        const { fullName, email, password, phone } = values
        const res = await registerUserAPI(fullName, email, password, phone)
        if (res.data) {
            notification.success({
                message: "Register User",
                description: "Register User Successful!"
            })
            navigate("/login")
        } else {
            notification.error({
                message: "Register User",
                description: JSON.stringify(res.message)
            })
        }
    }

    return (
        <Form
            form={form}
            onFinish={handleSubmitRegister}
            layout="vertical"
            style={{ margin: "30px" }}
            autoComplete="off"
        >

            <h2 style={{ textAlign: "center" }}>Sign Up</h2>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="fullName"
                        label="Full name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your full name!"
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email!"
                            },
                            {
                                type: "email",
                                message: "Email is not in correct format"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your password!"
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        name="phone"
                        label="Phone number"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your phone number!"
                            },
                            {
                                required: true,
                                pattern: new RegExp(/\d+/g),
                                message: "Phone number is not in correct format!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <div>
                        <Button type="primary" onClick={() => { form.submit() }}>Register</Button>
                    </div>
                    <Divider />
                    <div>Already have an account? <Link to={"/login"}>Sign in here</Link></div>
                </Col>
            </Row>
        </Form>
    )
}
export default RegisterPage