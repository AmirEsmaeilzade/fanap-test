import { Box, Modal, Typography, TextField, Button } from "@mui/material";
import {FC, useState} from 'react'
import { Delete } from "../../../../utils/api";

type Props = {
    deleteId: string
    open: boolean
    updateHandler: () => void
    setOpen: (open:boolean) => void
}
const DeleteModal:FC<Props> = ({open, setOpen, deleteId, updateHandler}) => {
    const [error , setError] = useState<string>('')
    const [valueTextField , setValueTextField] = useState<string>('')

    const deleteHandler = async() => {
        setError("")
        if(valueTextField === 'تایید'){
            await Delete(`/socials/${deleteId}`).then(() =>
                updateHandler()
            ).catch((err) => console.log(err))
            setOpen(false)
        }else{
            setError("تایید را به درستی وارد کنید!")
        }
        setValueTextField("")
    }

    return ( 
        <Box>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box className="w-[600px] bg-white mx-auto mt-60 rounded-xl p-5 flex flex-col gap-y-4">
                    <Typography variant="text" className="text-xl">آیا از تصمیم خودمطمئن هستید؟</Typography>
                    <Box>
                        <Typography variant="text" className="text-lg "> برای حذف مسیر ارتباطی {} لطفا تایید را بنویسید</Typography>
                        <TextField 
                            value={valueTextField}
                            className="w-full mt-2" 
                            placeholder="تایید" 
                            variant="outlined" 
                            error={error.length > 0}
                            helperText={error}
                            onChange={(e) => setValueTextField(e.target.value)}
                        />
                    </Box>
                    <Box className="flex mr-auto mt-10">
                        <Button color="warning" className="flex gap-x-2" onClick={() => setOpen(false)}>
                            <Typography variant="text" className="text-yellow-400">
                                انصراف
                            </Typography>
                        </Button>
                        <Button color="error" className="flex gap-x-2" onClick={() => deleteHandler()}>
                            <Typography variant="text" className="text-red-600">
                                حذف
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
     );
}
 
export default DeleteModal;