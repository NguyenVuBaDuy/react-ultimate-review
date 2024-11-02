import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { fetchAllUserAPI } from "../../services/api.service";
import CreateUser from "./create.user";

const UserTable = () => {

    const [dataUser, setDataUser] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(10)

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

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
                    <EditOutlined style={{ cursor: "pointer", color: "orange" }} />
                    <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                </div>
            )
        }
    ];

    const onChange = (values) => {
        if (values) {
            setCurrent(values.current)
            setPageSize(values.pageSize)
        }
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <h3>Table Users</h3>
                <Button
                    type='primary'
                    onClick={() => { setIsCreateModalOpen(true) }}>Create Book</Button>
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
        </>
    )
}

export default UserTable