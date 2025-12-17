
import { FaUserTie, FaCode, FaPaintBrush, FaEnvelope, FaLinkedin, FaCheckCircle, FaCalendarAlt, FaRegLightbulb, FaUsers, FaCogs } from "react-icons/fa";
import { useState } from "react";

const team = [
  {
    name: "Jane Doe",
    role: "Product Manager",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Leads the vision and strategy for Campus Events.",
    email: "jane.doe@campusevents.com",
    linkedin: "https://linkedin.com/in/janedoe",
    icon: <FaUserTie className="text-blue-500 text-2xl" aria-label="Product Manager" />,
  },
  {
    name: "John Smith",
    role: "Lead Developer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Architects and builds robust event solutions.",
    email: "john.smith@campusevents.com",
    linkedin: "https://linkedin.com/in/johnsmith",
    icon: <FaCode className="text-blue-500 text-2xl" aria-label="Lead Developer" />,
  },
  {
    name: "Emily Chen",
    role: "UI/UX Designer",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    bio: "Designs delightful and intuitive user experiences.",
    email: "emily.chen@campusevents.com",
    linkedin: "https://linkedin.com/in/emilychen",
    icon: <FaPaintBrush className="text-blue-500 text-2xl" aria-label="UI/UX Designer" />,
  },
];


const AboutPage = () => {
  const [feedback, setFeedback] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
    setError('');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!feedback.name.trim() || !feedback.email.trim() || !feedback.message.trim()) {
      setError('All fields are required.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(feedback.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setSubmitted(true);
    setError('');
    // Here you would typically send the feedback to a backend or email service
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 animate-fadein">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">About Campus Events</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Campus Events is your all-in-one platform for discovering, managing, and sharing campus activities. We help students, faculty, and staff stay connected and engaged with everything happening on campus.
        </p>
        <img
          src="https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
          alt="Campus gathering"
          className="rounded-xl shadow-lg w-full max-h-72 object-cover mx-auto border border-blue-100 animate-fadein"
          loading="lazy"
        />
      </div>

      {/* Mission & Features */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-700 mb-2 flex items-center gap-2"><FaRegLightbulb className="inline text-yellow-400" aria-label="Mission" /> Our Mission</h2>
        <p className="text-gray-700 mb-4">
          To foster vibrant campus communities by making event discovery, participation, and management effortless for everyone.
        </p>
        <h3 className="text-xl font-semibold text-blue-600 mb-2 flex items-center gap-2"><FaCheckCircle className="inline text-green-500" aria-label="Features" /> Key Features</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <li className="bg-blue-50 rounded-lg p-4 shadow-sm flex items-start gap-3">
            <FaCalendarAlt className="text-blue-400 text-xl mt-1" aria-label="Event Discovery" />
            <div>
              <span className="font-bold text-blue-700">Event Discovery</span><br />
              Find and filter events by category, date, and popularity.
            </div>
          </li>
          <li className="bg-blue-50 rounded-lg p-4 shadow-sm flex items-start gap-3">
            <FaUsers className="text-blue-400 text-xl mt-1" aria-label="Easy Registration" />
            <div>
              <span className="font-bold text-blue-700">Easy Registration</span><br />
              Register for events in one click and get reminders.
            </div>
          </li>
          <li className="bg-blue-50 rounded-lg p-4 shadow-sm flex items-start gap-3">
            <FaCogs className="text-blue-400 text-xl mt-1" aria-label="Personal Dashboard" />
            <div>
              <span className="font-bold text-blue-700">Personal Dashboard</span><br />
              Track your upcoming events and past participation.
            </div>
          </li>
          <li className="bg-blue-50 rounded-lg p-4 shadow-sm flex items-start gap-3">
            <FaRegLightbulb className="text-blue-400 text-xl mt-1" aria-label="Organizer Tools" />
            <div>
              <span className="font-bold text-blue-700">Organizer Tools</span><br />
              Create, edit, and manage events with powerful admin features.
            </div>
          </li>
        </ul>
      </div>

      {/* Team Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Meet Our Team</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center bg-blue-50 rounded-lg p-6 shadow w-full md:w-1/3 transition-transform duration-200 hover:scale-105 hover:shadow-xl group"
              tabIndex={0}
              aria-label={`Team member: ${member.name}`}
            >
              <div className="relative mb-3">
                <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full border-4 border-blue-400 object-cover" />
                <span className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 border border-blue-200 shadow">{member.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-800 group-hover:text-blue-900">{member.name}</h3>
              <span className="text-blue-600 mb-1">{member.role}</span>
              <p className="text-gray-600 text-sm text-center mb-2">{member.bio}</p>
              <div className="flex gap-3 mt-2">
                <a href={`mailto:${member.email}`} className="text-blue-600 hover:text-blue-800" aria-label={`Email ${member.name}`}> <FaEnvelope /> </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800" aria-label={`${member.name} LinkedIn`}> <FaLinkedin /> </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Section */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Share Your Feedback</h2>
        <p className="text-gray-700 mb-4 text-center">We value your input! Let us know how we can improve Campus Events.</p>
        <div className="bg-gray-50 rounded-lg p-6 shadow-inner">
          {submitted ? (
            <div className="text-green-600 font-semibold text-center flex items-center justify-center gap-2"><FaCheckCircle className="inline text-green-500" aria-label="Success" /> Thank you for your feedback!</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" aria-label="Feedback form">
              <div>
                <label className="block mb-1 font-medium" htmlFor="feedback-name">Name</label>
                <input
                  id="feedback-name"
                  type="text"
                  name="name"
                  value={feedback.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="feedback-email">Email</label>
                <input
                  id="feedback-email"
                  type="email"
                  name="email"
                  value={feedback.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="feedback-message">Message</label>
                <textarea
                  id="feedback-message"
                  name="message"
                  value={feedback.message}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  rows={4}
                  required
                  aria-required="true"
                />
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full text-lg font-semibold transition-colors"
                aria-label="Submit Feedback"
              >
                Submit Feedback
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-400 text-sm mt-8">
        Version 1.0.0 &copy; {new Date().getFullYear()} Campus Events
      </div>
    </div>
  );
};

export default AboutPage;
