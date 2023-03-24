import Image from "next/image";
import Link from "next/link";
import facebook from "../../assets/images/facebook.svg";
import instagram from "../../assets/images/instagram.svg";
import linkedin from "../../assets/images/linkedin.svg";
import twitter from "../../assets/images/twitter.svg";

export default function SidebarBottom() {
  return (
    <div className="flex">
      <ul className="flex gap-2 justify-center items-center w-full py-6 text-zinc-400">
        <li className="bg-slate-800 p-2.5 rounded-full">
          <Link href="" target="_blank">
            <Image src={instagram} alt="instagram" className="w-5" />
          </Link>
        </li>
        <li className="bg-slate-800 p-2.5 rounded-full">
          <Link href="" target="_blank">
            <Image src={twitter} alt="twitter" className="w-5" />
          </Link>
        </li>
        <li className="bg-slate-800 p-2.5 rounded-full">
          <Link href="" target="_blank">
            <Image src={facebook} alt="facebook" className="w-5" />
          </Link>
        </li>
        <li className="bg-slate-800 p-2.5 rounded-full">
          <Link href="" target="_blank">
            <Image src={linkedin} alt="linkedin" className="w-5" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
