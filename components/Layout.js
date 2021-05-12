import Head from "next/head";
import styles from '../styles/Layout.module.css'

export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title> {title} </title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <div className={styles.container}>
      {children}
      </div>
    </div>
  );
}

Layout.defaultProps = {
  title: "DJ Events | Find THe Hottest Parties",
  description: "Find THe Latest DJ and Other Musical Events",
  keywords: "Music , DJ , Event ,EDM",
};