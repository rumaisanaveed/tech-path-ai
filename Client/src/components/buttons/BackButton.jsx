import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function BackButton({ className }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className={cn(
        "text-base font-light w-24 flex items-center justify-center border border-custom-black-dark rounded-full",
        className
      )}
    >
      Back
    </button>
  );
}
