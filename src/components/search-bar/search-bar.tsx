import React, { FC } from "react";
import { useRouter } from "next/dist/client/router";
import { 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Box
} from "@material-ui/core";

const SearchBar: FC = () => {
  const router = useRouter();
  const cities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi'];

  const handleSubmit = (e) => {
    const searchData = {
      iAm : e.target.iAm.value,
      lookingFor : e.target.lookingFor.value,
      
    }


  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="row">
        <div className="col-lg-3 mb-3">
          <InputLabel id="i-am">I am</InputLabel>
          <Select labelId="i-am" label="Age" fullWidth>
            <MenuItem value="bride" selected>Groom (Dulha)</MenuItem>
            <MenuItem value="groom">Bride (Dulhan)</MenuItem>
          </Select>
        </div>
        <div className="col-lg-3 mb-3">
          <InputLabel id="looking-for">Looking for</InputLabel>
          <Select labelId="looking-for" label="Age" fullWidth>
            <MenuItem value="bride">Groom (Dulha)</MenuItem>
            <MenuItem value="groom" selected>Bride (Dulhan)</MenuItem>
          </Select>
        </div>
        <div className="col-lg-4 mb-3">
          {/* <Autocomplete
            fullWidth
            options={cities}
            autoHighlight
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enter City name"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          /> */}
        </div>
        <div className="col-lg-2 mb-3">
          <Button variant="contained" type="submit" fullWidth color="primary">Search</Button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar;