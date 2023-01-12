import SimpleBar from "simplebar-react"
import {Link, NavLink} from "react-router-dom";
import {useEffect, useRef} from "react";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {AdminRoles} from "../model/Admin/AdminRoles";

export const SideBarContent = () => {

    const simpleBar = useRef<any>(undefined);

    useEffect(()=>{
        const sideUlMenu:HTMLUListElement = simpleBar.current
        const items = sideUlMenu.getElementsByTagName("a");
        const arrows:HTMLAnchorElement[] = Array.from(items).filter(item => item.classList.contains('has-arrow'));
        arrows.forEach((element:HTMLElement)=>{
            const subMenu:any = element.closest('li')?.querySelector('ul');
            element.addEventListener('click',()=>{
                subMenu.style.display === 'none' ? subMenu.style.display='' : subMenu.style.display='none';
            })
        })


    },[])

    const {sessionState} = useSessionStore();

    return(
        <>
            <SimpleBar className="h-100">
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu"  ref={simpleBar}>
                        {/*DashBoard*/}
                        <li>
                            <NavLink
                                to="/admin/dashboard"
                                className={({isActive}) => `${isActive ? 'text-primary bold' : ''}`}
                            >
                                <i className="bx bx-home-circle" />
                                <span>{"Dashboard"}</span>
                            </NavLink>
                        </li>

                        {/*Admin*/}

                        {(sessionState.actionAdmin?.role === AdminRoles.ROOT) &&
                            <>
                                <li className="menu-title">{"Administración"}</li>

                                <li>
                                    <a className="has-arrow">
                                        <i className="bx bx-home-circle" />
                                        <span>{"Administradores"}</span>
                                    </a>
                                    <ul className="sub-menu" aria-expanded="false" style={{display:'none'}}>
                                        <li>
                                            <NavLink
                                                to="/admin/createAdmin"
                                                className={({isActive}) => `${isActive ? 'text-primary bold' : ''}`}
                                            >
                                                {"Crear Administrador"}
                                            </NavLink>
                                        </li>
                                        {/*<li>*/}
                                        {/*    <Link to="#">{"Saas"}</Link>*/}
                                        {/*</li>*/}
                                        {/*<li>*/}
                                        {/*    <Link to="#">*/}
                                        {/*      <span*/}
                                        {/*          className="badge rounded-pill text-bg-success float-end"*/}
                                        {/*          key="t-new"*/}
                                        {/*      >*/}
                                        {/*        New*/}
                                        {/*      </span>{"Jobs"}*/}
                                        {/*    </Link>*/}
                                        {/*</li>*/}
                                    </ul>
                                </li>
                            </>
                        }














                        {/*<li>*/}
                        {/*    <a className="has-arrow">*/}
                        {/*        <i className="bx bx-home-circle" />*/}
                        {/*        <span>{"Dashboards"}</span>*/}
                        {/*    </a>*/}
                        {/*    <ul className="sub-menu" aria-expanded="false" style={{display:'none'}}>*/}
                        {/*        <li>*/}
                        {/*            <Link to="/dashboard">{"Default"}</Link>*/}
                        {/*        </li>*/}
                        {/*        <li>*/}
                        {/*            <Link to="#">{"Saas"}</Link>*/}
                        {/*        </li>*/}
                        {/*        <li>*/}
                        {/*            <Link to="#">*/}
                        {/*              <span*/}
                        {/*                  className="badge rounded-pill text-bg-success float-end"*/}
                        {/*                  key="t-new"*/}
                        {/*              >*/}
                        {/*                New*/}
                        {/*              </span>{"Jobs"}*/}
                        {/*            </Link>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*</li>*/}

                        {/*<li className="menu-title">{"Apps"}</li>*/}

                        {/*<li>*/}
                        {/*    <Link to="#" className="">*/}
                        {/*        <i className="bx bx-calendar" />*/}
                        {/*        <span>{"Calendar"}</span>*/}
                        {/*    </Link>*/}
                        {/*</li>*/}

                        {/*<li>*/}
                        {/*    <Link to="#" className="">*/}
                        {/*        <i className="bx bx-chat" />*/}
                        {/*        <span>{"Chat"}</span>*/}
                        {/*    </Link>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                        {/*    <Link to="#" className="">*/}
                        {/*        <i className="bx bx-file" />*/}
                        {/*        <span>{"File Manager"}</span>*/}
                        {/*    </Link>*/}
                        {/*</li>*/}

                        {/*<li>*/}
                        {/*    <a className="has-arrow">*/}
                        {/*        <i className="bx bx-store" />*/}
                        {/*        <span>{"Ecommerce"}</span>*/}
                        {/*    </a>*/}
                        {/*    <ul className="sub-menu" aria-expanded="false" style={{display:'none'}}>*/}
                        {/*        <li>*/}
                        {/*            <Link to="#">{"Products"}</Link>*/}
                        {/*        </li>*/}
                        {/*        <li>*/}
                        {/*            <Link to="#">{"Product Details"}</Link>*/}
                        {/*        </li>*/}

                        {/*    </ul>*/}
                        {/*</li>*/}


                        {/*<li>*/}
                        {/*    <a className="has-arrow">*/}
                        {/*        <i className="bx bx-envelope"></i>*/}
                        {/*        <span>{"Email"}</span>*/}
                        {/*    </a>*/}
                        {/*    <ul className="sub-menu" aria-expanded="false" style={{display:'none'}}>*/}
                        {/*        <li>*/}
                        {/*            <Link to="#">{"Inbox"}</Link>*/}
                        {/*        </li>*/}
                        {/*        <li>*/}
                        {/*            <Link to="#">{"Read Email"} </Link>*/}
                        {/*        </li>*/}

                        {/*    </ul>*/}
                        {/*</li>*/}

                    </ul>
                </div>
            </SimpleBar>

        </>
    )
}