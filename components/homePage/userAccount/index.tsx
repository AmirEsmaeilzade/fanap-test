import { Box, Typography } from "@mui/material";
import ShowAccount from "./showAccoun";
import CreateAccount from "./createAccount";
import EditAccount from "./editAccount";
import {useState, useEffect} from 'react'
import { Get } from "../../../utils/api";

type ListType = {
    id: string
    social_name: string
    social_id: string
    social_link: string
}

const DEFAULT_VALUES = {
    id: '',
    social_name: '',
    social_id: '',
    social_link: '',
}
const UserAccount = () => {

    const [data , setData] = useState<ListType[]>([DEFAULT_VALUES])
    const [editId , setEditId] = useState<string>('')

    const GetData = async() => {
        await Get(`/socials`).then((res) =>
            setData(res)
        ).catch((err) => console.log(err))
    }

    useEffect(() => {
        GetData()
    },[])

    return ( 
        <Box className=" w-[1000px] rounded-2xl shadow-2xl mx-auto mt-[200px] p-5">
            <Typography variant="text">
                مسیر های ارتباطی
            </Typography>
            {
                editId?.length !== 0 ? 
                <EditAccount editId={editId} setEditId={setEditId} data={data.find((i) => i.id === editId)} updateHandler={GetData}/>
                :<CreateAccount updateHandler={GetData}/>
            }
            <ShowAccount setEditId={setEditId} data={data} updateHandler={GetData}/>
        </Box>
     );
}
 
export default UserAccount;