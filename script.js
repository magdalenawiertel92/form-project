const textInputs = [...document.querySelectorAll(".textInput.user")]
const passwords = [...document.querySelectorAll(".password")]
const email = [...document.querySelectorAll("input.email")]
const checkbox = [...document.querySelectorAll(".square")]
let flag = true
let index = ""
let checked = [...document.querySelectorAll(".fullSquare")]
const tooltipUser = [...document.querySelectorAll("div.toolTip.User")]
const tooltipPasswords = [...document.querySelectorAll("div.toolTip.Password")]
const tooltipConfirm = document.querySelector("div.toolTip.Confirm")
const tooltipEmail = [...document.querySelectorAll("div.toolTip.Email")]
const tooltipLocation = document.querySelector("div.toolTip.Location")
const tooltipPhone = document.querySelector("div.toolTip.Phone")
const tooltipMessage = document.querySelector("div.toolTip.Message")
const tooltipCheckbox = document.querySelectorAll("div.toolTip.Checkbox")
const text = {
  username: "Value is required",
  password: "Enter password",
  confirmPassword: "Passwords do not match",
  email: "Enter you email",
  email_at: 'Put "@" in your email',
  email_dot: "Put rest of email",
  location: "Choose your localization",
  checkbox: "You need to accept the terms of the use",
  phone_number: "Enter your phone number",
  message: "Enter your message",
}
const buttons = document.querySelectorAll("button")

function addTooltip(argument, index, nameOftooltip) {
  if (argument) {
    nameOftooltip[index].style.visibility = "visible"
  } else {
    nameOftooltip[index].style.visibility = "hidden"
  }
}

function addTooltipSingle(argument, nameOftooltip) {
  if (argument) {
    nameOftooltip.style.visibility = "visible"
  } else {
    nameOftooltip.style.visibility = "hidden"
  }
}

function checkInput(index) {
  addTooltip(textInputs[index].value === "", index, tooltipUser)
  tooltipUser[index].textContent = text.username
}

function checkIfPassword(index) {
  addTooltip(!passwords[index].value, index, tooltipPasswords)
  tooltipPasswords[index].textContent = text.password
}

function checkIfSame(password) {
  const registerConfPassValue = document.getElementById(
    "registerConfirmPassword"
  ).value
  addTooltipSingle(
    registerConfPassValue !== password || !registerConfPassValue,
    tooltipConfirm
  )
  tooltipConfirm.textContent = text.confirmPassword
}

function checkEmail(index) {
  addTooltip(
    email[index].value === "" ||
      email[index].value.includes("@") === false ||
      email[index].value.includes(".") === false,
    index,
    tooltipEmail
  )
  if (email[index].value === "") {
    tooltipEmail[index].textContent = text.email
  } else if (email[index].value.includes("@") === false) {
    tooltipEmail[index].textContent = text.email_at
  } else if (email[index].value.includes(".") === false) {
    tooltipEmail[index].textContent = text.email_dot
  }
}

function checkLocation() {
  const location = document.querySelector("select")
  addTooltipSingle(location.value === "Your Location", tooltipLocation)
  tooltipLocation.textContent = text.location
}

function checkPhone() {
  const number = document.getElementById("recoverFormPhone")
  const regex = /^\d{9}$/
  addTooltipSingle(!regex.test(number.value), tooltipPhone)
  tooltipPhone.textContent = text.phone_number
}

function checkMessage() {
  const message = document.querySelector("textarea")
  addTooltipSingle(!message.value, tooltipMessage)
  tooltipMessage.textContent = text.message
}

function select(index) {
  if (flag) {
    checked[index].style.visibility = "visible"
    flag = false
  } else {
    checked[index].style.visibility = "hidden"
    flag = true
  }
}

function checkIfSelected(index) {
  addTooltip(
    checked[index].style.visibility === "hidden" ||
      checked[index].style.visibility === "",
    index,
    tooltipCheckbox
  )
  tooltipCheckbox[index].textContent = text.checkbox
}

textInputs.forEach((input, index) => {
  input.addEventListener("blur", () => {
    checkInput(index)
  })
})

passwords.forEach((password, index) => {
  password.addEventListener("blur", () => {
    checkIfPassword(index)
  })
})

passwords[0].addEventListener("blur", () => {
  if (document.getElementById("registerConfirmPassword").value) {
    checkIfSame(document.getElementById("registerPassword").value)
  }
})

document
  .getElementById("registerConfirmPassword")
  .addEventListener("blur", () => {
    checkIfSame(document.getElementById("registerPassword").value)
  })

email.forEach((em, index) => {
  em.addEventListener("blur", () => {
    checkEmail(index)
  })
})

document.querySelector("select").addEventListener("blur", () => {
  checkLocation()
})

document.getElementById("recoverFormPhone").addEventListener("blur", () => {
  checkPhone()
})

document.querySelector("textarea").addEventListener("blur", () => {
  checkMessage()
})

checkbox.forEach((box, index) => {
  box.addEventListener("click", () => {
    select(index)
  })
})

function checkIfCorrect(index) {
  if (index === 0) {
    checkInput(index)
    checkIfPassword(index)
    checkIfSame(document.getElementById("registerPassword").value)
    checkEmail(index)
    checkLocation()
    checkIfSelected(index)
  } else if (index === 1) {
    checkInput(index)
    checkEmail(index)
    checkMessage()
  } else if (index === 2) {
    checkInput(index)
    checkIfPassword(1)
  } else if (index === 3) {
    checkEmail(2)
    checkPhone()
  } else if (index === 5) {
    checkEmail(3)
  }
}

buttons.forEach((button, index) => {
  button.addEventListener("click", e => {
    e.preventDefault()
    checkIfCorrect(index)
  })
})
