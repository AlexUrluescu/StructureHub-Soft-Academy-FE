export default async function Home() {
  const response = await fetch("http://127.0.0.1:8000/api/mock");
  const data = await response.json();
  console.log(data);
  return <div>hei</div>;
}
