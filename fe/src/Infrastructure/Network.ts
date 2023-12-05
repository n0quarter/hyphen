let _baseUrl: string = '';

export const initialize = (baseUrl: string): void => {
  _baseUrl = baseUrl;
};

export const post = async <T, U>(endpoint: string, data: U): Promise<T> => {

  const response = await fetch(`${_baseUrl}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error: ${response.status}: ${errorData?.error ?? 'Network Error'}` );
  }

  return await response.json() as T;
};

