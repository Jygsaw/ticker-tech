// TODO: replace with real DB calls

export function dummyGetUser(username: string = null) {
  if (username === null) { return null; }

  if (username === "fakeuser") {
    return {
      "id": 9999,
      "username": "fakeuser",
      "password": "booger",
      "email": "fakeuser@example.com",
      "firstName": "fake",
      "lastName": "user"
    };
  } else {
    return null;
  }
}
