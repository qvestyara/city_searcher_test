const BASE_URL =
  'http://api.geonames.org/searchJSON?featureClass=P&maxRows=50&orderby=population&username=hsample';

export async function getCities() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error(`Something went wrong with geonames api: ${response.statusText}`);
  }

  const data = await response.json();

  if (!Array.isArray(data?.geonames)) {
    throw new Error('Invalid data format from external api');
  }

  return data.geonames;
}