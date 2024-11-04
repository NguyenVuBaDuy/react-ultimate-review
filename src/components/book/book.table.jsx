import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, notification, Popconfirm, Table } from "antd"
import { useEffect, useState } from "react"
import { deleteBookAPI, fetchAllBookAPI } from "../../services/api.service"
import CreateBook from "./create.book"
import ViewBookDetail from "./view.book.detail"
import UpdateBook from "./update.book"

const BookTable = () => {

    const [dataBook, setDataBook] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(10)

    const [isCreateBookModalOpen, setIsCreateBookModalOpen] = useState(false)

    const [isViewBookDetailOpen, setIsViewBookDetailOpen] = useState(false)
    const [dataBookDetail, setDataBookDetail] = useState(null)

    const [isUpdateBookModalOpen, setIsUpdateBookModalOpen] = useState(false)
    const [dataBookUpdate, setDataBookUpdate] = useState(null)

    useEffect(() => {
        loadBook()
    }, [current, pageSize])

    const currency = (money) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money)
    }

    const loadBook = async () => {
        const res = await fetchAllBookAPI(current, pageSize)
        if (res.data) {
            setDataBook(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    const handleDeleteBook = async (id) => {
        const res = await deleteBookAPI(id)
        if (res.data) {
            notification.success({
                message: "Delete Book",
                description: "Delete Book Successdful!"
            })
            await loadBook()
        } else {
            notification.error({
                message: "Delete Book",
                description: JSON.stringify(res.message)
            })
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
                    onClick={() => {
                        setDataBookDetail(record)
                        setIsViewBookDetailOpen(true)
                    }} >
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
            dataIndex: "price",
            render: (_, record) => (
                <div>{currency(record.price)}</div>
            )
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
                            setIsUpdateBookModalOpen(true)
                            setDataBookUpdate(record)
                        }} />

                    <Popconfirm
                        title="Delete the user"
                        description="Are you sure to delete this user?"
                        onConfirm={() => { handleDeleteBook(record._id) }}
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
                loadBook={loadBook}
            />
            <ViewBookDetail
                isViewBookDetailOpen={isViewBookDetailOpen}
                setIsViewBookDetailOpen={setIsViewBookDetailOpen}
                dataBookDetail={dataBookDetail}
                currency={currency}
            />

            <UpdateBook
                setDataBookUpdate={setDataBookUpdate}
                dataBookUpdate={dataBookUpdate}
                setIsUpdateBookModalOpen={setIsUpdateBookModalOpen}
                isUpdateBookModalOpen={isUpdateBookModalOpen}
                loadBook={loadBook}
            />

        </>
    )
}

export default BookTable