export function CatalogStripe({ slug, id }: { slug: string; id: string }) {
  return (
    <aside className="catalog-stripe" aria-hidden="true">
      <span>
        BOK · LEARNING LAB · {id} · ©2026 · {slug}
      </span>
    </aside>
  );
}
