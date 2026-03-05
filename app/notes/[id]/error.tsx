"use client";

type Props = {
  error: Error;
};

export default function Error({ error }: Props) {
  return (
    <div>
      <p>Could not fetch the note details. {error.message}</p>
    </div>
  );
}
