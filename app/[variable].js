// app/[variable].js
import { useRouter } from 'next/router';

export default function TodoPage() {
  const router = useRouter();
  const { variable } = router.query;

  return (
    <div>
      <h1>Todo: {variable}</h1>
      {/* Render additional content */}
    </div>
  );
}