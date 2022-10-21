import Head from "next/head";
import { Fragment } from "react";
import Forms from "../components/Form";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Task</title>
      </Head>
      <Forms />
    </Fragment>
  );
}
