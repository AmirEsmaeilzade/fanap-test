import { Box, Typography, Button, TextField, Select, MenuItem } from "@mui/material";
import {useEffect, useState} from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Get, Put } from "../../../../utils/api";
import {FC} from 'react'
import { SocialsMedia } from "../../../../types";

type Props = {
    data:{
        id: string
        social_name: string
        social_id: string
        social_link: string
    } | any
    editId: string
    updateHandler: () => void
    setEditId: (editMode:string) => void
}
const EditAccount:FC<Props> = ({setEditId, editId, data, updateHandler}) => {
    const [selectItem , seSelectItem] = useState<string>(data.social_name)
    const [valueTextField , setValueTextField] = useState({id:data.social_id, link:data.social_link})

    const editAccount = async() => {
        await Put(`/socials/${editId}` , 
         {
            id: Math.random().toString(16).slice(2),
            social_name: selectItem,
            social_id: valueTextField.id,
            social_link: valueTextField.link
         },
        ).then(() =>
            updateHandler()
        ).catch((err) => console.log(err))
        seSelectItem('')
        setValueTextField({id:'', link:''})
        setEditId('')
    }

    return ( 
        <Box>
            <Box className="cursor-pointer my-5">
                <AddIcon className="text-yellow-400"/>
                <Typography className="text-yellow-400 mr-1" variant="text">ویرایش مسیر ارتباطی</Typography>
            </Box>
                <Box className="w-full h-52 rounded-md p-5 bg-gray-100 flex flex-col justify-between mt-3">
                    <Typography className=" mr-1" variant="text">ویرایش مسیر ارتباطی</Typography>
                    <Box className="flex justify-between">
                        <Select
                            className="w-[300px] "
                            placeholder="نوع"
                            value={selectItem}
                            required
                            onChange={(e) => seSelectItem(e.target.value)}
                        >
                            {SocialsMedia.map((item,index) => (
                                <MenuItem key={"ITEM_" + index} value={item}>{item}</MenuItem>
                            ))
                            }
                        </Select>
                        <TextField 
                            value={valueTextField.id}
                            className="w-[300px]"
                            label="آی دی (ID)"
                            variant="outlined"
                            onChange={(e) => setValueTextField((p) => ({...p, id:e.target.value}))}
                        />
                        <TextField 
                            value={valueTextField.link}
                            className="w-[300px]" 
                            label="لینک" 
                            variant="outlined" 
                            onChange={(e) => setValueTextField((p) => ({...p, link:e.target.value}))}
                        />
                    </Box>
                    <Box className="flex mr-auto">
                        <Button color="inherit" className="flex gap-x-2 shadow mx-1 rounded-lg" onClick={() => setEditId('')}>
                            <Typography variant="text" className="text-gray-800 text-xs">
                                انصراف
                            </Typography>
                        </Button>
                        <Button color="inherit" className="flex gap-x-2 !bg-yellow-500 rounded-lg shadow mx-1" onClick={editAccount}>
                            <Typography variant="text" className="text-gray-800 ">
                                ویرایش مسیر ارتباطی
                            </Typography>
                        </Button>
                    </Box>
                </Box>
        </Box>
     );
}
 
export default EditAccount;