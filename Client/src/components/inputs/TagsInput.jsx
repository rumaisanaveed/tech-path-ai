import clsx from "clsx";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { X } from "lucide-react";

export function TagInput({
  value = [],
  onChange,
  name,
  placeholder = "",
  label,
  disabled,
  ...rest
}) {
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    if (!inputValue.trim()) return;

    const newTags = [...value, inputValue.trim()];
    onChange(newTags);
    setInputValue("");
  };

  const removeTag = (tagToRemove) => {
    const newTags = value.filter((t) => t !== tagToRemove);
    onChange(newTags);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder={placeholder}
        value={inputValue}
        label={label}
        name={name}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        {...rest}
      />

      <ShowTags
        containerClassName="flex-wrap"
        tags={value}
        onDelete={removeTag}
      />
    </div>
  );
}

export const ShowTags = ({
  containerClassName = "",
  tagPillClassName = "",
  tags = [],
  onDelete,
}) => {
  return (
    <div className={clsx("flex items-center gap-1", containerClassName)}>
      {tags.slice(0, 3).map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className={clsx("flex items-center gap-1", tagPillClassName)}
        >
          {tag}
          {onDelete && (
            <X
              className="cursor-pointer w-3 h-3"
              onClick={() => onDelete(tag)}
            />
          )}
        </Badge>
      ))}
      {tags.length > 3 && <Badge variant="secondary">+{tags.length - 3}</Badge>}
    </div>
  );
};
