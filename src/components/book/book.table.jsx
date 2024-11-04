import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Popconfirm, Table } from "antd"
import { useEffect, useState } from "react"
import { fetchAllBookAPI } from "../../services/api.service"
import CreateBook from "./create.book"

const BookTable = () => {

    const [dataBook, setDataBook] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(10)

    const [isCreateBookModalOpen, setIsCreateBookModalOpen] = useState(false)

    useEffect(() => {
        loadBook()
    }, [current, pageSize])

    const loadBook = async () => {
        const res = await fetchAllBookAPI(current, pageSize)
        if (res.data) {
            setDataBook(res.data.result)
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
                <a
                    href="#"
                    onClick={() => { }} >
                    {record._id}
                </a >
            )
        },
        {
            title: 'Main text',
            dataIndex: 'mainText',
        },
        {
            title: "Price",
            dataIndex: "price"
        },
        {
            title: "Quantity",
            dataIndex: "quantity"
        },
        {
            title: "Author",
            dataIndex: "author"
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
                        }} />

                    <Popconfirm
                        title="Delete the user"
                        description="Are you sure to delete this user?"
                        onConfirm={() => { }}
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

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <h3>Table Books</h3>
                <Button
                    type='primary'
                    onClick={() => { setIsCreateBookModalOpen(true) }}>Create Book</Button>
            </div>
            <Table
                dataSource={dataBook}
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

            <CreateBook
                setIsCreateBookModalOpen={setIsCreateBookModalOpen}
                isCreateBookModalOpen={isCreateBookModalOpen}
                loadBook={loadBook} />

        </>
    )
}

export default BookTable