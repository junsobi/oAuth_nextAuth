import { useState, useCallback } from "react";
import { signIn } from "next-auth/webauthn";

export function usePasskey(email: string | undefined) {
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const checkRegistration = useCallback(async () => {
    if (!email) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `/api/auth/check-passkey?email=${encodeURIComponent(email)}`
      );
      const data = await res.json();
      setRegistered(data.registered);
    } catch (error) {
      console.error("Passkey 상태 확인 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  }, [email]);

  // Passkey 등록
  const registerPasskey = useCallback(async () => {
    setLoading(true);
    setMessage("Passkey 등록 중...");

    try {
      await signIn("passkey", { action: "register" });
      setMessage("Passkey가 성공적으로 등록되었습니다.");
      checkRegistration();
    } catch (error) {
      setMessage("Passkey 등록에 실패했습니다.");
      console.error("Passkey 등록 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  }, [checkRegistration]);

  // Passkey 삭제
  const deletePasskey = useCallback(async () => {
    if (!email) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `/api/auth/check-passkey?email=${encodeURIComponent(email)}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setMessage("Passkey가 성공적으로 삭제되었습니다.");
        setRegistered(false);
      } else {
        setMessage("Passkey 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Passkey 삭제 중 오류 발생:", error);
      setMessage("Passkey 삭제 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [email]);

  // 훅에서 사용할 상태와 함수 반환
  return {
    registered, // Passkey 등록 여부
    loading, // 로딩 상태
    message, // 사용자에게 표시할 메시지
    checkRegistration, // Passkey 등록 상태 확인 함수
    registerPasskey, // Passkey 등록 함수
    deletePasskey, // Passkey 삭제 함수
  };
}
