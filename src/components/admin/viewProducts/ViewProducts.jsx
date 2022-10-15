import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { useEffect } from "react";
import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import Loader from "../../loader/Loader";
import styles from "./ViewProducts.module.scss";
import Notiflix from "notiflix";
import { useDispatch } from "react-redux";
import { STORE_PRODUCT } from "../../../redux/slice/productSlice";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);

  //collection product infos to firebase
  const getProducts = () => {
    setIsLoading(true);

    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createdAt", "desc"));

      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs);
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(allProducts);
        setProducts(allProducts);
        setIsLoading(false);
        dispatch(
          STORE_PRODUCT({
            products: allProducts,
          })
        );
      });
    } catch {
      setIsLoading(false);
      toast.error("Ürün eklenemedi");
    }
  };

  //confirm delete before delete product
  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Ürünü silmek istiyor musunuz ?",
      "Bu ürünü silmek üzeresiniz",
      "Sil",
      "İptal",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "5px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  //delete product
  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Ürün başarıyla silindi");
    } catch (error) {
      toast.error("Ürün bir hatadan dolayı silinemedi");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2 className="text-3xl mb-5">Ürün Listesi</h2>
        {products.length === 0 ? (
          <p>Ürün bulunamadı.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Resim</th>
                <th>Ürün İsmi</th>
                <th>Kategori</th>
                <th>Fiyat</th>
                <th>Düzenle</th>
              </tr>
            </thead>
            {products.map((product, index) => {
              const { id, name, price, imageURL, category } = product;
              return (
                <tbody className="even:bg-slate-50">
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`${price} ₺`} </td>
                    <td className="flex">
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        )}
      </div>
    </>
  );
};

export default ViewProducts;
