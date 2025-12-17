const express = require('express');
const router = express.Router();

// Static event data - in production, this would come from a database
const events = [
  {
    id: 1,
    title: "AWS Student Community Day",
    date: "2025-02-10",
    time: "9:00 AM - 5:00 PM",
    location: "Main Auditorium",
    description: "A full-day cloud learning event with hands-on workshops, tech talks, and networking opportunities with AWS professionals.",
    category: "Workshop",
    capacity: 200,
    registered: 156
  },
  {
    id: 2,
    title: "Cloud Innovation Hackathon",
    date: "2025-02-15",
    time: "10:00 AM - 8:00 PM",
    location: "Engineering Building, Lab 301",
    description: "24-hour hackathon focused on building cloud-native applications. Win prizes and get mentorship from industry experts.",
    category: "Hackathon",
    capacity: 100,
    registered: 87
  },
  {
    id: 3,
    title: "Tech Talk: Serverless Architecture Best Practices",
    date: "2025-02-18",
    time: "4:00 PM - 5:30 PM",
    location: "Virtual Event",
    description: "Learn about serverless architecture patterns, AWS Lambda, and building scalable applications without managing servers.",
    category: "Tech Talk",
    capacity: 300,
    registered: 213
  },
  {
    id: 4,
    title: "Spring Career Fair - Tech Companies",
    date: "2025-02-22",
    time: "11:00 AM - 4:00 PM",
    location: "Student Center, Main Hall",
    description: "Meet recruiters from leading tech companies. Bring your resume and be ready to discuss internship and full-time opportunities.",
    category: "Career",
    capacity: 500,
    registered: 342
  },
  {
    id: 5,
    title: "Containers & Kubernetes Workshop",
    date: "2025-02-25",
    time: "2:00 PM - 5:00 PM",
    location: "Computer Lab B",
    description: "Hands-on workshop covering Docker containers, container orchestration with Kubernetes, and deploying to Amazon ECS.",
    category: "Workshop",
    capacity: 50,
    registered: 48
  },
  {
    id: 6,
    title: "AI/ML Study Group Meetup",
    date: "2025-03-01",
    time: "6:00 PM - 8:00 PM",
    location: "Library Meeting Room 4",
    description: "Weekly meetup for students interested in artificial intelligence and machine learning. Share projects and learn together.",
    category: "Study Group",
    capacity: 30,
    registered: 22
  }
];

// GET /api/events - Retrieve all events
router.get('/events', (req, res) => {
  try {
    // Optional filtering by category
    const { category } = req.query;
    
    if (category) {
      const filtered = events.filter(event => 
        event.category.toLowerCase() === category.toLowerCase()
      );
      return res.json(filtered);
    }
    
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to retrieve events' });
  }
});

// GET /api/events/:id - Retrieve single event
router.get('/events/:id', (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const event = events.find(e => e.id === eventId);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to retrieve event' });
  }
});

module.exports = router;
