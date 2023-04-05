
//Register validation
export const registerValidation = (data) => {
  const { name, email, password} = data;
  let errors = [];

  //checking required fields
  if (!name || !email || !password) {
    errors.push({ msg: "please fill in all fields" });
    return errors
  }

  // const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,20}/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
  if (!passwordRegex.test(password)) {
    errors.push({
      msg: "password should have one small case, a capital letter, a symbol and a number and also the length should be greater than 8 and less than 20",
    });
    return errors

  }

  const mailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-]+$/;
  if (!mailRegex.test(email)) {
    errors.push({ msg: "Enter a valid email address" });
    return errors
  }
  return [{msg: null}]
};

//Login validation
export const loginValidation = (data) => {
  const { email} = data;
  const errors =[]
  const mailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-]+$/;
  if (!mailRegex.test(email)) {
    errors.push({ msg: "Enter a valid email address" });
    return errors;
  }
  return [{msg: null}]
};


