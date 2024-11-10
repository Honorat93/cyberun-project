import React, { useState, useEffect } from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { ControlProps } from '@jsonforms/core';
import { TextField } from '@mui/material';

// Interface pour les propriétés du composant
interface PercentageControlProps extends ControlProps {
  data: number;
  path: string;
  handleChange(path: string, value: any): void;
}

const PercentageControl = ({ data = 0, handleChange, path }: PercentageControlProps) => {
  const [value, setValue] = useState(data);

  // Met à jour la valeur locale si data change
  useEffect(() => {
    setValue(data);
  }, [data]);

  // Gère les changements de valeur, avec limite entre 0 et 100
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(0, Math.min(100, Number(event.target.value) || 0));
    setValue(newValue);
    handleChange(path, newValue);
  };
  return (
    <>
      <TextField
        label="Pourcentage"
        type="number"
        value={value}
        onChange={onChange}
        inputMode="numeric"
        slotProps={{
          htmlInput: {
            min: 0,
            max: 100
          }
        }}
      />
    </>
  );
};

export default withJsonFormsControlProps(PercentageControl);
