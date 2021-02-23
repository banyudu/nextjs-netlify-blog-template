import { promises as fs } from 'fs'
import readdir from 'recursive-readdir'
import path from 'path'
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";

const Faq = ({ author, body }) => {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className="container">
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          flex: 1 1 auto;
          padding: 0 1.5rem;
          margin: 8px auto;
        }
      `}</style>
    </Layout>
  )
};

export async function getStaticProps({ params }) {
  const faqDir = path.join(process.cwd(), 'src', 'data', 'faq')
  let props = {}
  if (params?.slug?.length) {
    const jsonFile = path.join(faqDir, ...params.slug) + '.json'
    const fileContent = await fs.readFile(jsonFile, 'utf-8')
    props = JSON.parse(fileContent)
  }
  return { props };
}

export async function getStaticPaths () {
  const faqDir = path.join(process.cwd(), 'src', 'data', 'faq')
  const files = await readdir(faqDir)
  const paths = files.filter(item => item.endsWith('.json')).map(item => '/faq' + item.substr(faqDir.length, item.length - faqDir.length - '.json'.length))
  return { paths: paths, fallback: false };
}

export default Faq;
