import SimpleBar from "simplebar-react"
import {Link, NavLink} from "react-router-dom";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {useCompanySessionStore} from "../../../store/compnay/useCompanySessionStore";
import {useWorkplaceSessionStore} from "../../../store/workplace/useWorkplaceSessionStore";

export const SideBarContent = () => {

    const simpleBar = useRef<any>(undefined);
    const [displayBaseline, setDisplayBaseline] = useState(false);




    useEffect(()=>{

        const sideUlMenu:HTMLUListElement = simpleBar.current
        const items = sideUlMenu.getElementsByTagName("a");
        const arrows:HTMLAnchorElement[] = Array.from(items).filter(item => item.classList.contains('has-arrow'));
        arrows.forEach((element:HTMLElement)=>{
            const subMenu:any = element.closest('li')?.querySelector('ul');
            
            if(subMenu.dataset.menu === 'baseline-module'){
                element.onclick = ()=>{
                    if( displayBaseline == false ){
                        subMenu.style.display = '';
                        setDisplayBaseline(true);
                    }else{
                        subMenu.style.display = 'none';
                        setDisplayBaseline(false);
                    }
                };
            }

        })


    });

    const {sessionState} = useSessionStore();
    const {workplaceSessionState} = useWorkplaceSessionStore();

    return(
        <>
            <SimpleBar className="h-100">
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu"  ref={simpleBar}>
                        {/*DashBoard*/}
                        <li>
                            <NavLink
                                to="/centro-trabajo/dashboard"
                                className={({isActive}) => `${isActive ? 'text-primary bold' : ''}`}
                            >
                                <i className="bx bx-home-circle" />
                                <span>{workplaceSessionState.actionWorkplace?.name}</span>
                            </NavLink>
                        </li>






                        <li className="menu-title">{"Sistema de Gestión SST"}</li>

                        <li>
                            <a className="has-arrow">
                                <i className="fas fa-check-double" />
                                <span>{"Estudio de línea base"}</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false" style={{display:'none'}}
                                data-menu="baseline-module"
                            >
                                <li>
                                    <NavLink
                                        to="/centro-trabajo/estudio-linea-base"
                                        className={({isActive}) => `${isActive ? 'text-primary bold' : ''}`}
                                    >
                                        {"Gestionar"}
                                    </NavLink>
                                </li>

                            </ul>
                        </li>

                    </ul>
                </div>
            </SimpleBar>

        </>
    )
}