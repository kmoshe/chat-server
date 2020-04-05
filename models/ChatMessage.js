class ChatMessage {
    constructor(text, author, timestamp, destination = '') {
        this.id = 999;
        this.text = text;
        this.author = author;
        this.destination = destination;
        this.timestamp = timestamp;
    }
}

export default ChatMessage;