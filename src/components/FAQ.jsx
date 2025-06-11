import React, { useState } from 'react';

// FAQ component for MazFlix
function FAQ() {
  const [openItem, setOpenItem] = useState(null);

  const faqItems = [
    {
      id: 1,
      question: "What is MazFlix?",
      answer: "MazFlix is a classic movie streaming platform featuring public domain films from the golden age of cinema. All content is legally free to watch and enjoy."
    },
    {
      id: 2,
      question: "Are the movies really free?",
      answer: "Yes! All movies on MazFlix are in the public domain, which means they are free to watch, download, and share. No subscription or payment required."
    },
    {
      id: 3,
      question: "What genres are available?",
      answer: "We offer a wide variety of classic genres including Film Noir, Horror, Comedy, Drama, Adventure, and more from the early 1900s to 1970s."
    },
    {
      id: 4,
      question: "What video quality can I expect?",
      answer: "Our movies are available in HD quality when possible. Many classic films have been digitally restored for the best viewing experience."
    },
    {
      id: 5,
      question: "Can I download movies?",
      answer: "Currently, our platform focuses on streaming. However, since all content is public domain, you can find download links from our source at Archive.org."
    },
    {
      id: 6,
      question: "How often is new content added?",
      answer: "We regularly add new classic films to our collection. Check back often to discover newly restored classics and hidden gems."
    }
  ];

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-gray-400">
          Everything you need to know about MazFlix
        </p>
      </div>

      <div className="space-y-4">
        {faqItems.map((item) => (
          <div 
            key={item.id}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
            >
              <span className="text-lg font-semibold text-white">
                {item.question}
              </span>
              <svg 
                className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                  openItem === item.id ? 'rotate-180' : ''
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${
              openItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="px-6 pb-4">
                <p className="text-gray-300 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-12 text-center bg-gradient-to-r from-red-500/10 to-purple-600/10 backdrop-blur-sm border border-white/10 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-white mb-4">
          Still have questions?
        </h3>
        <p className="text-gray-300 mb-6">
          We're here to help! Feel free to reach out to our support team.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-purple-700 transition-all duration-300">
            Contact Support
          </button>
          <button className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20">
            Visit Help Center
          </button>
        </div>
      </div>
    </div>
  );
}

export default FAQ; 