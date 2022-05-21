const Sessions = () => {
  const isLoggedIn = () => {
    const res = localStorage.getItem("session");
    return res === 'true'? true : false;
  }
  return { isLoggedIn }
}

export default Sessions;