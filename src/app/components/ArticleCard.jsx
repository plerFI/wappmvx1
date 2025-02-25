import Link from "next/link";

function ArticleCard(props) {
  return (
    <Link
      href={`${props.href}?utm_source=next-template`}
      className="bg-[#282828] px-2 sm:px-6 py-8 sm:p-4 rounded-xl shadow-xl shadow-themeGreen/20"
    >
      <article>
        <h2 className="text-lg text-themeGreen/80 mb-2">{props.title}</h2>
        <p className="text-sm text-white">{props.description}</p>
      </article>
    </Link>
  );
}

export default ArticleCard;
