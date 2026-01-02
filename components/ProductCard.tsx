import Link from "next/link";

type ProductCardProps = {
  product: any;
  locale: string;
  companyName?: string;
  categoryName?: string;
};

export default function ProductCard({
  product,
  locale,
  companyName,
  categoryName,
}: ProductCardProps) {
  const name =
    locale === "ku"
      ? product.name_ku || product.name_en
      : locale === "ar"
      ? product.name_ar || product.name_en
      : product.name_en;

  const description = product.description || "";

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-4 space-y-3 text-sm transition hover:shadow-md">
      {/* IMAGE (CLICKABLE) */}
      <Link href={`/${locale}/products/${product.id}`}>
        <div className="relative w-full aspect-[4/3] rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden cursor-pointer">
          {product.image_url ? (
            <img
  src={product.image_url}
  alt={name}
  loading="eager"
  decoding="async"
  className="max-w-full max-h-full object-contain p-2"
/>

          ) : (
            <div className="text-xs text-gray-400">No image</div>
          )}
        </div>
      </Link>

      {/* NAME */}
      <div className="font-semibold text-slate-900 leading-snug">
        {name}
      </div>

      {/* META */}
      <div className="space-y-0.5">
        {companyName && (
          <div className="text-xs text-slate-500">
            <span className="font-medium">Brand:</span> {companyName}
          </div>
        )}

        {categoryName && (
          <div className="text-xs text-slate-500">
            <span className="font-medium">Category:</span> {categoryName}
          </div>
        )}
      </div>

      {/* DESCRIPTION */}
      {description && (
        <p className="text-xs text-slate-600 line-clamp-2">
          {description}
        </p>
      )}

      {/* VIEW DETAILS */}
      <Link
        href={`/${locale}/products/${product.id}`}
        className="inline-block pt-1 text-xs font-medium text-blue-600 hover:underline"
      >
        View details →
      </Link>
    </div>
  );
}
