import { useLocation, useNavigate, useParams } from "react-router-dom"

const Profile = (props) => {
    console.log(props);
    const navigate = useNavigate();

    return (
        <>
            {
                props.isLogined ? <div>Profile Page</div> : <div>Not Loged In</div>
            }
        </>
    )
}

export default Profile