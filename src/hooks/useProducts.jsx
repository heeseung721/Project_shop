import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts as fetchProducts, addNewProduct } from "../api/firebase";

// product에 관련된 읽기, 쓰기 등의 작업을 이곳에서 모두 모아서 관리함
// -> 한곳에서 동일한 캐시키로 데이터를 읽어오는 것과 업데이트 하는것이 같이 있으니 관리가 편함

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery(["products"], fetchProducts, {
    staleTime: 1000 * 60,
  });

  const addProduct = useMutation(
    ({ product, url }) => addNewProduct(product, url),
    { onSuccess: () => queryClient.invalidateQuries(["products"]) }
  );

  return { productsQuery, addProduct };
}
