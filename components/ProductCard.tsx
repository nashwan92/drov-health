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
      <div className="bg-white rounded-xl border shadow p-3 space-y-2 text-sm">
        {product.image_url && (
          <img
            src={product.image_url}
            className="w-full h-32 object-cover rounded"
            alt={name}
          />
        )}
  
        <div className="font-semibold text-slate-900">{name}</div>
  
        {companyName && (
          <div className="text-xs text-slate-500">Brand: {companyName}</div>
        )}
  
        {categoryName && (
          <div className="text-xs text-slate-500">Category: {categoryName}</div>
        )}
  
        {description && (
          <p className="text-xs text-slate-600 line-clamp-2">{description}</p>
        )}
  
        <div className="text-pink-600 font-bold mt-1">${product.price}</div>
      </div>
    );
  }
  