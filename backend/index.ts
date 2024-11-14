import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
}

let events: Event[] = [];
let idCounter = 1;

// Create an event
app.post('/events', (req: Request, res: Response) => {
  const { title, date, location, description } = req.body;
  const newEvent: Event = { id: idCounter++, title, date, location, description };
  events.push(newEvent);
  res.json(newEvent);
});

// Get all events
app.get('/events', (req: Request, res: Response) => {
  res.json(events);
});

// Update an event
app.put('/events/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, date, location, description } = req.body;

  const event = events.find((e) => e.id === Number(id));
  if (event) {
    event.title = title;
    event.date = date;
    event.location = location;
    event.description = description;
    res.json(event);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});

// Delete an event
app.delete('/events/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  events = events.filter((e) => e.id !== Number(id));
  res.json({ message: 'Event deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
