import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export interface SelectOption {
    label: string,
    value: number | string
}

interface MuiSelectProps {
    options: SelectOption[],
    value: string,
    onSelectChange: (e:SelectChangeEvent) => void
}

const MuiSelect = ({options, value, onSelectChange}: MuiSelectProps) => {

    return  <FormControl sx={{width: '100%' }}>
    <Select
      value={value}
      onChange={onSelectChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Without label' }}
    >
      {
        options.map((option: SelectOption) => (
            <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
        ))
      }
    </Select>
  </FormControl>
}

export default MuiSelect