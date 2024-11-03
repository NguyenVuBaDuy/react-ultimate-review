import { Drawer, notification } from "antd"
import { useState } from "react"
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.service"

const ViewUserDetail = (props) => {

    const { isViewDetailUserOpen, setIsViewUserDetailOpen, dataViewDetailUser, loadUser } = props

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

    const handleSubmitUploadFile = async () => {
        if (!selectedFile) {
            setSelectedFile(null)
            setPreview(null)
            return
        }
        const resUploadFile = await handleUploadFile(selectedFile, "avatar")
        if (resUploadFile.data) {
            const newAvatar = resUploadFile.data.fileUploaded

            const resUpdateAvatar = await updateUserAvatarAPI(
                newAvatar,
                dataViewDetailUser._id,
                dataViewDetailUser.fullName,
                dataViewDetailUser.email,
                dataViewDetailUser.phone
            )

            if (resUpdateAvatar.data) {
                setSelectedFile(null)
                setPreview(null)
                setIsViewUserDetailOpen(false)
                await loadUser()

                notification.success({
                    message: "Upload Avatar",
                    description: "Upload Avatar Successful!"
                })
            } else {
                notification.error({
                    message: "Upload Avatar",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }
        } else {
            notification.error({
                message: "Upload File",
                description: JSON.stringify(resUploadFile.message)
            })
        }
    }



    return (
        <Drawer
            title="User Detail"
            onClose={() => {
                setIsViewUserDetailOpen(false)
                setSelectedFile(null)
                setPreview(null)
            }}
            open={isViewDetailUserOpen}>
            {dataViewDetailUser ?
                <>
                    <div>Id : {dataViewDetailUser._id}</div><br />
                    <div>Full name : {dataViewDetailUser.fullName}</div><br />
                    <div>Email : {dataViewDetailUser.email}</div><br />
                    <div>Phone number : {dataViewDetailUser.phone}</div><br />
                    <div>
                        <div>Avatar :</div>
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
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataViewDetailUser.avatar}`} />
                        </div>
                    </div>
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
                                <div style={{
                                    display: "block",
                                    width: "fit-content",
                                    marginTop: "15px",
                                    padding: "5px 10px",
                                    background: "blue",
                                    color: "white",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                                    onClick={() => {
                                        handleSubmitUploadFile()
                                    }}>Save</div>
                            </>
                        }
                    </div>
                </>
                :
                <div></div>}
        </Drawer >
    )
}

export default ViewUserDetail