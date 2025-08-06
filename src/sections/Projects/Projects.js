import React, { useState } from 'react';
import ImageInfoOverlay from '../../components/ImageInfoOverlay/ImageInfoOverlay';
import ProjectCard from '../../components/ProjectCard/ProjectCard';

const Projects = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const handleInfoClick = () => setShowOverlay(true);
  const handleClose = () => setShowOverlay(false);

  const sectionStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://stsci-opo.org/STScI-01JY2AZA9GFMFRKWNTG0HYB8KN.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  // Projects data structure
  const projects = [
    {
      name: "InsightForge: AI Business Intelligence Q&A",
      description: "An intelligent business intelligence application that allows users to upload their data (CSV or PDF) and ask natural language questions to get insights powered by AI. Combines retrieval-augmented generation (RAG) with AI agents for accurate, context-aware answers.",
      features: [
        "Multi-format Data Support: Upload CSV files or PDF documents",
        "Flexible AI Provider Selection: Choose between Google Gemini and OpenAI GPT models",
        "User-Provided API Keys: Secure approach with session-only storage",
        "Provider-Specific Embeddings: Automatic selection based on chosen provider",
        "Intelligent Agent System: Combines document retrieval with web search",
        "Automatic Evaluation: Built-in evaluation for CSV-based queries",
        "Interactive Visualizations: Automatic charts and graphs for sales data",
        "Chat History: Persistent conversation history for better context",
        "Real-time Processing: Fast document processing with FAISS vector indexing"
      ],
      techStack: ["Python", "Streamlit", "LangChain", "FAISS", "OpenAI", "Google Gemini", "Matplotlib", "Pandas"],
      githubUrl: "https://github.com/anmol091192/InsightForge-AI-Business-Intelligence-Q-A",
      deploymentUrl: "https://insightforge-ai-business-intelligence.streamlit.app/"
    },
    {
      name: "NewsGenie: AI News & Web Search Assistant",
      description: "AI-powered Streamlit app that lets you chat with a smart assistant to get latest news headlines by category or search the web for answers. Features robust workflow with error handling and powered by Google Gemini, GNews API, and Serper search.",
      features: [
        "AI Chatbot: Handles news and generic information queries in natural language",
        "News Integration: Fetches real-time news using GNews API",
        "Web Search: Answers factual questions via Serper Google Search API",
        "LangGraph Workflow: Node-based decision routing for reliable query handling",
        "User-Friendly API Key Input: Secure interface for Gemini API key",
        "Robust Error Handling: Graceful fallbacks for network issues",
        "Interactive UI: Clean Streamlit interface with conversation history",
        "Smart Input Handling: Either text query OR news category, not both"
      ],
      techStack: ["Python", "Streamlit", "AutoGen", "LangGraph", "Google Gemini", "GNews API", "Serper API"],
      githubUrl: "https://github.com/anmol091192/NewsGenie-AI-News-Search-Assistant",
      deploymentUrl: "https://newsgenie-ai-news-search-assistant.streamlit.app/"
    },
    {
      name: "AI PDF Assistant - Universal PDF Chatbot",
      description: "A Gradio-based chatbot that can answer questions about any PDF document using RAG (Retrieval Augmented Generation). Upload your own PDF files and get instant AI-powered answers with semantic search capabilities.",
      features: [
        "AI-powered chat interface using OpenAI's GPT-3.5-turbo",
        "Upload any PDF document through the web interface",
        "Semantic search through document chunks using ChromaDB",
        "User-friendly Gradio web interface with file upload",
        "Real-time question answering about uploaded documents",
        "Secure API key management with environment variables",
        "Automatic fallback to demo mode if no PDF is uploaded",
        "Support for multiple document formats and sizes"
      ],
      techStack: ["Python", "Gradio", "OpenAI GPT", "ChromaDB", "LangChain", "RAG"],
      githubUrl: "https://github.com/anmol091192/AI_PDF_Chatbot",
      deploymentUrl: null
    }
  ];

  return (
    <section 
      id="projects" 
      className="relative min-h-screen flex flex-col justify-center items-center text-white py-20 px-6 lg:px-12 w-full"
      style={sectionStyle}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-0"></div>
      
      {/* Info Button */}
      <button 
        className="absolute top-6 right-6 z-20 p-3 bg-gradient-to-r from-space-blue-500/20 to-cosmic-purple-500/20 backdrop-blur-sm rounded-full hover:from-space-blue-500/40 hover:to-cosmic-purple-500/40 transition-all duration-300 border border-white/20 hover:border-white/40 group" 
        onClick={handleInfoClick}
      >
        <img 
          src="https://img.icons8.com/ios-filled/50/ffffff/telescope.png" 
          alt="info" 
          className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" 
        />
      </button>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold mx-auto mb-6 text-transparent bg-clip-text bg-gradient-to-r from-space-blue-200 via-white to-cosmic-purple-200">
            Projects
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-space-blue-400 to-cosmic-purple-400 mx-auto mb-8 rounded-full"></div>
        </div>
        
        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 auto-rows-fr">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="animate-fade-in-up h-full"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationFillMode: 'both'
              }}
            >
              <ProjectCard 
                name={project.name}
                description={project.description}
                features={project.features}
                techStack={project.techStack}
                githubUrl={project.githubUrl}
                deploymentUrl={project.deploymentUrl}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Overlay Component */}
      {showOverlay && (
        <ImageInfoOverlay
          title="Cat’s Paw Nebula (NGC 6334)"
          description="Tucked 4,000 light-years away in the constellation Scorpius, the Cat’s Paw Nebula reveals a turbulent nursery of young stars clawing their way into existence. Captured by the James Webb Space Telescope’s near-infrared gaze, this view peels back a glowing “toe bean” of gas and dust — unveiling newborn stars carving luminous paths through the cloud. What you see is a chapter mid-creation: brilliant, short-lived stars sculpt the surrounding chaos, glowing blue as they disrupt and eventually silence further star formation. This richly layered scene offers not just beauty, but clues to how stars — and perhaps worlds — begin."
          onClose={handleClose}
        />
      )}
    </section>
  );
};

export default Projects;