export async function POST() {
  const response = await fetch('http://api-component/container', {
    method: 'POST',
  });
  return response;
}
