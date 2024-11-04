import { Form, Input, InputNumber, Modal, notification, Select } from "antd"
import { useForm } from "antd/es/form/Form"
import { useEffect, useState } from "react"
import { handleUploadFile, updateBookAPI } from "../../services/api.service"

const UpdateBook = (props) => {

    const { setDataBookUpdate, dataBookUpdate, setIsUpdateBookModalOpen, isUpdateBookModalOpen, loadBook } = props

    const [form] = useForm()

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (dataBookUpdate && dataBookUpdate._id) {
            form.setFieldsValue({
                id: dataBookUpdate._id,
                mainText: dataBookUpdate.mainText,
                author: dataBookUpdate.author,
                price: dataBookUpdate.price,
                quantity: dataBookUpdate.quantity,
                category: dataBookUpdate.category
            })
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBookUpdate.thumbnail}`)
        }
    }, [dataBookUpdate])

    const resetAndCloseModal = () => {
        setIsUpdateBookModalOpen(false)
        setDataBookUpdate(null)
        setPreview(null)
        setSelectedFile(null)
        form.resetFields()
    }

    const callApiUpdateBook = async (values, newThumbnail) => {
        const resUpdateBook = await updateBookAPI(
            values.id,
            newThumbnail,
            values.mainText,
            values.author,
            values.price,
            values.quantity,
            values.category)
        if (resUpdateBook.data) {
            notification.success({
                message: "Update Book",
                description: "Update Book Successful"
            })
            resetAndCloseModal()
            await loadBook()
        } else {
            notification.error({
                message: "Update Book",
                description: JSON.stringify(res.message)
            })
        }
    }

    const handleSubmitButton = async (values) => {
        setLoading(true)
        let newThumbnail = ""
        if (!preview && !selectedFile) {
            return
        } else if (!selectedFile && preview) {
            newThumbnail = dataBookUpdate.thumbnail
        } else {
            const resUpload = await handleUploadFile(selectedFile, "book")

            if (resUpload.data) {
                newThumbnail = resUpload.data.fileUploaded
            } else {
                notification.error({
                    message: "Error Update Book",
                    description: JSON.stringify(resUpload.message)
                })
                return
            }
        }
        await callApiUpdateBook(values, newThumbnail)
        setLoading(false)
    }


    const handleOnChangFile = (event) => {
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

    return (
        <Modal
            title="Update Book"
            open={isUpdateBookModalOpen}
            onOk={() => form.submit()}
            onCancel={() => { resetAndCloseModal() }}
            okText="Save"
            okButtonProps={{
                loading: loading
            }}
            centered>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmitButton}>
                <Form.Item
                    label="Id"
                    name="id"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="Main text"
                    name="mainText"
                    rules={[
                        {
                            required: true,
                            message: 'Main text cannot be left blank!',
                        },

                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Author"
                    name="author"
                    rules={[
                        {
                            required: true,
                            message: 'Author cannot be left blank!',
                        },

                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Price"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Price cannot be left blank!',
                        },

                    ]}>
                    <InputNumber style={{ width: "100%" }} addonAfter="₫" />
                </Form.Item>

                <Form.Item label="Quantity"
                    name="quantity"
                    rules={[
                        {
                            required: true,
                            message: 'Quantity cannot be left blank!',
                        },

                    ]}>
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

                <label htmlFor="btnUploadThumbnail" style={{
                    display: "block",
                    width: "fit-content",
                    marginTop: "15px",
                    padding: "5px 10px",
                    background: "orange",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}>Upload</label>
                <input id="btnUploadThumbnail" hidden
                    style={{ display: "none" }}
                    type="file"
                    onChange={(event) => { handleOnChangFile(event) }}
                    onClick={(event) => { event.target.value = null }} />
                {preview &&
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
                    </div>}
            </Form>
        </Modal>
    )
}

export default UpdateBook