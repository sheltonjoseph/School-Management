import React from "react";
import NavBar from "../Components/navBar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const ManageDash = () => {
  const SelectSmall = () => {
    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    return (
      <FormControl sx={{ m: 10, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Grade</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={1}>Grade 1</MenuItem>
          <MenuItem value={2}>Grade 2</MenuItem>
          <MenuItem value={3}>Grade 3</MenuItem>
        </Select>
      </FormControl>
    );
  };
  return (
    <div>
      <NavBar />
      <Container maxWidth="m">
      <SelectSmall />
      <Typography variant="h3" gutterBottom sx={{textAlign:"center"}}>
       Reports Based on Last Month
      </Typography>
      </Container>
    </div>
  );
};

export default ManageDash;
