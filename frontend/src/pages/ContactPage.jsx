import React, { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would typically send the form data to a backend or email service
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-3">Contact Us</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">We'd love to hear from you! Reach out for support, feedback, or partnership opportunities.</p>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Contact Info */}
        <div className="flex-1 bg-white rounded-xl shadow-md p-8 flex flex-col justify-between mb-8 md:mb-0">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Get in Touch</h2>
          <div className="mb-4 flex items-center">
            <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 01-8 0 4 4 0 018 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7m0 0H9m3 0h3" /></svg>
            <span className="text-gray-700">123 Main St, City, Country</span>
          </div>
          <div className="mb-4 flex items-center">
            <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 2a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2h8z" /></svg>
            <span className="text-gray-700">support@campusevents.com</span>
          </div>
          <div className="mb-4 flex items-center">
            <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m0 4v2m0 4v2m0 4v2" /></svg>
            <span className="text-gray-700">+1 (555) 987-6543</span>
          </div>
          <div className="mt-6">
            <iframe
              title="Campus Events Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.5946%2C12.9716%2C77.5946%2C12.9716&amp;layer=mapnik"
              className="w-full h-40 rounded-lg border"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex-1 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Send us a message</h2>
          <div className="bg-gray-50 rounded-lg p-6 shadow-inner">
            {submitted ? (
              <div className="text-green-600 font-semibold text-center">Thank you for contacting us!</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    rows={4}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full text-lg font-semibold"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="max-w-3xl mx-auto mt-16 text-center">
        <h3 className="text-xl font-bold text-blue-700 mb-2">Need Immediate Help?</h3>
        <p className="text-gray-700 mb-4">Check our <a href="#" className="text-blue-600 underline">Help Center</a> or call our 24/7 support line for urgent issues.</p>
        <div className="text-gray-500 text-sm">We value your feedback and strive to respond as quickly as possible.</div>
      </div>
    </div>
  );
};

export default ContactPage;
