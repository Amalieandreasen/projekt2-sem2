export function sanitizeHTML(str) {
  if (!str) return "";

  const allowedTags = ["strong", "br", "span"];

  str = str.replace(/<script.*?>.*?<\/script>/gis, "");

  str = str.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, (match, tag) => {
    tag = tag.toLowerCase();

    if (!allowedTags.includes(tag)) return "";

    const isClosingTag = match.startsWith("</");
    if (isClosingTag) return `</${tag}>`;

    if (tag === "br") return "<br>";

    if (tag === "strong") return "<strong>";

    if (tag === "span") {
      const styleMatch = match.match(/style="([^"]*)"/i);

      if (!styleMatch) return "<span>";

      const styles = styleMatch[1]
        .split(";")
        .map((s) => s.trim().toLowerCase())
        .filter(
          (s) =>
            s === "font-style: italic" ||
            s === "text-decoration: underline"
        )
        .join("; ");

      return styles ? `<span style="${styles}">` : "<span>";
    }

    return `<${tag}>`;
  });

  return str;
}

export function sanitizeQuestion(question) {
  return {
    ...question,
    question: sanitizeHTML(question.question),
    options: Array.isArray(question.options)
      ? question.options.map((opt) => sanitizeHTML(opt))
      : undefined,
  };
}