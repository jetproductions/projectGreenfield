const Updater = async (e, id, qa, type) => {
  e.preventDefault();
  const status = await fetch(`http://52.26.193.201:3000/qa/${qa}/${id}/${type}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' } }).then((result) => result.status);
  return status === 204;
};

export default Updater;
