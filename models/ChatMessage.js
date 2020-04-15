class ChatMessage {
    constructor(text, author, timestamp, roomId = '') {
        this.roomId = roomId;
        this.id = 999;
        this.text = text;
        this.author = author;
        //this.destination = destination;
        this.timestamp = timestamp;
    }
}

module.exports = ChatMessage;