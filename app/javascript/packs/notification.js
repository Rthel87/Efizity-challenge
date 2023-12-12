const notification = document.getElementsByClassName('notification')[0];

const closeNotification = () => {
  if (notification !== undefined) {
    setTimeout(() => {notification.hidden = true}, 7900);
  }
}

closeNotification();
