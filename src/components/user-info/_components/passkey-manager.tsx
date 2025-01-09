"use client";

import { useEffect } from "react";
import { usePasskey } from "@/hooks/usePasskey";
import { Button } from "@/components/ui/button";
import LoadingIndicator from "@/components/ui/loading-indicator";

interface PasskeyManagerProps {
  email: string;
}

export default function PasskeyManager({ email }: PasskeyManagerProps) {
  const {
    registered,
    loading,
    message,
    checkRegistration,
    registerPasskey,
    deletePasskey,
  } = usePasskey(email);

  useEffect(() => {
    checkRegistration();
  }, [checkRegistration]);

  return (
    <div className="flex flex-col h-12">
      {loading && <LoadingIndicator message="Passkey 상태 확인 중..." />}
      <Status
        registered={registered}
        loading={loading}
        onRegister={registerPasskey}
        onDelete={deletePasskey}
      />
      {message && <MessageFooter message={message} />}
    </div>
  );
}

interface StatusProps {
  registered: boolean;
  loading: boolean;
  onRegister: () => void;
  onDelete: () => void;
}

function Status({ registered, loading, onRegister, onDelete }: StatusProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <p
        className={`text-base ${
          registered ? "text-green-500" : "text-red-500"
        }`}
      >
        {registered
          ? "Passkey가 활성화되어 있습니다."
          : "Passkey가 등록되지 않았습니다."}
      </p>
      <Button
        variant={registered ? "destructive" : "default"}
        onClick={registered ? onDelete : onRegister}
        disabled={loading}
      >
        {registered ? "Passkey 삭제" : "Passkey 등록"}
      </Button>
    </div>
  );
}

interface MessageFooterProps {
  message: string;
}

function MessageFooter({ message }: MessageFooterProps) {
  return (
    <div>
      <p className="text-sm text-gray-600 text-center">{message}</p>
    </div>
  );
}
