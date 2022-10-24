import React from "react";
import styles from "./NotFound.module.scss";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className={styles["not-found"]}>
      <div className="my-auto">
        <h2>404</h2>
        <p className="text-2xl">Opppppsss, Sayfa Bulunamadı.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded">
          <Link to="/">&larr; Anasayfa'ya gitmek için tıklayınız</Link>
        </button>
      </div>
    </div>
  );
}

export default NotFound;
