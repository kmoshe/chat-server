class Doctor {
    constructor(id, firstName, lastName, facilityId, role) {
        this.id = id;
        this.facilityId = facilityId;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.endpoint = '';
        this.messages = [];
        this.currentRoom = {};
    }

    addMessage(message) {
        this.messages.push(message);
    }
}

module.exports = Doctor;