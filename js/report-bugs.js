const form = document.getElementById("report-bug-form");

const username = document.getElementById("username");
const email = document.getElementById("email");
const server = document.getElementById("server");
const desc = document.getElementById("desc");
const followUp = document.getElementById("follow-up");

const inputs = [username, email, server, desc, followUp];

inputs.forEach((input) => {
  input.error = document.getElementById(input.id + "-error");
});

const setError = (input, message) => {
  input.classList.add("error");
  input.error.classList.add("visible");
  input.error.textContent = message;
};

const hideError = (input) => {
  input.classList.remove("error");
  input.error.classList.remove("visible");
};

const validateInput = (input) => {
  const message = input.validate();

  if (message === "") {
    hideError(input);
    return false;
  } else {
    setError(input, message);
    return true;
  }
};

const isAlphaNum = (c) => {
  const code = c.charCodeAt(0);
  return (
    (code >= 48 && code <= 57) ||
    (code >= 65 && code <= 90) ||
    (code >= 97 && code <= 122)
  );
};

const isValidEmailChar = (c) => {
  return isAlphaNum(c) || c === "@" || c === ".";
};

username.validate = () => {
  const text = username.value;

  if (text.length === 0) {
    return "Username cannot be blank";
  }
  for (let i = 0; i < text.length; i++) {
    if (!isAlphaNum(text[i])) {
      return "Username can only consist of letters and numbers";
    }
  }
  if (text.length < 3 || text.length > 25) {
    return "Username must consist of 3-25 characters";
  }

  return "";
};

email.validate = () => {
  const text = email.value;

  if (text.length === 0) {
    return "Email cannot be blank";
  }

  let at_n = 0;
  let dot_n = 0;

  if (text[0] === ".") {
    return "Email cannot start with a '.'";
  }
  if (text[0] === "@") {
    return "Email must include a part before '@'";
  }

  for (let i = 0; i < text.length; i++) {
    if (text[i] === "@") {
      at_n++;
    }
    if (text[i] === "." && at_n > 0) {
      dot_n++;
    }
    if (!isValidEmailChar(text[i])) {
      return "Email cannot include '" + text[i] + "'";
    }
    if (at_n > 1) {
      return "Email can only include one '@'";
    }
    if (text[i] === "." && text[i - 1] === ".") {
      return "'.' cannot be next to another '.'";
    }
    if (text[i] === "@" && text[i - 1] === ".") {
      return "Email part before '@' cannot end with a '.'";
    }
    if (text[i] === "." && text[i - 1] === "@") {
      return "Email domain after '@' cannot start with a '.'";
    }
  }

  if (at_n === 0) {
    return "Email must include an '@'";
  }
  if (text[text.length - 1] === "@") {
    return "Email must include a domain after '@'";
  }
  if (dot_n === 0) {
    return "Email domain after '@' must include a '.'";
  }
  if (text[text.length - 1] === ".") {
    return "Email cannot end with a '.'";
  }
  if (text[text.length - 2] === ".") {
    return "'.' in email domain must be followed by at least 2 letters";
  }
  return "";
};

server.validate = () => {
  if (server.value === "") {
    return "Please select the PALORANT server you play on";
  }
  return "";
};

desc.validate = () => {
  const text = desc.value;

  if (text.length === 0) {
    return "Bug description cannot be blank";
  }

  const wordCount = text.trim().split(" ").length;

  if (wordCount < 10 || wordCount > 300) {
    return "Bug description must consist of 10-300 words";
  }

  return "";
};

followUp.validate = () => {
  if (!followUp.checked) {
    return "Please check the box to proceed";
  }

  return "";
};

inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    validateInput(input);
  });

  input.addEventListener("input", () => {
    if (input.classList.contains("error")) {
      validateInput(input);
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputsOk = true;
  inputs.forEach((input) => {
    if (validateInput(input)) {
      if (inputsOk) {
        input.focus();
      }
      inputsOk = false;
    }
  });

  if (inputsOk) {
    window.location.replace("report-bugs/success.html?u=" + username.value);
  }
});
