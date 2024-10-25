import React from "react";

import { SelectChangeEvent } from "@mui/material";

import { Cities } from "../_utils/constants";

interface CitySelectorProps {
  city: string;
  onCityChange: (event: SelectChangeEvent<string>) => void;
}

import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const CitySelector: React.FC<CitySelectorProps> = ({ city, onCityChange }) => {
  return (
    <FormControl
      variant="outlined"
      sx={{
        mt: 4,
        width: { xs: "100%", md: "50%", sm: "80%", lg: "32%" },
      }}
    >
      <InputLabel
        sx={{
          color: "darkblue",
          "&.Mui-focused": {
            color: "darkblue",
          },
        }}
      >
        Select City
      </InputLabel>
      <Select
        label="Select City"
        value={city}
        onChange={onCityChange}
        sx={{
          borderBlockColor: "darkblue",
          textAlign: "left",
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200,
            },
          },
        }}
      >
        {Object.values(Cities).map((city) => (
          <MenuItem key={city} value={city}>
            {city}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CitySelector;
