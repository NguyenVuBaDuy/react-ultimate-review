import { Form, Input, InputNumber, Modal, notification, Select } from "antd"
import { useForm } from "antd/es/form/Form"
import { useState } from "react"
import { createBookAPI, handleUploadFile } from "../../services/api.service"

const CreateBook = (props) => {

    const { isCreateBookModalOpen, setIsCreateBookModalOpen, loadBook } = props

    const [form] = useForm()

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const [loading, setLoading] = useState(false)

    const delay = (milSeconds) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, milSeconds)
        })
    }

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

    const handleSubmitCreateUser = async (values) => {
        if (!selectedFile) {
            notification.error({
                message: "Upload Thumbnail",
                description: "Please add thumbnail!"
            })
            return
        }
        const { mainText, author, price, quantity, category } = values
        setLoading(true)
        await delay(2000)
        const resUpload = await handleUploadFile(selectedFile, "book")
        if (resUpload.data) {
            const newThumbnail = resUpload.data.fileUploaded

            const resCreateBook = await createBookAPI(newThumbnail, mainText, author, price, quantity, category)
            if (resCreateBook.data) {

                resetAndCloseModal()

                notification.success({
                    message: "Create Book",
                    description: "Create Book Successful!"
                })

                await loadBook()
            } else {
                notification.error({
                    message: "Create Book",
                    description: JSON.stringify(resCreateBook.message)
                })
            }
        } else {
            notification.error({
                message: "Upload Thumbnail",
                description: JSON.stringify(resUpload.message)
            })
        }
        setLoading(false)
    }

    const resetAndCloseModal = () => {
        setIsCreateBookModalOpen(false)
        setPreview(null)
        setSelectedFile(null)
        form.resetFields()
    }

    return (
        <Modal
            title="Create Book"
            open={isCreateBookModalOpen}
            onOk={() => { form.submit() }}
            onCancel={() => { resetAndCloseModal() }}
            centered
            okText="Create"
            okButtonProps={{
                loading: loading
            }}>

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
                    <div>Thumbnail:</div>
                    <label
                        htmlFor="btnUploadThumbnail"
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
                        id="btnUploadThumbnail"
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
                                    objectFit: "contain",
                                    objectPosition: "center",
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