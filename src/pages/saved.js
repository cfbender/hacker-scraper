import React from "react";
import { useFetchUser } from "../lib/user";
import Layout from "../components/layout";

function SavedArticles({ user }) {
  return (
    <>
      <h1>Profile</h1>

      <div>
        <h3>Profile (server rendered)</h3>
        <img src={user.picture} alt="user picture" />
        <p>nickname: {user.nickname}</p>
        <p>name: {user.name}</p>
      </div>
    </>
  );
}

function Saved() {
  const { user, loading } = useFetchUser({ required: true });

  return (
    <Layout user={user} loading={loading}>
      {loading ? <>Loading...</> : <SavedArticles user={user} />}
    </Layout>
  );
}

export default Saved;
