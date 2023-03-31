type ButtonProps = { isLoading?: boolean } & JSX.IntrinsicElements["button"];

function LoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-white opacity-50 flex items-center justify-center">
      <div className="animate-pulse rounded-sm h-10 w-full bg-amber-400"></div>
    </div>
  );
}

export default function Button({ children, ...restProps }: ButtonProps) {
  return (
    <button
      {...restProps}
      className="relative h-10 text-xl lowercase tracking-widest bg-slate-200 px-2"
    >
      {children}
      {restProps.isLoading && <LoadingOverlay />}
    </button>
  );
}
