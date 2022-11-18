import {Link, NavLink} from "react-router-dom";
import {Col, Dropdown, DropdownMenu, DropdownToggle, Row} from "reactstrap";
import megamenuImg from "../../../assets/images/megamenu-img.png";

import logo from "../../../assets/images/logo.svg";
import logoDark from "../../../assets/images/logo-dark.png";


import github from "../../../assets/images/brands/github.png";
import bitbucket from "../../../assets/images/brands/bitbucket.png";
import dribbble from "../../../assets/images/brands/dribbble.png";
import dropbox from "../../../assets/images/brands/dropbox.png";
import mail_chimp from "../../../assets/images/brands/mail_chimp.png";
import slack from "../../../assets/images/brands/slack.png";


import {ProfileMenu} from "./ProfileMenu";



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

                        <form className="app-search d-none d-lg-block">
                            <div className="position-relative">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={"Search" + "..."}
                                />
                                <span className="bx bx-search-alt"></span>
                            </div>
                        </form>

                        {/*MegaMeunu*/}
                        <Dropdown
                            className="dropdown-mega d-none d-lg-block ms-2"
                            isOpen={false}
                            toggle={() => {
                                // this.setState({ megaMenuDrp: !this.state.megaMenuDrp });
                            }}
                        >
                            <DropdownToggle className="btn header-item" caret tag="button">
                                {" "}
                                {"Mega Menu"}
                                <i className="mdi mdi-chevron-down"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-megamenu">
                                <Row>
                                    <Col sm={8}>
                                        <Row>
                                            <Col md={4}>
                                                <h5 className="font-size-14 mt-0">
                                                    {"UI Components"}
                                                </h5>
                                                <ul className="list-unstyled megamenu-list">
                                                    <li>
                                                        <Link to="#">{"Lightbox"}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{"Range Slider"}</Link>
                                                    </li>

                                                </ul>
                                            </Col>

                                            <Col md={4}>
                                                <h5 className="font-size-14 mt-0">
                                                    {"Applications"}
                                                </h5>
                                                <ul className="list-unstyled megamenu-list">
                                                    <li>
                                                        <Link to="#">{"Ecommerce"}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{"Calendar"}</Link>
                                                    </li>

                                                </ul>
                                            </Col>

                                            <Col md={4}>
                                                <h5 className="font-size-14 mt-0">
                                                    {"Extra Pages"}
                                                </h5>
                                                <ul className="list-unstyled megamenu-list">
                                                    <li>
                                                        <Link to="#">
                                                            {"Light Sidebar"}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">
                                                            {"Compact Sidebar"}
                                                        </Link>
                                                    </li>

                                                </ul>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={4}>
                                        <Row>
                                            <Col sm={6}>
                                                <h5 className="font-size-14 mt-0">
                                                    {"UI Components"}
                                                </h5>
                                                <ul className="list-unstyled megamenu-list">
                                                    <li>
                                                        <Link to="#">{"Lightbox"}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{"Range Slider"}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{"Sweet Alert"}</Link>
                                                    </li>
                                                </ul>
                                            </Col>

                                            <Col sm={5}>
                                                <div>
                                                    <img
                                                        src={megamenuImg}
                                                        alt=""
                                                        className="img-fluid mx-auto d-block"
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </DropdownMenu>
                        </Dropdown>
                        {/*MegaMeunuFin*/}
                    </div>








                {/*    Otro flex*/}

                    <div className="d-flex">
                        <Dropdown
                            className="d-none d-lg-inline-block ms-1"
                            isOpen={false}
                            toggle={() => {
                                // this.setState({ socialDrp: !this.state.socialDrp });
                            }}
                        >
                            <DropdownToggle
                                className="btn header-item noti-icon"
                                tag="button"
                            >
                                <i className="bx bx-customize"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-lg dropdown-menu-end">
                                <div className="px-lg-2">
                                    <Row className="no-gutters">
                                        <Col>
                                            <Link className="dropdown-icon-item" to="#">
                                                <img src={github} alt="Github" />
                                                <span>GitHub</span>
                                            </Link>
                                        </Col>
                                        <Col>
                                            <Link className="dropdown-icon-item" to="#">
                                                <img src={bitbucket} alt="bitbucket" />
                                                <span>Bitbucket</span>
                                            </Link>
                                        </Col>
                                        <Col>
                                            <Link className="dropdown-icon-item" to="#">
                                                <img src={dribbble} alt="dribbble" />
                                                <span>Dribbble</span>
                                            </Link>
                                        </Col>
                                    </Row>

                                    <Row className="no-gutters">
                                        <Col>
                                            <Link className="dropdown-icon-item" to="#">
                                                <img src={dropbox} alt="dropbox" />
                                                <span>Dropbox</span>
                                            </Link>
                                        </Col>
                                        <Col>
                                            <Link className="dropdown-icon-item" to="#">
                                                <img src={mail_chimp} alt="mail_chimp" />
                                                <span>Mail Chimp</span>
                                            </Link>
                                        </Col>
                                        <Col>
                                            <Link className="dropdown-icon-item" to="#">
                                                <img src={slack} alt="slack" />
                                                <span>Slack</span>
                                            </Link>
                                        </Col>
                                    </Row>
                                </div>
                            </DropdownMenu>
                        </Dropdown>

                        <div className="dropdown d-none d-lg-inline-block ms-1">
                            <button
                                type="button"
                                onClick={()=>{}}
                                className="btn header-item noti-icon"
                                data-toggle="fullscreen"
                            >
                                <i className="bx bx-fullscreen"></i>
                            </button>
                        </div>

                        {/*<NotificationDropdown />*/}
                        <ProfileMenu />

                    </div>



                </div>


















            </header>





        </>



    )
}