import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrUpdateToCart, getCart, removeFromCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function useCart() {
  //현재 사용자의 uid
  const { uid } = useAuthContext();

  //쿼리를 인증된 사용자에 한해서만 캐시로 저장하고 관리
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

//useMutation 은 API호출의 결과를 캐싱하고, 해당 결과에 대한 업데이트나 재요청을 처리할때 유용함.
//-> 새로운 데이터를 만들거나 기존 데이터를 업데이트하는 등의 변경 작업을 수행할 수 있다.

// useMutation은 두 개의 매개변수를 받습니다. 첫 번째 매개변수는 API 호출을 수행하는 함수이며,
// 두 번째 매개변수는 API 호출 결과에 대한 옵션 객체입니다.
// 두 번째 매개변수에서 onSuccess 옵션을 설정하여 API 호출이 성공적으로 완료되었을 때 실행할
// 콜백 함수를 등록할 수 있습니다.
