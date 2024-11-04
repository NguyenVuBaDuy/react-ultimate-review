import { Input, Modal, notification } from "antd"
import { useEffect, useState } from "react"
import { updateUserAPI } from "../../services/api.service"

const UpdateUser = (props) => {

    const [id, setId] = useState("")
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")

    const [loading, setLoading] = useState(false)

    const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdateUser,
        setDataUpdateUser, loadUser } = props

    useEffect(() => {
        if (dataUpdateUser) {
            setId(dataUpdateUser._id)
            setFullName(dataUpdateUser.fullName)
            setPhone(dataUpdateUser.phone)
        }
    }, [dataUpdateUser])

    const handleSubmitUpdateUser = async () => {
        setLoading(true)
        const res = await updateUserAPI(id, fullName, phone)
        if (res.data) {
            notification.success({
                message: "Update User",
                description: "Update User Successful!"
            })
            resetAndCloseModal()
            await loadUser()
        } else {
            notification.error({
                message: "Update User",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false)
    }

    const resetAndCloseModal = () => {
        setId("")
        setFullName("")
        setPhone("")
        setDataUpdateUser(null)
        setIsUpdateModalOpen(false)
    }

    return (
        <Modal
            title="Update Information User"
            open={isUpdateModalOpen}
            onOk={() => { handleSubmitUpdateUser() }}
            onCancel={() => { resetAndCloseModal() }}
            okButtonProps={{
                loading: loading
            }}
            centered>
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Id</span>
                    <Input
                        disabled
                        value={id} />
                </div>

                <div>
                    <span>Full name</span>
                    <Input
                        value={fullName}
                        onChange={event => setFullName(event.target.value)} />
                </div>

                <div>
                    <span>Phone number</span>
                    <Input
                        value={phone}
                        onChange={event => setPhone(event.target.value)} />
                </div>
            </div>
        </Modal >
    )
}

export default UpdateUser