document.addEventListener('DOMContentLoaded', function() {
    // Select conversation items
    const conversations = document.querySelectorAll('.conversation');
    
    // Handle conversation selection
    conversations.forEach(conversation => {
        conversation.addEventListener('click', function() {
            // Remove active class from all conversations
            conversations.forEach(c => c.classList.remove('active'));
            // Add active class to clicked conversation
            this.classList.add('active');
            
            // In a real app, you would load the conversation messages here
            // For now we're just demonstrating the UI
        });
    });
    
    // Handle sending messages
    const messageInput = document.querySelector('.message-input input');
    const sendButton = document.querySelector('.message-input button');
    
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const messageContent = document.querySelector('.message-content');
            
            // Create new message element
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message sent';
            messageDiv.innerHTML = `
                <p>${messageText}</p>
                <small>${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small>
            `;
            
            // Add to message area
            messageContent.appendChild(messageDiv);
            
            // Clear input
            messageInput.value = '';
            
            // Scroll to bottom
            messageContent.scrollTop = messageContent.scrollHeight;
            
            // In a real app, you would send the message to your backend here
        }
    }
    
    // Initialize with first conversation active
    if (conversations.length > 0) {
        conversations[0].click();
    }
});