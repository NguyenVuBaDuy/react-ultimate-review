import { Form, Input, Modal, notification } from "antd"
import { createUserAPI } from "../../services/api.service";

const CreateUser = (props) => {

    const { isCreateModalOpen, setIsCreateModalOpen, loadUser } = props

    const [form] = Form.useForm();

    const handleSubmitCreateUser = async values => {
        if (values) {
            const { fullName, email, password, phone } = values
            const res = await createUserAPI(fullName, email, password, phone)
            if (res.data) {
                notification.success({
                    message: "Create User",
                    description: "Create User Successful!"
                })
                resetAndCloseModal()
                await loadUser()
            } else {
                notification.error({
                    message: "Create User",
                    description: JSON.stringify(res.message)
                })
            }
        }
    }

    const resetAndCloseModal = () => {
        setIsCreateModalOpen(false)
        form.resetFields()
    }

    return (
        <Modal
            title="Basic Modal"
            open={isCreateModalOpen}
            onOk={() => { form.submit() }}
            onCancel={() => { resetAndCloseModal() }}
            centered>
            <Form
                form={form}
                name="control-hooks"
                layout="vertical"
                onFinish={(values) => { handleSubmitCreateUser(values) }}
            >
                <Form.Item
                    name="fullName"
                    label="Full Name"
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Your Full Name!"
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Your Email!"
                        },
                        {
                            type: "email",
                            message: "Email Error!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Your Password!"
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Your Phone Number!"
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateUser

