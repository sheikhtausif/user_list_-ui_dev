import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/userModel.css'

interface ModelProps {
    user: any;
    show: boolean;
    onHide: () => void;
    active: boolean;
    inactive: boolean;
    removed: boolean;
}

const UserModel: React.FC<ModelProps> = ({ user, show, onHide, active, inactive, removed }) => {
    const { first_name, last_name, email, avatar } = user;
    const userEmail = email.split('.')[0];

    return (
        <Modal
            // width="30%"
            show={show}
            onHide={onHide}
            // size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <div className="userContainerModal">
                <p>Contact Details</p>
                <div className="userDetailsModel flex">
                    <div>
                        <img src={avatar} alt="userProfile" className='userProfile' />
                        <div className="userDetails">
                            <p>{`${first_name} ${last_name}`}</p>
                            <p>{`@${userEmail}`}</p>
                        </div>
                    </div>
                    {active ? <button className='userButton active'>Active</button> : inactive ? <button className='userButton inactive'>Inactive</button> : removed ? <button className='userButton removed'>Removed</button> : <button className='userButton'>No action</button>}
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam labore consequuntur molestiae reiciendis minus nemo natus odio, asperiores maiores veritatis, perspiciatis sunt? Sint delectus saepe laudantium atque quae fugit alias.</p>
            </div>
            <div className="moreContactDetails flex">
                <p>More Contact Details</p>
                <div className="contactButton flex">
                    <Button>Email</Button>
                    <Button>Phone</Button>
                </div>
            </div>
        </Modal>
    )
}

export default UserModel