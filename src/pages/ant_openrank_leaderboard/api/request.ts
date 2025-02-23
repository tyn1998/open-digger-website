/**
 * A generic method to fetch JSON data using fetch.
 * @param path - The target path for the request.
 * @returns Resolved JSON data, with its type specified by the generic T.
 */

const BASE_URL = 'https://alibaba-openrank.oss-cn-hangzhou.aliyuncs.com/alibaba_openrank';

const request = async <T>(path: string): Promise<T> => {
  const url = `${BASE_URL}${path}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw error to be caught externally
  }
};

export default request;
