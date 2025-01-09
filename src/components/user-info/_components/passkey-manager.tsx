"use client";

import { useEffect } from "react";
import { usePasskey } from "@/hooks/usePasskey";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import LoadingIndicator from "@/components/ui/loading-indicator";

interface PasskeyManagerProps {
  email: string;
}

export function PasskeyManager({ email }: PasskeyManagerProps) {
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

  const passkeyContainerProps = {
    registered,
    loading,
    onRegister: registerPasskey,
    onDelete: deletePasskey,
  };

  return (
    <div className="w-full space-y-4">
      <CardContent className="flex flex-col items-center space-y-2">
        {loading && <LoadingIndicator message="Passkey 상태 확인 중..." />}
        <PasskeyStatusContainer {...passkeyContainerProps} />
      </CardContent>
      {message && <MessageFooter message={message} />}
    </div>
  );
}

interface PasskeyStatusContainerProps {
  registered: boolean;
  loading: boolean;
  onRegister: () => void;
  onDelete: () => void;
}

function PasskeyStatusContainer({
  registered,
  loading,
  onRegister,
  onDelete,
}: PasskeyStatusContainerProps) {
  return registered ? (
    <RegisteredStatus onDelete={onDelete} loading={loading} />
  ) : (
    <UnregisteredStatus onRegister={onRegister} loading={loading} />
  );
}

interface RegisteredStatusProps {
  onDelete: () => void;
  loading: boolean;
}

function RegisteredStatus({ onDelete, loading }: RegisteredStatusProps) {
  return (
    <div className="text-center space-y-2">
      <p className="text-green-500 font-medium">
        Passkey가 활성화되어 있습니다.
      </p>
      <Button variant="destructive" onClick={onDelete} disabled={loading}>
        Passkey 삭제
      </Button>
    </div>
  );
}

interface UnregisteredStatusProps {
  onRegister: () => void;
  loading: boolean;
}

function UnregisteredStatus({ onRegister, loading }: UnregisteredStatusProps) {
  return (
    <div className="text-center space-y-2">
      <p className="text-red-500 font-medium">Passkey가 등록되지 않았습니다.</p>
      <Button variant="default" onClick={onRegister} disabled={loading}>
        Passkey 등록
      </Button>
    </div>
  );
}

interface MessageFooterProps {
  message: string;
}

function MessageFooter({ message }: MessageFooterProps) {
  return (
    <CardFooter>
      <p className="text-sm text-gray-600 text-center">{message}</p>
    </CardFooter>
  );
}
