import { useContext } from "react"
import { AuthContext } from "../components/context/auth.context"
import { Button, Result } from "antd"
import { Link } from "react-router-dom"


const PrivateRoute = (props) => {

    const { user } = useContext(AuthContext)

    return (
        <>
            {user && user.id ?
                <>
                    {props.children}
                </>
                :
                <>
                    <Result
                        status="403"
                        title="Unauthorize!"
                        subTitle="You need to log in to access this section"
                        extra={<Button type="primary"><Link to={'/login'}>Log in</Link></Button>}
                    />
                </>}
        </>
    )
}

export default PrivateRoute