export async function post<T>(path: string, data?: unknown): Promise<T> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const resData = await res.json();
  return resData;
}

export const get = async <T>(path: string): Promise<T> => {
  const res = await fetch(path, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const resData = await res.json();
  return resData;
};

export const patch = async <T>(path: string, data: unknown): Promise<T> => {
  const res = await fetch(path, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const resData = await res.json();
  return resData;
};

export const remove = async <T>(path: string): Promise<T> => {
  const res = await fetch(path, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const resData = await res.json();
  return resData;
};
