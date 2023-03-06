import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrUpdateToCart, getCart, removeFromCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function useCart() {
  //현재 사용자의 uid
  const { uid } = useAuthContext();

  const queryClient = useQueryClient();

  //uid가 존재하는 경우에만 api를 사용하도록 함
  const cartQuery = useQuery(["carts", uid || ""], () => getCart(uid), {
    enabled: !!uid,
  });

  //로그인한 사용자의 uid에 한해서만 해당
  const addOrUpdateItem = useMutation(
    (product) => addOrUpdateToCart(uid, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["carts", uid]);
      },
    }
  );

  const removeItem = useMutation((id) => removeFromCart(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", uid]);
    },
  });

  return { cartQuery, addOrUpdateItem, removeItem };
}
