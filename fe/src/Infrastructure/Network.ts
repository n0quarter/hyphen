let _baseUrl: string = '';

export const initialize = (baseUrl: string): void => {
  _baseUrl = baseUrl;
};

export const post = async <T, U>(endpoint: string, data: U): Promise<T> => {
  console.log(`POST: data = `, data);
  const response = await fetch(`${_baseUrl}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  console.log(`POST: JSON.stringify(data) = `, JSON.stringify(data));

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error: ${response.status}, ${JSON.stringify(errorData)}`);
  }

  return await response.json() as T;
};

