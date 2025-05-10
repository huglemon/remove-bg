import Link from "next/link";
const NavLinks = ({ links = [], title = "" }) => {
  return (
    <div className="md:text-md flex flex-col items-center gap-2 text-sm md:gap-5">
      <p className="font-bold">{title}</p>
      {links.length > 0 &&
        links?.map((link, index) => (
          <Link href={link.url} key={index}>
            {link.name}
          </Link>
        ))}
    </div>
  );
};

export default NavLinks;
