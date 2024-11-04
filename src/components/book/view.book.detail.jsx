import { Drawer } from "antd"

const ViewBookDetail = (props) => {

    const { isViewBookDetailOpen, setIsViewBookDetailOpen, dataBookDetail, currency } = props

    return (
        <Drawer
            title="Book Detail"
            onClose={() => { setIsViewBookDetailOpen(false) }}
            open={isViewBookDetailOpen}>
            {dataBookDetail ?
                <>
                    <div>Id : {dataBookDetail._id}</div><br />
                    <div>Main text : {dataBookDetail.mainText}</div><br />
                    <div>Author : {dataBookDetail.author}</div><br />
                    <div>Category : {dataBookDetail.category}</div><br />
                    <div>Price : {currency(dataBookDetail.price)}</div><br />
                    <div>Quantity : {dataBookDetail.quantity}</div><br />
                    <div>Sold : {dataBookDetail.sold}</div><br />
                    <div>
                        <div>Thumbnail :</div>
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
                                objectPosition: "contain",
                            }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBookDetail.thumbnail}`} />
                        </div>
                    </div>
                </>
                :
                <div></div>}
        </Drawer >
    )
}

export default ViewBookDetail 