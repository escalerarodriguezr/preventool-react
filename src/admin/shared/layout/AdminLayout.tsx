import {ReactElement} from "react";

interface Props {
    children: ReactElement | ReactElement [];
}

export const AdminLayout = ({children}: Props): any => {

    return(
        <>
            <div>
                <h2>Layout</h2>
                <div className={'bg-primary'}>
                    {children}
                </div>
            </div>

        </>
    )
}