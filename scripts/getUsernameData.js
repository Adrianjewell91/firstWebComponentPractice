export const getUsernameData = function getUsernameData() {
  let data = fetch('https://randomuser.me/api/').then((r) => r.json())
                                                .then((r) => r);

  return data;
};
