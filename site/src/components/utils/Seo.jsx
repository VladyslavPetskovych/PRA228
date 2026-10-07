import React from "react";
import { Helmet } from "react-helmet";
import { buildHead } from "../../seo/config";

/**
 * Мета-теги сторінки. Для статичних сторінок достатньо передати path —
 * заголовок, опис і структуровані дані підтягнуться з seo/config.js.
 *
 * <Seo path="/contacts" />
 * <Seo {...apartmentSeo(room, "short")} />
 * <Seo title="..." noindex />
 */
export default function Seo(props) {
  const { title, tags, jsonLd } = buildHead(props);

  return (
    <Helmet>
      <title>{title}</title>
      {tags.map(({ tag: Tag, attrs }) => (
        <Tag key={`${attrs.name || attrs.property || attrs.rel}`} {...attrs} />
      ))}
      {jsonLd.map((data, i) => (
        <script key={`ld-${i}`} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
