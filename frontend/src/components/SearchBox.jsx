import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const SearchBox = () => {
    const navigate = useNavigate();
    const {keyword:urlKeyword} = useParams();
    const [keyword,setKeyword] = useState(urlKeyword || ""); 
    const submitHandler = (e)=>{
        e.preventDefault();
        if(keyword.trim())
        {
            navigate(`/search/${keyword}`);
            setKeyword("");
        }else{
            navigate("/")
        }
    }
    return (
        <Form onSubmit={submitHandler} className="d-flex">
            <Form.Control
            type="text"
            value={keyword}
            onChange={(e)=>{setKeyword(e.target.value)}}
            placeholder="Search Product..."
            className="mr-sm-2 ml-m-5"
            ></Form.Control>
            <Button type="submit" variant="outline-dark" className="p-2 mx-2">Search</Button>
        </Form>
    )
}

export default SearchBox;