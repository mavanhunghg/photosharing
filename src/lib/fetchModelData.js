export const fetchModel = async (url, timeout = 5000) => {
  if (!url) {
    console.error('fetchModel error: URL is required');
    return null;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`http://localhost:3000/api${url}`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Error fetching ${url}: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error(`fetchModel error for URL ${url}: Request timed out`);
    } else {
      console.error(`fetchModel error for URL ${url}:`, err);
    }
    return null;
  }
};