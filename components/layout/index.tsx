import { FC, ReactNode } from 'react'
import Header from "./header";
import { Box } from "@mui/material";

type Props = {
    children : ReactNode
}
const Layout: FC<Props> = ({children}) => {
    return ( 
        <Box>
            <Header />
            <Box>
                {children}
            </Box>
        </Box>
     );
}
 
export default Layout;