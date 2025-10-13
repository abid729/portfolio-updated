/**
 * Contact Component with Supabase Database Integration
 * 
 * یہ component contact form کو Supabase database سے جوڑتا ہے
 * This component connects the contact form to Supabase database
 */

import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../data/portfolioData';
import { insertContactLead } from '../utils/supabaseClient';

const ContactWithDatabase = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  // Input validation
  const validateForm = () => {
    if (!formData.name.trim() || formData.name.length < 2) {
      return { valid: false, message: 'براہ کرم صحیح نام درج کریں (Please enter a valid name)' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return { valid: false, message: 'براہ کرم صحیح ای میل ایڈریس درج کریں (Please enter a valid email)' };
    }
    
    if (!formData.subject.trim() || formData.subject.length < 3) {
      return { valid: false, message: 'براہ کرم موضوع درج کریں (Please enter a subject)' };
    }
    
    if (!formData.message.trim() || formData.message.length < 10) {
      return { valid: false, message: 'براہ کرم تفصیلی پیغام لکھیں (Please write a detailed message)' };
    }
    
    return { valid: true };
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (status.type === 'error') {
      setStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    // Validate form
    const validation = validateForm();
    if (!validation.valid) {
      setStatus({
        type: 'error',
        message: validation.message
      });
      setLoading(false);
      return;
    }

    try {
      // Insert into Supabase database
      const result = await insertContactLead(formData);

      if (result.success) {
        setStatus({
          type: 'success',
          message: '✅ شکریہ! آپ کا پیغام کامیابی سے محفوظ ہو گیا ہے۔ میں جلد ہی آپ سے رابطہ کروں گا۔\n(Thank you! Your message has been saved successfully. I will contact you soon.)'
        });
        
        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setStatus({ type: '', message: '' });
        }, 5000);
      } else {
        throw new Error(result.error || 'Failed to save message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({
        type: 'error',
        message: '❌ معذرت! پیغام محفوظ کرنے میں مسئلہ ہوا۔ براہ کرم براہ راست ای میل کریں۔\n(Sorry! There was an error saving your message. Please email directly.)'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h3>
            <p className="text-gray-600 mb-8">
              I'm always interested in hearing about new projects and opportunities. 
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaEnvelope className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaPhone className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                  <p className="text-gray-600">{personalInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaMapMarkerAlt className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Location</h4>
                  <p className="text-gray-600">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="font-semibold text-gray-800 mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label="GitHub Profile"
                  >
                    <FaGithub size={24} />
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 p-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label="LinkedIn Profile"
                  >
                    <FaLinkedin size={24} />
                  </a>
                )}
              </div>
            </div>

            {/* Database Info Badge */}
            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <FaCheckCircle />
                <span className="text-sm font-medium">
                  🗄️ Connected to Supabase Database
                </span>
              </div>
              <p className="text-xs text-green-600 mt-1">
                آپ کا پیغام secure database میں محفوظ ہوگا
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Send Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  minLength={2}
                  maxLength={100}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Muhammad Ahmed"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  minLength={3}
                  maxLength={200}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={2000}
                  rows="5"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.message.length}/2000 characters
                </p>
              </div>

              {/* Status Message */}
              {status.message && (
                <div 
                  className={`p-4 rounded-lg flex items-start gap-3 animate-fadeIn ${
                    status.type === 'success' 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}
                >
                  {status.type === 'success' ? (
                    <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                  ) : (
                    <FaExclamationCircle className="text-red-600 mt-1 flex-shrink-0" />
                  )}
                  <span className="text-sm whitespace-pre-line">{status.message}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                * Required fields | تمام فیلڈز ضروری ہیں
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactWithDatabase;

