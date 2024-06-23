import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}><span className={title({ color: "violet" })}>Immutable&nbsp;</span> Bookmarks for a Changeable Web.&nbsp;</h1>
        <br />
        <h2 className={subtitle({ class: "mt-4" })}>Starkmark is a decentralized storage and sharing application layer based on Starknet. On Starkmark, you can easily create bookmarks to mark URIs and share them. Besides serving as a favorites list, you can also use Starkmark as your navigation site.</h2>
      </div>

      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow"
          })}
          href={siteConfig.links.docs}
        >
          Try now
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
    </section>
  );
}
