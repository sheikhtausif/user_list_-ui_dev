import React, { useEffect, useState } from 'react'
import User from './User';
import "../styles/userList.css";
import axios from 'axios';


const UserList: React.FC = () => {
    const [screenWidth, setScreenWidth] = useState<number>(window.screen.width);

    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);

    const getUsers = async (page: number) => {
        const { data } = await axios.get(`https://reqres.in/api/users?page=${page}`);
        // console.log('res:', data.data)

        if (page > 1) {
            setUsers([...users, ...data.data]);
        }
        else {
            setUsers(data.data);
        }
        setLoading(false);
    }

    useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenWidth(window.screen.width);
        });
    }, [screenWidth]);

    useEffect(() => {
        getUsers(page);
        // eslint-disable-next-line
    }, []);

    const addMoreUsers = (event: any) => {
        let a = event.target.scrollTop
        let b = event.target.clientHeight
        let c = event.target.scrollHeight

        if (a + b >= c - 50) {
            getUsers(page + 1);
            setPage(prev => prev + 1);
            setLoading(true);
        }
    }

    return (
        <div className="userListContainer">
            <div className="userListHead flex">
                <p>Visitors</p>
                <button>Add Visitor</button>
            </div>
            <table className='tableFixed'>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        {screenWidth > 500 && <th>STATUS</th>}
                        {screenWidth > 500 && <th>ACTIONS</th>}
                    </tr>
                </thead>
                {!loading && <tbody onScroll={addMoreUsers}>
                    {users.map((user: any) => (
                        <User key={user.id}
                            user={user}
                            active={user.id % 2 === 0}
                            inactive={user.id % 3 === 0}
                            removed={user.id % 5 === 0}
                        />
                    ))}
                </tbody>}
            </table>
        </div>
    )
}

export default UserList