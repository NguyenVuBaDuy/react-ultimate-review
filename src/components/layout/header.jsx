import { BookOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const items = [
    {
        label: <Link to={'/'}>Home</Link>,
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label: <Link to={'/user'}>User</Link>,
        key: 'user',
        icon: <UserOutlined />,
    },
    {
        label: <Link to={'/book'}>Book</Link>,
        key: 'book',
        icon: <BookOutlined />,
    }
]

const Header = () => {
    const [current, setCurrent] = useState('mail')

    const onClick = event => {
        setCurrent(event.key)
    };

    return (
        <Menu onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />
    )
}

export default Header