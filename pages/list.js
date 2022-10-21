import axios from "axios";
import { server } from "../components/utils/config";
import Lists from "../components/List";
import { Fragment } from "react";
import Head from "next/head";

const List = ({ list }) => {
  return (
    <Fragment>
      <Head>
        <title>List User</title>
      </Head>
      <Lists list={list} />
      ;\
    </Fragment>
  );
};

export const getServerSideProps = async () => {
  const list = (await axios.get(`${server}/api/user/list`)).data.list;

  return {
    props: {
      list,
    },
  };
};

export default List;
