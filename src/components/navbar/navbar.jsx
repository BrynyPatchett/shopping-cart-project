import { Link } from "react-router-dom";

function Navbar({navlinks}){


return(<>
<h1>Navbar</h1>
{navlinks && navlinks.map((link,i) => {
    return(<Link key={i} to={link.path}>{link.text}</Link>) 
})}
</>)

}

export default Navbar;



