class Namespaces {
    constructor() {
        this.namespaces = [];
    }

    getNamespace(doctorId) {
        return this.namespaces[doctorId];
    }

    setNamespace(doctorId, namespace) {
        this.namespaces[doctorId] = namespace;
    }
}

module.exports = Namespaces;