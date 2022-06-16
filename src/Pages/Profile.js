import { useLocation, useNavigate, useParams } from "react-router-dom"
import Login from "./Login";

const Profile = (props) => {
    // console.log(props);
    const navigate = useNavigate();

    return (
        <>
            {
                props.isLogined ? <div>Profile Page</div> : <Login />
            }
        </>
    )
}

export default Profile