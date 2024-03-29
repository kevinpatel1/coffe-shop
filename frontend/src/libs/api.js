const baseURL = "http://localhost:3006/api";

export async function registerUser(credentials) {
  const data = await fetch(`${baseURL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const _data = await data.json();
  return _data;
}
export async function loginUser(credentials) {
  const data = await fetch(`${baseURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const _data = await data.json();
  return _data;
}

export async function allProductByCategoryIdApi(categoryId) {
  const data = await fetch(
    `${baseURL}/product/listByCategory?categoryId=${categoryId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const _data = await data.json();
  return _data;
}
export async function allProductApi() {
  const data = await fetch(`${baseURL}/product/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const _data = await data.json();
  return _data;
}
export async function allCategoryApi() {
  const data = await fetch(`${baseURL}/category/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const _data = await data.json();
  return _data;
}

export async function paymentOrderApi(payloadData, token) {
  const data = await fetch(`${baseURL}/payment/paymentOrder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(payloadData),
  });
  const _data = await data.json();
  return _data;
}
export async function paymentVerifyApi(payloadData, token) {
  const data = await fetch(`${baseURL}/payment/paymentVerify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(payloadData),
  });
  const _data = await data.json();
  return _data;
}
