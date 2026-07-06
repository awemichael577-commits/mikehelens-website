export function AdminNotice({ saved, error }: { saved?: string; error?: string }) {
  return (
    <>
      {saved ? (
        <p className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-bold text-green-700">
          Changes saved.
        </p>
      ) : null}
      {error ? (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
          {decodeURIComponent(error)}
        </p>
      ) : null}
    </>
  );
}
