import { Form, Input, InputNumber, Modal, Select } from "antd"
import { useForm } from "antd/es/form/Form"
import { useState } from "react"

const CreateBook = (props) => {

    const { isCreateBookModalOpen, setIsCreateBookModalOpen } = props

    const [form] = useForm()

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)


    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            selectedFile(null)
            setPreview(null)
            return
        }

        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmitCreateUser = (event) => {

    }

    const resetAndCloseModal = () => {
        setIsCreateBookModalOpen(false)
    }

    return (
        <Modal
            title="Create Book"
            open={isCreateBookModalOpen}
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
                    name="mainText"
                    label="Main Text"
                    rules={[
                        {
                            required: true,
                            message: "Please input main text!"
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="author"
                    label="Author"
                    rules={[
                        {
                            required: true,
                            message: "Please input author!"
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Price"
                    rules={[
                        {
                            required: true,
                            message: "Please input price!"
                        },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    name="quantity"
                    label="Quantity"
                    rules={[
                        {
                            required: true,
                            message: "Please input quantity"
                        },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item label="Category"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: 'Please select category!',
                        },

                    ]}>
                    <Select
                        style={{ width: '100%', marginBottom: "10px" }}
                        const options={[
                            { value: 'Arts', label: 'Arts' },
                            { value: 'Business', label: 'Business' },
                            { value: 'Comics', label: 'Comics' },
                            { value: 'Cooking', label: 'Cooking' },
                            { value: 'Entertainment', label: 'Entertainment' },
                            { value: 'History', label: 'History' },
                            { value: 'Music', label: 'Music' },
                            { value: 'Sports', label: 'Sports' },
                            { value: 'Teen', label: 'Teen' },
                            { value: 'Travel', label: 'Travel' }
                        ]}
                    />
                </Form.Item>

                <div>
                    <label
                        htmlFor="btnUploadFile"
                        style={{
                            display: "block",
                            width: "fit-content",
                            marginTop: "15px",
                            padding: "5px 10px",
                            background: "orange",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}> Upload</label>
                    <input
                        type="file"
                        id="btnUploadFile"
                        hidden
                        onChange={(event) => {
                            handleOnChangeFile(event)
                        }}
                        onClick={(event) => {
                            event.target.value = null
                        }}
                        style={{ display: "none" }}
                    />

                    {preview &&
                        <>
                            <div style={{
                                marginTop: "10px",
                                height: "150px",
                                width: "150px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <img style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                    borderRadius: "50%"
                                }}
                                    src={preview} />
                            </div>
                        </>
                    }
                </div>

            </Form>
        </Modal>
    )
}

export default CreateBook