import { LinkContainer } from "react-router-bootstrap";
import { Table, Button} from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit,FaCheck } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useGetUsersQuery , useDeleteUserMutation} from "../../slices/usersApiSlice";


const UserListScreen = ()=> {
    const {data:users,refetch,isLoading,error} = useGetUsersQuery();
    const [deleteUser, {isLoading: LoadingDelete}] = useDeleteUserMutation();

    const deleteHandler = async (id)=> {
        if(window.confirm("Are you sure"))
            try {
                await deleteUser(id);
                toast.success("User deleted Successfully");
                refetch();
            }catch(err){
                toast.error(err?.data?.message || err?.error);
            }
    }

    return <>
        <h1>Users</h1>
        {LoadingDelete && <Loader/>}
        {isLoading ? <Loader/> : (error ? (
            <Message variant={"danger"} >
                {error.data.message || error.message}
            </Message>
        ) : (
            <Table striped hover responsive className="table-sm">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>ADMIN</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {users?.map((user)=>{
                                           return <tr key={user._id}>
                                                <td>{user._id}</td>
                                                <td>{user.name}</td>
                                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                                <td>{user.isAdmin ? (
                                                    <FaCheck style={{color:'green'}} />
                                                ) : (
                                                    <FaTimes style={{color:'red'}} />
                                                )}
                                                </td>
                                                <td>
                                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                        <Button className="btn-sm" variant="light">
                                                                <FaEdit/>
                                                        </Button>
                                                    </LinkContainer>
                                                    <Button 
                                                        variant="danger"
                                                        className="btn-sm"
                                                        onClick={()=> deleteHandler(user._id)}
                                                    >
                                                        <FaTrash style={{color:"white"}}/>
                                                    </Button>
                                                </td>
                                            </tr>
                                        })}
                                </tbody>
                            </Table>
        )
            
        )}
    </>
}

export default UserListScreen;