const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Department = require("../models/department");
const Designation = require("../models/designation");

const getEmployeeModel = () => require("../models/employee");


// generating Unique Employee Id based on max and series
const generateEmpId = async () => {
  const Employee=getEmployeeModel();
  const lastEmployee = await Employee.findOne().sort({ empId: -1 }).exec();
  if (lastEmployee && lastEmployee.empId) {
    const lastIdNumber = parseInt(lastEmployee.empId.replace("EMPLOYEE", ""), 10);
    return `EMPLOYEE${(lastIdNumber + 1).toString().padStart(5, "0")}`;
  }
  return "EMPLOYEE00001"; 
};

// Generating Unique Departmentid
const generateDeptId = async () => {
  const lastDepartment = await Department.findOne().sort({ departmentId: -1 }).exec();
  if (lastDepartment && lastDepartment.departmentId) {
    const lastIdNumber = parseInt(lastDepartment.departmentId.replace("DEPT", ""), 10);
    return `DEPT${(lastIdNumber + 1).toString().padStart(3, "0")}`;
  }
  return "DEPT001"; 
};


// Generating Unique designation id
const generateDesignationId = async () => {
  const lastDesignation = await Designation.findOne().sort({ designationId: -1 }).exec();
  if (lastDesignation && lastDesignation.designationId) {
    const match = lastDesignation.designationId.match(/^DESGN(\d+)$/);
    if (match) {
      const lastIdNumber = parseInt(match[1], 10);
      return `DESGN${(lastIdNumber + 1).toString().padStart(3, "0")}`;
    }
  }
  return "DESGN001";
};


// Generate Random Secure Password for first time
const generatePassword = (length = 12) => {
  if (length < 8) {
    throw new Error("Password length must be at least 8 characters.");
  }
  return crypto.randomBytes(length).toString("base64").slice(0, length);
};

// Encrypting the  Password 
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare Encrypted Password
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  generateEmpId,
  generateDeptId,
  generatePassword,
  hashPassword,
  comparePassword,
  generateDesignationId
};
