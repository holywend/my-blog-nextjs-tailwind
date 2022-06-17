import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import { GetStaticProps } from "next";
import Image from "next/image";

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  return (
    <main>
      <div className="text-3xl text-center my-12 font-bold text-gray-600">
        <h1>My Blog</h1>
      </div>
      <div className="w-4/5 mx-auto">
        <h3 className="text-xl text-justify text-indigo-600 font-semibold">Daftar Artikel:</h3>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a className="text-blue-500">{title}</a>
              </Link>
              <br />
              <small className="text-sm text-gray-400">{date}</small>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
