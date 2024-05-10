import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Menu, Spin } from 'antd';
import CryptocurrencyCard from './CryptocurrencyCard';
import { AuthContext } from '../AuthContext';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const Home = ({ onLogout }) => {
    const [userInfo, setUserInfo] = useState({});
    const [currencies, setCurrencies] = useState([]);
    const [currencyId, setCurrencyId] = useState(1);
    const [currencyData, setCurrencyData] = useState(null);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/users/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserInfo(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchCurrencies = () => {
            axios.get('http://127.0.0.1:8000/cryptocurrencies', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(r => {
                const currenciesResponse = r.data;
                const menuItems = [
                    getItem('Список Криптовалют', 'g1', null, currenciesResponse.map(c => {
                        return { label: c.name, key: c.id };
                    }), 'group')
                ];
                setCurrencies(menuItems);
            }).catch(error => {
                console.error('Error fetching currencies:', error);
            });
        };

        if (token) {
            fetchUserInfo();
            fetchCurrencies();
        }
    }, [token]);

    useEffect(() => {
        if (!currencyId) return;
        const fetchCurrency = () => {
            axios.get(`http://127.0.0.1:8000/cryptocurrencies/${currencyId}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(r => {
                setCurrencyData(r.data);
            }).catch(error => {
                console.error('Error fetching currency data:', error);
            });
        };
        fetchCurrency();
    }, [currencyId, token]);

    const onClick = (e) => {
        setCurrencyId(e.key);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div className="top-bar">
                <span>{userInfo.username}</span>
                <button onClick={onLogout} style={{ marginLeft: '15px' }}>Logout</button>
            </div>
            <div style={{ display: 'flex', flexGrow: 1 }}>
                <Menu
                    onClick={onClick}
                    style={{ width: 256 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={currencies}
                    className='menu-full-height custom-scrollbar'
                />
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {currencyData ? <CryptocurrencyCard currency={currencyData} /> : <Spin size="large" />}
                </div>
            </div>
        </div>
    );
};

export default Home;
