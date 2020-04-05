class Room {

    constructor(roomId, roomTitle, namespace, doctor = null, patient = null, privateRoom = false) {
        this.roomId = roomId;
        this.roomTitle = roomTitle;
        this.namespace = namespace;
        this.privateRoom = privateRoom;
        this.history = [];
        this.doctor = doctor;
        this.patient = patient;
    }

    addMessage(message) {
        this.history.push(message);
    }

    clearHistory() {
        this.history.clear();
    }
}

export default Room;