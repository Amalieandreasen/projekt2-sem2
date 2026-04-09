export function sanitizeHTML(str) {
  if (!str) return "";

  const allowedTags = ["strong", "br", "span"];
  const allowedStyles = ["italic", "underline"];

  str = str.replace(/<script.*?>.*?<\/script>/gi, "");

  str = str.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, (match, tag) => {
    tag = tag.toLowerCase();

    if (!allowedTags.includes(tag)) return "";

    const isClosingTag = match.startsWith("</");
    if (isClosingTag) return `</${tag}>`;

    if (tag === "br") return "<br>";

    if (tag === "span") {
      const styleMatch = match.match(/style="([^"]*)"/i);

      if (styleMatch) {
        const styles = styleMatch[1]
          .split(";")
          .map((s) => s.trim())
          .filter((s) => {
            const lower = s.toLowerCase();
            return (
              lower === "font-style: italic" ||
              lower === "text-decoration: underline"
            );
          })
          .join("; ");

        return `<span${styles ? ` style="${styles}"` : ""}>`;
      }

      return "<span>";
    }

    return `<${tag}>`;
  });

  return str;
}

export function sanitizeQuestion(question) {
  return {
    ...question,
    question: sanitizeHTML(question.question),
    options: question.options?.map((opt) => sanitizeHTML(opt)),
  };
}