const BASE_URL = 'http://localhost:4000/api';

const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.error || data.err) {
      throw new Error(data.error || data.err);
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      // Your backend puts the user info in "payload"
      return JSON.parse(atob(data.token.split(".")[1])).payload;
    }

    throw new Error("Invalid response from server");
  } catch (err) {
    throw new Error(err);
  }
};

const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.error || data.err) {
      throw new Error(data.error || data.err);
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      // Your backend puts the user info in "payload"
      return JSON.parse(atob(data.token.split(".")[1])).payload;
    }

    throw new Error("Invalid response from server");
  } catch (err) {
    throw new Error(err);
  }
};

export { signUp, signIn };
