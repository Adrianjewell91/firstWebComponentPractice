/** Gets user data from the RandomUser free api, and returns it. */

export const getUsernameData = function getUsernameData() {
  let data = fetch('https://randomuser.me/api/').then((r) => r.json())
                                                .then((r) => r);

  return data;
};
