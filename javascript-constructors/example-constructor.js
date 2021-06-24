function exampleConstructor() {};

console.log('value of prototype property of ExampleConstructor: ', exampleConstructor.prototype);

console.log('type of prototype property of ExampleConstructor: ', typeof exampleConstructor.prototype);

var newObject = new exampleConstructor();

console.log('variable newObject: ', newObject);

var isInstance = newObject instanceof exampleConstructor;

console.log('is newObject variable an instance of exampleConstructor? ', isInstance);
