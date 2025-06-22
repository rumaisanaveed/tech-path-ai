import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function BackButton({ className, onClickHandler }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={onClickHandler ? onClickHandler : handleNavigate}
      className={cn(
        "text-base font-light w-24 flex items-center justify-center border border-custom-black-dark rounded-full",
        className
      )}
    >
      Back
    </button>
  );
}
