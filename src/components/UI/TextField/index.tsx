import TextField from '@mui/material/TextField';

import {MAIN_THEME_COLOR} from './../../../constants/common'

const MuiTextField = () => {
    return  <TextField
    sx={
        {
            width: '100%',
            '& input': {
                height: '100%',
                
                '&:valid:focus + fieldset': {
                    border: `2px solid ${MAIN_THEME_COLOR}`
                }
            }
        }}
        InputLabelProps={{
            style: { color: MAIN_THEME_COLOR },
          }}
          
        id="outlined-basic" label="Outlined" variant="outlined" />
}

export default MuiTextField