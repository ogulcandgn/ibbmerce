import { addDoc, collection, Timestamp, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import styles from "./AddProducts.module.scss";
import { useNavigate } from "react-router";
import Loader from "../../loader/Loader";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Elektronik" },
  { id: 3, name: "Moda" },
  { id: 4, name: "Telefon" },
];

const initialState = {
  name: "",
  imageUrl: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

const AddProducts = () => {
  //product info
  const [product, setProduct] = useState({ ...initialState });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  //upload image from firebase
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    //* create eshop file
    const storageRef = ref(storage, `eshop  /${Date.now()}${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error("Hata..");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageUrl: downloadURL });
          toast.success("Resim başarıyla yüklendi");
        });
      }
    );
  };

  //add data to firebase
  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);
    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageUrl,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Ürün başarıyla eklendi");
      navigate("/admin/all-products");
    } catch {
      setIsLoading(false);
      toast.error("Ürün eklenemedi");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <form
          onSubmit={addProduct}
          className="bg-white shadow-md rounded px-8 pt-6 pb-3 "
        >
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ürün Adı
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Ürün adını giriniz"
              required
              name="name"
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Ürün Resmi
            </label>

            <input
              className="block w-full text-sm text-gray-900 rounded-lg border border-gray-300 cursor-pointer"
              type="file"
              name="image"
              required
              onChange={(e) => handleImageChange(e)}
            />

            <input
              type="text"
              placeholder="İmage url"
              name="imageUrl"
              value={product.imageUrl}
              disabled
            />

            <p className="mt-1 text-sm text-gray-400" id="file_input_help">
              Sadece PNG,JPEG ve JPG formatında dosya yükleyiniz.
            </p>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ürün Fiyatı
            </label>
            <input
              type="number"
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Lütfen ürün fiyatını giriniz.."
              required
              value={product.price}
              name="price"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ürün Kategorisi
            </label>
            <select
              id="category"
              required
              name="category"
              value={product.category}
              onChange={(e) => handleInputChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value="" disabled>
                Kategori seçiniz
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ürün Markası
            </label>
            <input
              type="text"
              placeholder="Ürünün markasını giriniz."
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
              name="brand"
              value={product.brand}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ürün Açıklaması
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ürün açıklamasını giriniz..."
              required
              name="desc"
              value={product.desc}
              onChange={(e) => handleInputChange(e)}
            ></textarea>
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Ürünü Kaydet
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProducts;
