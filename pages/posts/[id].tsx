import { getAllPostIds, getPostData } from "../../lib/posts";
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  return (
    <main>
      <div className="text-3xl text-center my-12 font-bold text-gray-600">
        <h1>My Blog</h1>
      </div>
      <div className="w-4/5 mx-auto">
        <article>
          <h1>{postData.title}</h1>
          <div className="text-gray-600">Tanggal: {postData.date}</div>
          <div
            className="pt-4 text-justify"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
          <div className="my-4">
            <Link href="/">
              <a className="text-xl font-bold text-gray-600">← back to home</a>
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};
