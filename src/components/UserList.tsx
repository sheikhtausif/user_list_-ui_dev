import React, { useEffect, useRef, useState } from 'react'
import User from './User';
import "../styles/userList.css";
import axios from 'axios';


const UserList: React.FC = () => {
    const [screenWidth, setScreenWidth] = useState<number>(window.screen.width);

    const tableBodyRef = useRef<HTMLTableSectionElement | null>(null);

    const [users, setUsers] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);

    const getUsers = async (page: number) => {
        console.log("page", page)
        const { data } = await axios.get(`https://reqres.in/api/users?page=${page}`);
        console.log('res:', data.data)

        setUsers(data.data);
    }

    useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenWidth(window.screen.width);
        });
    }, [screenWidth]);

    useEffect(() => {
        let isUserData = true;
        if (isUserData) {
            getUsers(page);
            isUserData = false;
        }
        return () => {
            isUserData = false;
        };
        
    }, [page]);

    const addMoreUsers = () => {
        let a = tableBodyRef?.current?.scrollTop
        let b = tableBodyRef?.current?.clientHeight
        let c = tableBodyRef?.current?.scrollHeight

        if (a && b && c) {
            if (a + b >= c - 50) {
                setPage(prev => prev + 1);
            }
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
                <tbody onScroll={addMoreUsers} ref={tableBodyRef}>
                    {users.map((user: any) => (
                        <User key={user.id}
                            user={user}
                            active={user.id % 2 === 0}
                            inactive={user.id % 3 === 0}
                            removed={user.id % 5 === 0}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserList