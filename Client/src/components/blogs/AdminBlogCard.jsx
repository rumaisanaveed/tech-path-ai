import { Edit, Tag, Trash2 } from "lucide-react";

const AdminBlogCard = ({ post, onEdit, onDelete }) => {
  return (
    <div
      className="
        group rounded-2xl overflow-hidden
        bg-white
        border border-[#59A4C0]/20
        hover:border-[#59A4C0]/50
        transition
      "
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="
            w-full h-full object-cover
            transition-transform duration-300
            group-hover:scale-105
          "
        />

        {/* Actions */}
        <div
          className="
            absolute top-3 right-3
            flex gap-2
            opacity-0 group-hover:opacity-100
            transition
          "
        >
          <button
            onClick={() => onEdit(post)}
            className="
              p-2 rounded-full
              bg-white/90 text-[#59A4C0]
              hover:bg-[#59A4C0] hover:text-white
              shadow-sm transition
            "
          >
            <Edit size={14} />
          </button>

          <button
            onClick={() => onDelete(post.id)}
            className="
              p-2 rounded-full
              bg-white/90 text-red-500
              hover:bg-red-500 hover:text-white
              shadow-sm transition
            "
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3
          className="
            text-lg font-semibold
            text-custom-black-dark
            line-clamp-2
            mb-3
            group-hover:text-[#59A4C0]
            transition-colors
          "
        >
          {post.title}
        </h3>

        {/* Tags (only if exist) */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="
          inline-flex items-center gap-1
          px-2.5 py-1 rounded-full
          text-xs
          bg-[#59A4C0]/10
          text-[#59A4C0]
        "
              >
                <Tag size={10} />
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogCard;
