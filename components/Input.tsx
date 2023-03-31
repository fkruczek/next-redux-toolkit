import { useFormContext } from "react-hook-form";

type InputProps = { name: string } & JSX.IntrinsicElements["input"];

export default function Input({ name, ...props }: InputProps) {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  const fieldError = errors[name];

  return (
    <label className="grid content-start">
      <span className="tracking-widest">{name}:</span>
      <input
        data-cy={name}
        className="relative h-8 text-xl lowercase tracking-widest bg-slate-200 px-2"
        {...props}
        {...register(name)}
      />
      <p className="text-xs mt-1 h-8 text-orange-700">
        {fieldError?.message?.toString()}
      </p>
    </label>
  );
}
