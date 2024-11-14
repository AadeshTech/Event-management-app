import React from 'react';
import { TextField, Button, Box } from '@mui/material';

interface EventFormProps {
  form: {
    title: string;
    date: string;
    location: string;
    description: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEdit?: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ form, onChange, onSubmit, isEdit = false }) => {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Title"
        name="title"
        value={form.title}
        onChange={onChange}
        required
      />
      <TextField
        label="Date"
        type="date"
        name="date"
        value={form.date}
        onChange={onChange}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Location"
        name="location"
        value={form.location}
        onChange={onChange}
        required
      />
      <TextField
        label="Description"
        name="description"
        value={form.description}
        onChange={onChange}
        multiline
        rows={4}
        required
      />
      <Button type="submit" variant="contained" color={isEdit ? 'primary' : 'success'}>
        {isEdit ? 'Update Event' : 'Add Event'}
      </Button>
    </Box>
  );
};

export default EventForm;
