import React from "react";
import styles from "./ProductFilter.module.scss";

function ProductFilter() {
  return (
    <div className={styles.filter}>
      <h4>Kategoriler</h4>
      <div className={styles.category}>
        <button className="text-xl">Tüm Ürünler</button>
      </div>
      <h4>Marka</h4>
      <div className={styles.brand}>
        <select name="brand">
          <option value="all">Hepsi</option>
          <option value="">Apple</option>
          <option value="">Samsung</option>
          <option value="">Lg</option>
        </select>
        <h4>Cinsiyet</h4>
        <select name="gender">
          <option value="">Erkek</option>
          <option value="">Kadın</option>
        </select>
        <h4>Ürün Puanları</h4>
        <select name="" id="">
          <option value="">1 Yıldızlı Ürünler </option>
          <option value="">2 Yıldızlı Ürünler </option>
          <option value="">3 Yıldızlı Ürünler </option>
          <option value="">4 Yıldızlı Ürünler </option>
          <option value="">5 Yıldızlı Ürünler </option>
        </select>
        <h4>Fiyat</h4>
        <p>1500</p>
        <div className={styles.price}>
          <input type="range" name="proce" min="100" max="1000" />
        </div>
        <br />
        <button className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-2 rounded">
          Filtreyi Temizle
        </button>
      </div>
    </div>
  );
}

export default ProductFilter;
