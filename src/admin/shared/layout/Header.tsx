import {Link, NavLink} from "react-router-dom";
import {Col, Dropdown, DropdownMenu, DropdownToggle, Row} from "reactstrap";


import logo from "../../../assets/images/logo.svg";
import logoDark from "../../../assets/images/logo-dark.png";


import github from "../../../assets/images/brands/github.png";
import bitbucket from "../../../assets/images/brands/bitbucket.png";
import dribbble from "../../../assets/images/brands/dribbble.png";
import dropbox from "../../../assets/images/brands/dropbox.png";
import mail_chimp from "../../../assets/images/brands/mail_chimp.png";
import slack from "../../../assets/images/brands/slack.png";


import {ProfileMenu} from "./ProfileMenu";
import {MegaMenu} from "./MegaMenu";
import {SearchForm} from "./SearchForm";
import {SocialMenu} from "./SocialMenu";



export const Header = () => {

    return(
        <>
            <header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex">
                        <div className="navbar-brand-box">
                            <Link to="/" className="logo logo-dark">
                                <span className="logo-sm">
                                  <img src={logo} alt="" height="22" />
                                </span>
                                <span className="logo-lg">
                                    <img src={logoDark} alt="" height="17" />
                                </span>
                            </Link>
                        </div>
                        <button
                            type="button"
                            onClick={()=>{}}
                            className="btn btn-sm px-3 font-size-16 header-item"
                            id="vertical-menu-btn"
                        >
                            <i className="fa fa-fw fa-bars"></i>
                        </button>
                        {/*<SearchForm/>*/}
                        {/*<MegaMenu/>*/}
                    </div>








                {/*    Otro flex*/}

                    <div className="d-flex">
                        {/*<SocialMenu/>*/}

                        {/*<div className="dropdown d-none d-lg-inline-block ms-1">*/}
                        {/*    <button*/}
                        {/*        type="button"*/}
                        {/*        onClick={()=>{}}*/}
                        {/*        className="btn header-item noti-icon"*/}
                        {/*        data-toggle="fullscreen"*/}
                        {/*    >*/}
                        {/*        <i className="bx bx-fullscreen"></i>*/}
                        {/*    </button>*/}
                        {/*</div>*/}

                        {/*<NotificationDropdown />*/}
                        <ProfileMenu />

                    </div>



                </div>


















            </header>





        </>



    )
}