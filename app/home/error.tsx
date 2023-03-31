"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div>
      <h1>Error when rendering users</h1>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
