import { Box, Typography, Button, TextField, Select, MenuItem } from "@mui/material";
import {useState, FC} from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Post } from "../../../../utils/api";
import { SocialsMedia } from "../../../../types";

type Props = {
    updateHandler: () => void
}
const CreateAccount:FC<Props> = ({updateHandler}) => {
    const [open , setOpen] = useState<boolean>(false)
    const [selectItem , seSelectItem] = useState<string>('')
    const [valueTextField , setValueTextField] = useState({id:'', link:''})

    const addAccount = async() => {
        await Post("/socials" , 
         {
            id: Math.random().toString(16).slice(2),
            social_name: selectItem,
            social_id: valueTextField.id,
            social_link: valueTextField.link
         }
        ).then(() =>
            updateHandler()
        ).catch((err) => console.log(err))

        seSelectItem('')
        setValueTextField({id:'', link:''})
        setOpen(false)
    }

    return ( 
        <Box>
            <Box className="cursor-pointer my-5" onClick={() => setOpen(true)}>
                <AddIcon className="text-yellow-400"/>
                <Typography className="text-yellow-400 mr-1" variant="text">افزودن مسیر ارتباطی</Typography>
            </Box>
            { open &&
                <Box className="w-full h-52 rounded-md p-5 bg-gray-100 flex flex-col justify-between mt-3">
                    <Typography className=" mr-1" variant="text">افزودن مسیر ارتباطی</Typography>
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
                        <Button color="inherit" className="flex gap-x-2 shadow mx-1 rounded-lg" onClick={() => setOpen(false)}>
                            <Typography variant="text" className="text-gray-800 text-xs">
                                انصراف
                            </Typography>
                        </Button>
                        <Button color="inherit" className="flex gap-x-2 !bg-yellow-500 rounded-lg shadow mx-1" onClick={addAccount}>
                            <Typography variant="text" className="text-gray-800 ">
                                ثبت مسیر ارتباطی
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            }
        </Box>
     );
}
 
export default CreateAccount;