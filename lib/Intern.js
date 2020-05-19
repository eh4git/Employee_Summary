// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee {

    constructor(name, id, email, officeNumber) {
      super(name, id, email);
      this.officeNumber = officeNumber;
    }
  
    getRole() {
      return "Intern";
    }
  
    getOfficeNumber() {
      return this.officeNumber;
    }
  
  }
  
  module.exports = Intern;