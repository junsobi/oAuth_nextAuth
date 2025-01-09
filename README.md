# 📘 NextAuth.js 기반 인증 연습 프로젝트


![스크린샷 2025-01-09 11 20 09](https://github.com/user-attachments/assets/9806a9f0-19d5-4b14-aed3-3e75c186ff67)








## 🖥️ 프로젝트 소개

이 프로젝트는 Next.js의 최신 인증 라이브러리인 [**Auth.js**](https://authjs.dev) (구 NextAuth.js)를 활용하여 로그인 및 세션 관리를 구현한 연습 목적의 프로젝트입니다. Google OAuth와 Passkey를 결합하여 **현대적이고 보안적인 인증 흐름**을 실험하고 연구하는 데 초점을 맞췄습니다.

### 프로젝트 주요 특징

1. **Google OAuth 로그인**: Google 계정을 통해 사용자를 인증합니다.
2. **Passkey 지원**: Google 로그인 후 Passkey를 등록하고 이를 활용하여 로그인할 수 있습니다.
3. **Supabase 데이터베이스**: 인증 데이터를 관리하기 위해 Supabase를 사용했습니다.
4. **서버 사이드 세션 관리**: 서버 렌더링 환경에서 세션 기반의 사용자 정보를 처리하는 데 초점을 맞췄습니다.
5. **Credential 로그인 생략**: 간략한 인증 흐름 구현을 위해 Credential 로그인은 포함되지 않았습니다.

---

## 🚀 주요 기술 스택

### 프론트엔드

- **React 19**
- **Next.js 15** (App Router 기반)
- **Tailwind CSS**: 빠르고 직관적인 UI 스타일링

### 인증 및 데이터 관리

- **Auth.js (NextAuth)**: 인증 라이브러리
- **Prisma**: ORM(객체 관계 매핑) 및 데이터베이스 스키마 관리
- **Supabase**: PostgreSQL 기반 데이터베이스

### 기타

- **Passkey**: FIDO2 기반 WebAuthn 지원
- **SimpleWebAuthn**: Passkey 등록 및 인증 처리
- **Radix UI** 및 **Lucide Icons**: 접근성과 아이콘 지원

---

## 📂 프로젝트 구조

```plaintext
├── /api
│   ├── /auth
│   │   ├── check-passkey.ts  # Passkey 등록 상태 확인 및 삭제 API
│   │   └── [...nextauth].ts # NextAuth.js 라우트 핸들러
├── /components
│   ├── user-info             # 로그인 후 사용자 정보 표시 컴포넌트
│   └── sign-in-prompt        # 로그인 요청 화면
├── /hooks
│   └── usePasskey.ts         # Passkey 상태 및 기능 훅
└── auth.ts                   # NextAuth.js 설정
```

## 🛠️ 설치 및 실행

1. 클론하기

```sh
git clone https://github.com/junsobi/passkey_nextAuth.git
cd passkey_nextAuth
```

2. 환경 변수 설정

.env.local 파일을 생성하고 아래 정보를 추가합니다. (중요: 실제 클라이언트 ID, 비밀번호, 데이터베이스 URL은 직접 입력해야 합니다.)

```plaintext
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

3. 의존성 설치

```sh
npm install
```

4. DB 마이그레이션

```sh
npx prisma db push
```

5. 로컬 서버 실행

```sh
npm run dev
```

## 🧩 주요 기능 코드

1. 서버 컴포넌트에서 세션 관리

```typescript
import { auth } from "@/auth";
import UserInfo from "@/components/user-info/user-info";
import SignInPrompt from "@/components/sign-in-prompt/sign-in-prompt";

export default async function HomePage() {
  const session = await auth();

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {session ? <UserInfo session={session} /> : <SignInPrompt />}
    </main>
  );
}
```

2. Passkey 상태 관리 훅

```typescript
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
```

---

## 💡 학습 포인트

1. **Google OAuth**와 **Passkey** 통합 흐름 이해.
2. **Next.js App Router**와 **서버 사이드 렌더링(SSR)**을 통한 세션 관리.
3. **Supabase**와 **Prisma**를 활용한 데이터베이스 연동.

---

## 📜 라이선스

이 프로젝트는 학습 목적으로 제작되었습니다. 필요 시 자유롭게 수정 및 활용하세요. 😊
