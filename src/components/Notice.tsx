// src/components/Notice.tsx
type Props = {
  kind: "success" | "error" | "info";
  children: React.ReactNode;
};
export default function Notice({ kind, children }: Props) {
  const styles =
    kind === "success"
      ? "bg-emerald-900/30 text-emerald-200 ring-emerald-800/40"
      : kind === "error"
      ? "bg-red-900/30 text-red-200 ring-red-800/40"
      : "bg-amber-900/30 text-amber-100 ring-amber-800/40";
  return (
    <div className={`mb-4 rounded-md p-3 ring-1 ${styles}`}>
      {children}
    </div>
  );
}
