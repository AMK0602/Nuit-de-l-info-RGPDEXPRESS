const apiKey = 'YOUR_CHATGPT_API_KEY';
const chatContainer = document.getElementById('chatContainer');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
let tab = [
    {"role": "system", "content": "Tu es un assistant destiné à conseiller et aider les entreprises dans le respect du RGPD. Tu dois fournir des réponses précises et bien structurées pour conseiller efficacement l'entreprise. Tu n'as le droit de répondre qu'aux questions concernant le RGPD. Si on te pose une question sur un autre sujet que le RGPD, tu devras répondre : 'Je suis un assistant destiné à vous conseiller sur le RGPD, je ne peux pas répondre à ce genre de questions."},
]

function sendMessage() {
    const userMessage = userInput.value;

    if (userMessage.trim() === '') {
        return;
    }

    appendMessage('user', userMessage);
    fetch("/chat", {
        body: JSON.stringify(tab),
        method: "POST",
        headers:{
            "Content-Type":'application/json'
        }
    })
        .then((response) => response.text())
        .then((resultat) => appendMessage('assistant', resultat)) 

    userInput.value = '';

}

function appendMessage(sender, message) {
    tab.push({"role": sender, "content": message})
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerText = message;
    chatMessages.appendChild(messageElement);

    // Scroll to the bottom of the chat messages
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
