import Head from 'next/head';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';


export async function getStaticProps(){
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }){
  return (
    <Layout home>
      <Head>
        <title>{Layout.siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Salve meu nome eh murilo</p>
        <p>
          (Site simples feito com nextJS usando o tutorial da documentação oficial)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>          
          ))}
        </ul>
      </section>
    </Layout>
  )
};