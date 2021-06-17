import BookingEntity from "./booking-entity.js"

export default function buildMakeBooking() {


  let istance = Object.freeze({
    createBooking
  }
  );

  return {
    getInstance: function () {
      return istance;
    }
  }

  function createBooking({ id=createUUID(), from,to }) {
    return new BookingEntity({ id, from, to });
}


  function createUUID() {
    let dt = new Date().getTime()

    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0
      dt = Math.floor(dt / 16)
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })

    return uuid
  }

  function validateEmail(email) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(mailformat)) {
      return true;
    }
    else {
      return false;
    }
  }

}
function validateName(name) {
  var nameformat = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  if (name.match(nameformat)) {
    return true;
  }
  else {
    return false;
  }
}

function validatePhoneNo(number) {
  var telformat = /^\d{10}$/;
  if (number.match(telformat)) {
    return true;
  }
  else {
    return false;
  }
}


