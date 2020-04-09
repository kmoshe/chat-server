class Room {

    constructor(id, title, namespace, doctor = null, patient = null, privateRoom = false) {
        this.id = id;
        this.title = title;
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

    isPrivateRoom() {
        return this.privateRoom;
    }
}

module.exports = Room;