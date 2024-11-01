import { BookOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';

const items = [
    {
        label: 'Home',
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label: 'User',
        key: 'user',
        icon: <UserOutlined />,
    },
    {
        label: 'Book',
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