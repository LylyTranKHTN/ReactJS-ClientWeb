class Base {
    toModel() { throw new Error('static toModel(jsonData) is not implemented'); }
    toJSON() { throw new Error(' toJSON() is not implemented'); }
    toString() { return ''; }
}

export default Base;
