import Link, { LinkProps } from "next/link";

export default function AppLink({
  children,
  ...restProps
}: LinkProps & { children: React.ReactNode }) {
  return (
    <Link
      {...restProps}
      className="h-7 tracking-widest bg-slate-600 flex items-center px-10 text-slate-50 self-start"
    >
      {children}
    </Link>
  );
}
