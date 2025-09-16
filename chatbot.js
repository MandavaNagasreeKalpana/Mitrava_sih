// Universal Chatbot - Include on any website
// Usage: <script src="chatbot.js"></script>

(function() {
  'use strict';
  
  // Prevent multiple instances
  if (window.chatbotLoaded) return;
  window.chatbotLoaded = true;

  // Create and inject CSS with higher specificity
  const css = `
    /* Chatbot Icon Styles */
    #universal-chatbot-icon {
      position: fixed !important;
      bottom: 30px !important;
      right: 30px !important;
      width: 60px !important;
      height: 60px !important;
      cursor: pointer !important;
      z-index: 999999 !important;
      transition: transform 0.3s ease !important;
      background: transparent !important;
      border: none !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    
    #universal-chatbot-icon:hover { 
      transform: scale(1.1) !important; 
    }
    
    #universal-chatbot-icon .astronaut {
      position: absolute !important;
      left: 50% !important;
      top: 50% !important;
      width: 60px !important;
      height: 80px !important;
      transform: translate(-50%, -50%) !important;
      animation: chatbot-float 4s ease-in-out infinite !important;
    }
    
    #universal-chatbot-icon .astronaut-helmet {
      position: absolute !important;
      width: 40px !important;
      height: 40px !important;
      background: linear-gradient(145deg, #ffffff, #e6e6e6) !important;
      border-radius: 50% !important;
      top: 0 !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      box-shadow: inset -3px -3px 8px rgba(0,0,0,0.2), 2px 2px 4px rgba(255,255,255,0.1) !important;
    }
    
    #universal-chatbot-icon .helmet-glass {
      position: absolute !important;
      width: 32px !important;
      height: 20px !important;
      background: linear-gradient(135deg, rgba(0,255,255,0.2), rgba(0,0,255,0.1)) !important;
      border-radius: 50% 50% 45% 45% !important;
      top: 10px !important;
      left: 4px !important;
      overflow: hidden !important;
    }
    
    #universal-chatbot-icon .helmet-inner-glass {
      position: absolute !important;
      inset: 2px !important;
      background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.1) 100%) !important;
      border-radius: inherit !important;
      animation: chatbot-glass-shine 3s ease-in-out infinite !important;
    }
    
    #universal-chatbot-icon .antenna {
      position: absolute !important;
      width: 3px !important;
      height: 12px !important;
      background: #ccc !important;
      top: -8px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
    }
    
    #universal-chatbot-icon .antenna::after {
      content: "" !important;
      position: absolute !important;
      width: 5px !important;
      height: 5px !important;
      background: #ff3333 !important;
      border-radius: 50% !important;
      top: -2px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      animation: chatbot-blink 1s ease-in-out infinite !important;
    }
    
    #universal-chatbot-icon .astronaut-body {
      position: absolute !important;
      width: 35px !important;
      height: 50px !important;
      background: linear-gradient(145deg, #ffffff, #f0f0f0) !important;
      border-radius: 25px !important;
      top: 35px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      box-shadow: inset -4px -4px 8px rgba(0,0,0,0.2), 2px 2px 4px rgba(255,255,255,0.1) !important;
    }

    /* Chat Window Styles */
    #universal-chat-window {
      position: fixed !important;
      bottom: 100px !important;
      right: 30px !important;
      width: 380px !important;
      height: 500px !important;
      background: rgba(255, 255, 255, 0.98) !important;
      backdrop-filter: blur(20px) !important;
      -webkit-backdrop-filter: blur(20px) !important;
      border-radius: 24px !important;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25) !important;
      display: none !important;
      flex-direction: column !important;
      overflow: hidden !important;
      z-index: 999998 !important;
      border: 1px solid rgba(255, 140, 0, 0.2) !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      max-height: calc(100vh - 150px) !important;
      max-width: calc(100vw - 60px) !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    
    #universal-chat-window.show {
      display: flex !important;
      animation: chatbot-slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    #universal-chat-window.fullscreen {
      width: calc(100vw - 60px) !important;
      height: calc(100vh - 150px) !important;
      bottom: 100px !important;
      left: 50% !important;
      right: auto !important;
      transform: translateX(-50%) !important;
      max-width: 1000px !important;
    }
    
    #universal-chat-header {
      background: linear-gradient(135deg, #FF8C00 0%, #ff9f1a 100%) !important;
      color: white !important;
      padding: 20px 24px !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      box-shadow: 0 4px 12px rgba(255, 140, 0, 0.2) !important;
      border-radius: 24px 24px 0 0 !important;
      margin: 0 !important;
    }
    
    #universal-chat-header .header-left {
      display: flex !important;
      align-items: center !important;
      gap: 12px !important;
    }
    
    #universal-chat-header .status-indicator {
      width: 8px !important;
      height: 8px !important;
      background: #00ff88 !important;
      border-radius: 50% !important;
      box-shadow: 0 0 8px #00ff88 !important;
      animation: chatbot-pulse 2s ease-in-out infinite !important;
    }
    
    #universal-chat-header .header-title {
      font-size: 18px !important;
      font-weight: 600 !important;
      margin: 0 !important;
      line-height: 1.2 !important;
    }
    
    #universal-chat-header .header-subtitle {
      font-size: 12px !important;
      opacity: 0.9 !important;
      font-weight: normal !important;
      margin: 0 !important;
      line-height: 1.2 !important;
    }
    
    #universal-chat-header .header-controls {
      display: flex !important;
      gap: 8px !important;
      align-items: center !important;
    }
    
    #universal-chat-header .header-btn {
      background: rgba(255, 255, 255, 0.2) !important;
      border: none !important;
      color: white !important;
      width: 36px !important;
      height: 36px !important;
      border-radius: 50% !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 16px !important;
      font-weight: bold !important;
      transition: all 0.3s ease !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    
    #universal-chat-header .header-btn:hover {
      background: rgba(255, 255, 255, 0.3) !important;
      transform: scale(1.1) !important;
    }
    
    #universal-chat-body {
      flex: 1 !important;
      overflow-y: auto !important;
      overflow-x: hidden !important;
      padding: 24px !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 16px !important;
      background: linear-gradient(180deg, rgba(255, 140, 0, 0.02) 0%, transparent 100%) !important;
      margin: 0 !important;
    }
    
    #universal-chat-body .chat-message {
      max-width: 85% !important;
      padding: 16px 20px !important;
      border-radius: 20px !important;
      font-size: 15px !important;
      line-height: 1.4 !important;
      position: relative !important;
      animation: chatbot-messageSlide 0.3s ease-out !important;
      margin: 0 !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
    }
    
    #universal-chat-body .chat-message.bot {
      background: linear-gradient(135deg, rgba(255, 140, 0, 0.1) 0%, rgba(255, 140, 0, 0.05) 100%) !important;
      border: 1px solid rgba(255, 140, 0, 0.2) !important;
      align-self: flex-start !important;
      border-radius: 20px 20px 20px 5px !important;
      color: #333 !important;
    }
    
    #universal-chat-body .chat-message.user {
      background: linear-gradient(135deg, #FF8C00 0%, #ff9f1a 100%) !important;
      color: white !important;
      align-self: flex-end !important;
      border-radius: 20px 20px 5px 20px !important;
      box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3) !important;
    }
    
    #universal-chat-body .message-time {
      font-size: 11px !important;
      opacity: 0.6 !important;
      margin-top: 4px !important;
      margin-bottom: 0 !important;
    }
    
    #universal-chat-input-area {
      display: flex !important;
      padding: 20px 24px !important;
      background: rgba(255, 255, 255, 0.9) !important;
      backdrop-filter: blur(10px) !important;
      -webkit-backdrop-filter: blur(10px) !important;
      border-top: 1px solid rgba(255, 140, 0, 0.1) !important;
      gap: 12px !important;
      align-items: center !important;
      margin: 0 !important;
      border-radius: 0 0 24px 24px !important;
    }
    
    #universal-chat-input {
      flex: 1 !important;
      padding: 16px 20px !important;
      border-radius: 25px !important;
      border: 2px solid rgba(255, 140, 0, 0.2) !important;
      outline: none !important;
      font-size: 15px !important;
      background: white !important;
      transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
      font-family: inherit !important;
      margin: 0 !important;
      color: #333 !important;
    }
    
    #universal-chat-input:focus {
      border-color: #FF8C00 !important;
      box-shadow: 0 0 0 4px rgba(255, 140, 0, 0.1) !important;
    }
    
    #universal-chat-input::placeholder {
      color: #999 !important;
    }
    
    .universal-input-btn {
      width: 50px !important;
      height: 50px !important;
      border: none !important;
      border-radius: 50% !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 18px !important;
      transition: all 0.3s ease !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    
    #universal-voice-btn {
      background: linear-gradient(135deg, rgba(255, 140, 0, 0.1) 0%, rgba(255, 140, 0, 0.05) 100%) !important;
      color: #FF8C00 !important;
      border: 2px solid rgba(255, 140, 0, 0.3) !important;
    }
    
    #universal-voice-btn:hover, #universal-voice-btn.recording {
      background: linear-gradient(135deg, #FF8C00 0%, #ff9f1a 100%) !important;
      color: white !important;
      transform: scale(1.05) !important;
    }
    
    #universal-send-btn {
      background: linear-gradient(135deg, #FF8C00 0%, #ff9f1a 100%) !important;
      color: white !important;
      box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3) !important;
    }
    
    #universal-send-btn:hover {
      transform: scale(1.05) !important;
      box-shadow: 0 6px 16px rgba(255, 140, 0, 0.4) !important;
    }
    
    #universal-send-btn:disabled {
      opacity: 0.5 !important;
      cursor: not-allowed !important;
      transform: none !important;
    }

    /* Typing indicator */
    .universal-typing-indicator {
      display: flex !important;
      align-items: center !important;
      gap: 4px !important;
      padding: 16px 20px !important;
      background: rgba(255, 140, 0, 0.1) !important;
      border-radius: 20px 20px 20px 5px !important;
      max-width: 80px !important;
      align-self: flex-start !important;
      margin: 0 !important;
    }
    
    .universal-typing-dot {
      width: 8px !important;
      height: 8px !important;
      background: #FF8C00 !important;
      border-radius: 50% !important;
      animation: chatbot-typing 1.4s ease-in-out infinite !important;
    }
    
    .universal-typing-dot:nth-child(2) { 
      animation-delay: 0.2s !important; 
    }
    
    .universal-typing-dot:nth-child(3) { 
      animation-delay: 0.4s !important; 
    }

    /* Scrollbar styling */
    #universal-chat-body::-webkit-scrollbar {
      width: 6px !important;
    }
    
    #universal-chat-body::-webkit-scrollbar-track {
      background: rgba(255, 140, 0, 0.1) !important;
      border-radius: 3px !important;
    }
    
    #universal-chat-body::-webkit-scrollbar-thumb {
      background: rgba(255, 140, 0, 0.3) !important;
      border-radius: 3px !important;
    }
    
    #universal-chat-body::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 140, 0, 0.5) !important;
    }

    /* Animations */
    @keyframes chatbot-float {
      0%, 100% { 
        transform: translate(-50%, -50%) translateY(-5px) rotate(-2deg); 
      }
      50% { 
        transform: translate(-50%, -50%) translateY(5px) rotate(2deg); 
      }
    }
    
    @keyframes chatbot-glass-shine {
      0%, 100% { 
        opacity: 0.3; 
        transform: translateX(-100%) rotate(-45deg); 
      }
      50% { 
        opacity: 0.8; 
        transform: translateX(100%) rotate(-45deg); 
      }
    }
    
    @keyframes chatbot-blink {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }
    
    @keyframes chatbot-pulse {
      0%, 100% { 
        opacity: 0.7; 
        transform: scale(1); 
      }
      50% { 
        opacity: 1; 
        transform: scale(1.3); 
      }
    }
    
    @keyframes chatbot-messageSlide {
      from { 
        opacity: 0; 
        transform: translateY(10px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    @keyframes chatbot-typing {
      0%, 60%, 100% { 
        transform: translateY(0); 
        opacity: 0.4; 
      }
      30% { 
        transform: translateY(-10px); 
        opacity: 1; 
      }
    }
    
    @keyframes chatbot-slideUp {
      from { 
        opacity: 0; 
        transform: translateY(20px) scale(0.95); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0) scale(1); 
      }
    }

    /* Mobile responsiveness */
    @media screen and (max-width: 768px) {
      #universal-chat-window {
        width: calc(100vw - 20px) !important;
        height: calc(100vh - 120px) !important;
        bottom: 80px !important;
        right: 10px !important;
        left: 10px !important;
        border-radius: 20px !important;
        max-height: calc(100vh - 120px) !important;
      }
      
      #universal-chat-window.fullscreen {
        width: calc(100vw - 20px) !important;
        left: 10px !important;
        right: 10px !important;
        transform: none !important;
        height: calc(100vh - 120px) !important;
      }
      
      #universal-chatbot-icon {
        bottom: 20px !important;
        right: 20px !important;
        width: 55px !important;
        height: 55px !important;
      }
      
      #universal-chat-header {
        padding: 16px 20px !important;
      }
      
      #universal-chat-body {
        padding: 16px 20px !important;
      }
      
      #universal-chat-input-area {
        padding: 16px 20px !important;
      }
      
      #universal-chat-body .chat-message {
        max-width: 90% !important;
        font-size: 14px !important;
        padding: 14px 16px !important;
      }
    }

    @media screen and (max-width: 480px) {
      #universal-chat-window {
        width: calc(100vw - 10px) !important;
        height: calc(100vh - 100px) !important;
        bottom: 70px !important;
        right: 5px !important;
        left: 5px !important;
        border-radius: 16px !important;
      }
      
      #universal-chat-window.fullscreen {
        width: calc(100vw - 10px) !important;
        left: 5px !important;
        right: 5px !important;
      }
      
      #universal-chatbot-icon {
        bottom: 15px !important;
        right: 15px !important;
        width: 50px !important;
        height: 50px !important;
      }
      
      #universal-chat-header .header-title {
        font-size: 16px !important;
      }
      
      #universal-chat-header .header-subtitle {
        font-size: 11px !important;
      }
    }

    /* Ensure proper layering */
    body {
      position: relative !important;
    }
  `;

  // Inject CSS with high priority
  const style = document.createElement('style');
  style.id = 'universal-chatbot-styles';
  style.textContent = css;
  document.head.appendChild(style);

  // Utility function to get current time
  function getCurrentTime() {
    return new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  // Initialize chatbot after DOM is ready
  function initializeChatbot() {
    // Remove any existing chatbot elements
    const existingIcon = document.getElementById('universal-chatbot-icon');
    const existingWindow = document.getElementById('universal-chat-window');
    if (existingIcon) existingIcon.remove();
    if (existingWindow) existingWindow.remove();

    // Create chatbot icon with unique IDs
    const chatbotIcon = document.createElement('div');
    chatbotIcon.id = 'universal-chatbot-icon';
    chatbotIcon.innerHTML = `
      <div class="astronaut">
        <div class="astronaut-helmet">
          <div class="helmet-glass">
            <div class="helmet-inner-glass"></div>
          </div>
          <div class="antenna"></div>
        </div>
        <div class="astronaut-body"></div>
      </div>
    `;
    
    // Create chat window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'universal-chat-window';
    chatWindow.innerHTML = `
      <div id="universal-chat-header">
        <div class="header-left">
          <div class="status-indicator"></div>
          <div>
            <div class="header-title">University Assistant</div>
            <div class="header-subtitle">Online • Ready to help</div>
          </div>
        </div>
        <div class="header-controls">
          <button class="header-btn" id="universal-fullscreen-btn" title="Fullscreen" type="button">⛶</button>
          <button class="header-btn" id="universal-close-chat" title="Close Chat" type="button">✕</button>
        </div>
      </div>
      <div id="universal-chat-body">
        <div class="chat-message bot">
          👋 Welcome to Excellence University!
          <div class="message-time">${getCurrentTime()}</div>
        </div>
        <div class="chat-message bot">
          I'm your AI assistant, ready to help with admissions, programs, campus life, and more. What would you like to know?
          <div class="message-time">${getCurrentTime()}</div>
        </div>
      </div>
      <div id="universal-chat-input-area">
        <button class="universal-input-btn" id="universal-voice-btn" title="Voice Input" type="button">
          <span class="voice-icon">🎙️</span>
        </button>
        <input type="text" id="universal-chat-input" placeholder="Ask me anything about the university..." autocomplete="off"/>
        <button class="universal-input-btn" id="universal-send-btn" title="Send Message" type="button">➤</button>
      </div>
    `;

    // Append to body
    document.body.appendChild(chatbotIcon);
    document.body.appendChild(chatWindow);

    // Get elements
    const chatBody = document.getElementById('universal-chat-body');
    const chatInput = document.getElementById('universal-chat-input');
    const sendBtn = document.getElementById('universal-send-btn');
    const closeBtn = document.getElementById('universal-close-chat');
    const voiceBtn = document.getElementById('universal-voice-btn');
    const fullscreenBtn = document.getElementById('universal-fullscreen-btn');
    const voiceIcon = voiceBtn.querySelector('.voice-icon');

    let isFullscreen = false;

    // Toggle chat window with proper animation
    function toggleChat() {
      console.log('Chatbot icon clicked');
      
      if (chatWindow.classList.contains('show')) {
        // Close chat
        chatWindow.classList.remove('show');
        setTimeout(() => {
          chatWindow.style.display = 'none';
        }, 300);
        
        if (isFullscreen) {
          chatWindow.classList.remove('fullscreen');
          isFullscreen = false;
          fullscreenBtn.textContent = '⛶';
        }
      } else {
        // Open chat
        chatWindow.style.display = 'flex';
        // Force reflow
        chatWindow.offsetHeight;
        chatWindow.classList.add('show');
        
        // Focus input after animation
        setTimeout(() => {
          chatInput.focus();
        }, 100);
      }
    }

    // Event listeners
    chatbotIcon.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleChat();
    });

    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleChat();
    });

    // Fullscreen toggle
    fullscreenBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      isFullscreen = !isFullscreen;
      if (isFullscreen) {
        chatWindow.classList.add('fullscreen');
        fullscreenBtn.textContent = '⛶';
      } else {
        chatWindow.classList.remove('fullscreen');
        fullscreenBtn.textContent = '⛶';
      }
    });

    // Send message function
    function sendMessage() {
      const text = chatInput.value.trim();
      if (!text) return;

      sendBtn.disabled = true;

      // User message
      const userMsg = document.createElement('div');
      userMsg.className = 'chat-message user';
      userMsg.innerHTML = `
        ${escapeHtml(text)}
        <div class="message-time">${getCurrentTime()}</div>
      `;
      chatBody.appendChild(userMsg);
      scrollToBottom();
      chatInput.value = '';

      // Show typing indicator
      const typingIndicator = document.createElement('div');
      typingIndicator.className = 'universal-typing-indicator';
      typingIndicator.innerHTML = `
        <div class="universal-typing-dot"></div>
        <div class="universal-typing-dot"></div>
        <div class="universal-typing-dot"></div>
      `;
      chatBody.appendChild(typingIndicator);
      scrollToBottom();

      // Simulate bot response
      setTimeout(() => {
        chatBody.removeChild(typingIndicator);
        
        const responses = [
          "Thanks for your question! I'd be happy to help you with information about our university programs.",
          "That's a great question! Our admissions team can provide more detailed information about that topic.",
          "I understand you're interested in learning more. Let me connect you with the right resources.",
          "Our university offers many opportunities in that area. Would you like me to provide more specific details?",
          "That's something many students ask about. Our academic advisors would be perfect to discuss this with you.",
          "Great question! I can help you with that. Let me provide you with some detailed information.",
          "I'd be glad to assist you with that inquiry. Here's what I can tell you about our programs."
        ];
        
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message bot';
        botMsg.innerHTML = `
          ${responses[Math.floor(Math.random() * responses.length)]}
          <div class="message-time">${getCurrentTime()}</div>
        `;
        chatBody.appendChild(botMsg);
        scrollToBottom();
        
        sendBtn.disabled = false;
        chatInput.focus();
      }, 1200 + Math.random() * 800);
    }

    // Scroll to bottom function
    function scrollToBottom() {
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Escape HTML function
    function escapeHtml(text) {
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    // Event listeners for message sending
    sendBtn.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });

    // Voice input functionality
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      voiceBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (voiceBtn.classList.contains('recording')) {
          recognition.stop();
          return;
        }
        
        try {
          recognition.start();
          voiceBtn.classList.add('recording');
          voiceIcon.textContent = '🔴';
          chatInput.placeholder = 'Listening...';
        } catch (error) {
          console.error('Speech recognition error:', error);
        }
      });

      recognition.addEventListener('result', function(event) {
        const transcript = event.results[0][0].transcript;
        chatInput.value = transcript;
        voiceBtn.classList.remove('recording');
        voiceIcon.textContent = '🎙️';
        chatInput.placeholder = 'Ask me anything about the university...';
        chatInput.focus();
      });

      recognition.addEventListener('end', function() {
        voiceBtn.classList.remove('recording');
        voiceIcon.textContent = '🎙️';
        chatInput.placeholder = 'Ask me anything about the university...';
      });

      recognition.addEventListener('error', function(event) {
        console.error('Speech recognition error', event.error);
        voiceBtn.classList.remove('recording');
        voiceIcon.textContent = '🎙️';
        chatInput.placeholder = 'Ask me anything about the university...';
      });
    } else {
      // Hide voice button if not supported
      voiceBtn.style.display = 'none';
    }

    // Handle window resize
    function handleResize() {
      if (isFullscreen && window.innerWidth <= 768) {
        chatWindow.classList.remove('fullscreen');
        isFullscreen = false;
        fullscreenBtn.textContent = '⛶';
      }
    }

    window.addEventListener('resize', handleResize);

    // Prevent chat from interfering with page
    chatWindow.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    chatbotIcon.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    // Close chat when clicking outside (optional)
    document.addEventListener('click', function(e) {
      if (chatWindow.classList.contains('show') && 
          !chatWindow.contains(e.target) && 
          !chatbotIcon.contains(e.target)) {
        // Uncomment the line below if you want to close on outside click
        // toggleChat();
      }
    });

    console.log('Universal Chatbot initialized successfully');
  }

  // Wait for DOM to be ready and initialize
  function waitForDOM() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeChatbot);
    } else if (document.body) {
      // Small delay to ensure other scripts have loaded
      setTimeout(initializeChatbot, 100);
    } else {
      setTimeout(waitForDOM, 10);
    }
  }

  // Start the initialization process
  waitForDOM();

})();