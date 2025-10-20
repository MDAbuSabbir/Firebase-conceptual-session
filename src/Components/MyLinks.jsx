import { NavLink } from "react-router";

const MyLinks = ({to , className, children}) => {
    return (
        <div>
            <NavLink to={to} 
                    className={({isActive}) => (isActive? "text-blue-600 font-bold" : `${className} `)} 
                     >{children}
            </NavLink>
            
        </div>
    );
};

export default MyLinks;