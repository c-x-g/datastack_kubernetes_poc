export async function GET() {
  const response = await fetch("http://api-component/container");
  return response;
}
