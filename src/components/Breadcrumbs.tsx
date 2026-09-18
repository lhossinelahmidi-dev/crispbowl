import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  url: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://crispbowl.com${item.url}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          {items.map((item, index) => (
            <li key={item.url} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              {index === items.length - 1 ? (
                <span className="text-gray-900 font-medium">{item.label}</span>
              ) : (
                <Link href={item.url} className="hover:text-[#FF6B35] transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export default Breadcrumbs;

