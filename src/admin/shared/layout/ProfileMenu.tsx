import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

import user1 from "../../../assets/images/users/avatar-1.jpg";
import {Link} from "react-router-dom";

export const ProfileMenu = () => {
    return(
        <>
            <Dropdown
                isOpen={false}
                toggle={()=> {}}
                className="d-inline-block"
            >
                <DropdownToggle
                    className="btn header-item"
                    id="page-header-user-dropdown"
                    tag="button"
                >
                    <img
                        className="rounded-circle header-profile-user"
                        src={user1}
                        alt="Header Avatar"
                    />{" "}
                    <span className="d-none d-xl-inline-block ms-1" onClick={()=>{console.log("hola")}}>
              {'Cesar'}
            </span>
                    <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem tag="a" href="/profile">
                        <i className="bx bx-user font-size-16 align-middle ms-1" />
                        {"Profile"}
                    </DropdownItem>
                    <DropdownItem tag="a" href="#">
                        <i className="bx bx-wallet font-size-16 align-middle me-1" />
                        {"My Wallet"}
                    </DropdownItem>
                    <DropdownItem tag="a" href="#">
                        <span className="badge bg-success float-end">11</span>
                        <i className="bx bx-wrench font-size-17 align-middle me-1" />
                        {"Settings"}
                    </DropdownItem>
                    <DropdownItem tag="a" href="#">
                        <i className="bx bx-lock-open font-size-16 align-middle me-1" />
                        {"Lock screen"}
                    </DropdownItem>
                    <Link to="/logout" className="dropdown-item">
                        <i className="bx bx-lock-open font-size-16 align-middle me-1" />
                        <span>{"Logout"}</span>
                    </Link>
                    <div className="dropdown-divider" />
                    <Link to="/logout" className="dropdown-item">
                        <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
                        <span>{"Logout"}</span>
                    </Link>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}