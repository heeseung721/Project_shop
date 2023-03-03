import React, { useState } from "react";
import { addNewProduct } from "../api/firebase";
import { uploadImage } from "../api/uploader";
import Button from "../components/ui/Button";

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmit = (e) => {
    //제품의 사진을 클라우디너리에 업로드 하고 URL을 획득
    //파이어베이스에 새로운 제품을 추가함
    e.preventDefault();

    //버튼 비활성화, 업로드중임을 보여줌
    setIsUploading(true);
    uploadImage(file)
      .then((url) => {
        addNewProduct(product, url).then(() => {
          setSuccess("제품이 등록 되었습니다!");
          //4초 후 메세지를 없앰
          setTimeout(() => {
            setSuccess(null);
          }, 3000);
        });
      })
      .finally(() => setIsUploading(false));
  };

  return (
    <>
      <section className="w-full text-center ">
        <h2 className="text-2xl font-bold my-4">새로운 제품 등록</h2>
        {success && <p className="my-2">{success}</p>}
        {file && (
          <img
            className="w-90 mx-auto mb-2"
            src={URL.createObjectURL(file)}
            alt="image file"
          />
        )}
        <form className="flex flex-col px-12" onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            name="file"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="title"
            value={product.title ?? ""}
            placeholder="제품명"
            required
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            value={product.price ?? ""}
            placeholder="가격"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            value={product.category ?? ""}
            placeholder="카테고리"
            required
            onChange={handleChange}
          />

          <input
            type="text"
            name="description"
            value={product.description ?? ""}
            placeholder="제품 설명"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="options"
            value={product.options ?? ""}
            placeholder="옵션들(콤마로 구분)"
            required
            onChange={handleChange}
          />
          <Button
            text={isUploading ? "업로드 중입니다" : "제품 등록하기"}
            disabled={isUploading}
          />
        </form>
      </section>
    </>
  );
}
