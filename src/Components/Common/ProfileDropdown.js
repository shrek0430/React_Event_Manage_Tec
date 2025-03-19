import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import avatar1 from "../../assets/images/users/avatar-2.jpg";
import BaseDropdown from "../Base/Dropdown";
import { DropDown } from "../../Components/constants/LoginConstant";


const ProfileDropdown = () => {
    const profiledropdownData = createSelector(
        (state) => state.Profile,
        (state) => ({ user: state.user })
    );

    const { user } = useSelector(profiledropdownData);
    const [userName, setUserName] = useState("Admin");

    useEffect(() => {
        if (sessionStorage.getItem("authUser")) {
            const obj = JSON.parse(sessionStorage.getItem("authUser"));
            setUserName(
                process.env.REACT_APP_DEFAULTAUTH === "fake"
                    ? obj.username || user.first_name || "Admin"
                    : process.env.REACT_APP_DEFAULTAUTH === "firebase"
                    ? obj.email || "Admin"
                    : "Admin"
            );
        }
    }, [user]);

    const dropdownItems = [
        <h6 className="dropdown-header">Welcome {userName}!</h6>,
        <Link to="/profile" className="dropdown-item">
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
            <span className="align-middle">{DropDown.Profile}</span>
        </Link>,
        <Link to="/change-password" className="dropdown-item">
            <i className="mdi mdi-lock-reset text-muted fs-16 align-middle me-1"></i>
            <span className="align-middle">{DropDown.ChangePassword}</span>
        </Link>,
        <div className="dropdown-divider"></div>,
        <Link to="/logout" className="dropdown-item">
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
            <span className="align-middle">{DropDown.Logout}</span>
        </Link>,
    ];

    return (
        <BaseDropdown
            toggleText={
                <span className="d-flex align-items-center">
                    <img className="rounded-circle header-profile-user" src={avatar1} alt="Avatar" />
                    <span className="text-start ms-xl-2 d-none d-xl-inline-block fw-medium user-name-text">
                        {userName}
                    </span>
                </span>
            }
            items={dropdownItems}
            className="ms-sm-3 header-item topbar-user"
            buttonClass="btn"
        />
    );
};

export default ProfileDropdown;
