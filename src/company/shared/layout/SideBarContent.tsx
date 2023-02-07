import SimpleBar from "simplebar-react"
import {Link, NavLink} from "react-router-dom";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useSessionStore} from "../../../store/session/useSessionStore";

export const SideBarContent = () => {

    const simpleBar = useRef<any>(undefined);
    const [displayAdmin, setDisplayAdmin] = useState(false);
    const [displayCompany, setDisplayCompany] = useState(false);



    useEffect(()=>{

        const sideUlMenu:HTMLUListElement = simpleBar.current
        const items = sideUlMenu.getElementsByTagName("a");
        const arrows:HTMLAnchorElement[] = Array.from(items).filter(item => item.classList.contains('has-arrow'));
        arrows.forEach((element:HTMLElement)=>{
            const subMenu:any = element.closest('li')?.querySelector('ul');
            
            if(subMenu.dataset.menu === 'admin-module'){
                element.onclick = ()=>{
                    if( displayAdmin == false ){
                        subMenu.style.display = '';
                        setDisplayAdmin(true);
                    }else{
                        subMenu.style.display = 'none';
                        setDisplayAdmin(false);
                    }
                };
            }

            if(subMenu.dataset.menu === 'company-module'){
                element.onclick = ()=>{
                    if( displayCompany == false ){
                        subMenu.style.display = '';
                        setDisplayCompany(true);
                    }else{
                        subMenu.style.display = 'none';
                        setDisplayCompany(false);
                    }
                };
            }
        })


    });

    const {sessionState} = useSessionStore();

    return(
        <>
            <SimpleBar className="h-100">
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu"  ref={simpleBar}>
                        {/*DashBoard*/}
                        <li>
                            <NavLink
                                to="/empresa/dashboard"
                                className={({isActive}) => `${isActive ? 'text-primary bold' : ''}`}
                            >
                                <i className="bx bx-home-circle" />
                                <span>{"Dashboard"}</span>
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </SimpleBar>

        </>
    )
}