import { Box, Typography, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {FC,useEffect,useState} from 'react'
import DeleteModal from "../deleteModal";
import { Get } from "../../../../utils/api";


type Props = {
    data: {
        id: string
        social_name: string
        social_id: string
        social_link: string
    }[]
    setEditId: (editMode:string) => void
    updateHandler: () => void
}
const ShowAccount:FC<Props> = ({setEditId, data, updateHandler}) => {
    const [openModal , setOpenModal] = useState<boolean>(false)
    
    const [getId , setGetId] = useState<string>('')

    const openModalHandler = (id:string) => {
        setOpenModal(true)
        setGetId(id)
    }
    
    return ( 
        <>
            {data.map((item,index) => (
                <Box key={'ITEM_' + index} className="w-full h-20 rounded-md p-5 bg-gray-100 flex justify-between mt-3">
                    <Box className="flex gap-x-7 self-center">
                        <Typography variant="text" className="text-gray-800">{item.social_name}</Typography>
                        <Typography variant="text" className="text-gray-500">آی دی (ID): <span className="text-gray-800">{item.social_id}</span></Typography>
                        <Typography variant="text" className="text-gray-500">لینک: <a href={item.social_link} className="text-yellow-400">{item.social_link}</a></Typography>
                    </Box>
                    <Box className="flex mr-auto">
                        <Button color="warning" className="flex gap-x-2" onClick={() => setEditId(item.id)}>
                            <EditIcon className="text-yellow-400" fontSize="small"/>
                            <Typography variant="text" className="text-yellow-400 text-xs">
                                ویرایش
                            </Typography>
                        </Button>
                        <Button color="error" className="flex gap-x-2" onClick={() => openModalHandler(item.id)}>
                            <DeleteIcon className=" text-red-600" fontSize="small"/>
                            <Typography variant="text" className="text-red-600">
                                حذف
                            </Typography>
                        </Button>
                    </Box>
                </Box>
                ))
            }
            <DeleteModal open={openModal} setOpen={setOpenModal} deleteId={getId} updateHandler={updateHandler}/>
        </>
    );
}
 
export default ShowAccount;