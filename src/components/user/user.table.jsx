import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, notification, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { deleteUserAPI, fetchAllUserAPI } from "../../services/api.service";
import CreateUser from "./create.user";
import UpdateUser from "./update.user";

const UserTable = () => {

    const [dataUser, setDataUser] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(10)

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const [dataUpdateUser, setDataUpdateUser] = useState(null)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

    useEffect(() => {
        loadUser()
    }, [current, pageSize])


    const loadUser = async () => {
        const res = await fetchAllUserAPI(current, pageSize)
        if (res.data) {
            setDataUser(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }



    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return (
                    <div>{(pageSize * (current - 1)) + (index + 1)}</div>
                )
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => (
                <a href="#">
                    {record._id}
                </a>
            )
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Action",
            render: (_, record) => (
                <div style={{
                    display: "flex",
                    gap: "15px"
                }}>
                    <EditOutlined
                        style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            setIsUpdateModalOpen(true)
                            setDataUpdateUser(record)
                        }} />

                    <Popconfirm
                        title="Delete the user"
                        description="Are you sure to delete this user?"
                        onConfirm={() => { handleDeleteUser(record._id) }}
                        onCancel={() => { }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            )
        }
    ];

    const onChange = (pagination) => {
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current)
            }
        }

        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
    };

    const handleDeleteUser = async (id) => {
        const res = await deleteUserAPI(id);
        if (res.data) {
            notification.success({
                message: "Delete User",
                description: "Delete User Successful!"
            })
        } else {
            notification.error({
                message: "Error delete user",
                description: JSON.stringify(res.message)
            })
        }
        await loadUser()
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <h3>Table Users</h3>
                <Button
                    type='primary'
                    onClick={() => { setIsCreateModalOpen(true) }}>Create User</Button>
            </div>

            <Table
                dataSource={dataUser}
                columns={columns}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total}</div>) }
                    }}
                onChange={onChange} />

            <CreateUser
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
                loadUser={loadUser} />

            <UpdateUser
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdateUser={dataUpdateUser}
                setDataUpdateUser={setDataUpdateUser}
                loadUser={loadUser} />
        </>
    )
}

export default UserTable