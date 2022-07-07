import React, { useEffect, useState } from 'react'
import visibility from '../images/visibility.png'
import '../styles/user.css'
import UserModel from './UserModel'

interface UserProps {
    user: any;
    active: boolean;
    inactive: boolean;
    removed: boolean;
}

const User: React.FC<UserProps> = ({ user, active, inactive, removed }) => {
    const { first_name, last_name, email, avatar } = user;

    const userEmail = email.split('.')[0];

    const [modalShow, setModalShow] = useState<boolean>(false);

    const [screenWidth, setScreenWidth] = useState<number>(window.screen.width);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenWidth(window.screen.width);
        });

    }, [screenWidth]);

    const onShow = () => {
        setModalShow(true);
    }

    return (
        <>
            <tr key={user.id + Date.now()}>
                <td className="userDetailsTD" key={1}>
                    <img src={avatar} alt="userProfile" className='userProfile' />
                    <div className="userDetails">
                        <p onClick={onShow}>{`${first_name} ${last_name}`}</p>
                        <p>{`@${userEmail}`}</p>
                    </div>
                </td>
                <td className='userEmail' key={2}>{email}</td>
                {screenWidth > 500 && <td key={3}>
                    {active ? <button className='userButton active'>Active</button> : inactive ? <button className='userButton inactive'>Inactive</button> : removed ? <button className='userButton removed'>Removed</button> : <button className='userButton'>No action</button>}
                </td>}
                {screenWidth > 500 && <td key={4}>
                    <img src={visibility} alt="visibilityIcon" className='userVisibility' />
                </td>}
            </tr>

            <UserModel
                user={user}
                active={active}
                inactive={inactive}
                removed={removed}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default User