# 배포 런북 상세 (flick-ui Deploy Runbook)

실측: `.github/workflows/deploy.yml` (2026-09-16 기준)

## 1. 로컬 실행

```bash
npm install
npm run dev     # 포트 3000, .env.development 로드
```

사전 조건: 백엔드(`flick-server`)가 `NEXT_PUBLIC_API_BASE_URL`(현재 `.env.development` 값은 `http://localhost:9999` — `flick-server`의 로컬 실행 포트 9090과 다르다, [`12_known_issues`](../12_known_issues/flick-ui-known-issues.md) 참고)에서 기동 중이어야 API 호출이 성공한다.

## 2. 빌드

```bash
npm run build    # .next 생성, .env.production 값이 NEXT_PUBLIC_* 변수에 내장됨
npm run start    # 프로덕션 서버 로컬 실행(포트 3000)
npm run lint
```

> ⚠️ `app/admin/exercises/page.tsx`가 삭제된 모듈을 import하고 있어([`12_known_issues`](../12_known_issues/flick-ui-known-issues.md) 1번) `npm run build`가 현재 실패할 수 있다. 빌드 전 이 파일을 먼저 확인할 것.

## 3. CI/CD 파이프라인 (`.github/workflows/deploy.yml`, 이름: "Front Deploy")

* **트리거:** `workflow_dispatch` (수동 실행만 — push/PR 자동 트리거 없음)
* **동시성:** `concurrency: deploy-front` — 동시에 여러 배포 실행 시 이전 실행을 취소(`cancel-in-progress: true`)
* **러너:** `ubuntu-latest` (GitHub 호스팅, `flick-server`의 self-hosted와 다름)
* **단계:**
  1. `actions/checkout@v3`
  2. `actions/setup-node@v3` (Node 20, npm 캐시)
  3. `npm ci`
  4. `npm run build` — `env: NEXT_PUBLIC_API_URL: http://146.56.116.158:9090` 설정 ⚠️ **이 변수명은 코드에서 쓰이지 않는다**(`util/AxiosUtil.ts`는 `NEXT_PUBLIC_API_BASE_URL`을 읽음) — 실제 값은 `.env.production`에서 온다. [`12_known_issues`](../12_known_issues/flick-ui-known-issues.md) 10번 참고
  5. `.next public node_modules package.json`을 `deploy.tar.gz`로 압축
  6. SSH 디버그 연결 확인(`appleboy/ssh-action`, `echo "connected"`만 실행)
  7. `appleboy/scp-action`으로 `deploy.tar.gz`를 `SERVER_PATH`로 전송
  8. SSH로 서버 접속 후: 압축 해제 → 기존 `pm2` 프로세스(`next-app`) 삭제 → `pm2 start npm --name next-app -- start`로 재기동

## 4. 배포 환경

* 대상 서버는 Node.js(nvm 경유) + **pm2**로 프로세스를 관리한다(`flick-server`가 systemd를 쓰는 것과 다른 방식).
* `node_modules` 전체를 tar로 옮겨 서버에서 재설치하지 않는다(`npm ci`를 서버에서 다시 실행하지 않음) — 빌드 시점 Node 버전(20)과 서버의 Node 버전이 다르면 네이티브 모듈 문제가 생길 수 있다(확인 안 됨, 실제로 문제가 생기면 서버 Node 버전을 먼저 확인).
* 필요한 GitHub Secrets: `SERVER_HOST`, `SERVER_USER`, `SERVER_SSH_KEY`, `SERVER_PATH`.

## 5. 롤백

이 저장소·워크플로우에 자동 롤백 절차가 없다. 이전 커밋으로 workflow를 재실행(재빌드+재배포)하는 수동 방식만 가능하다. 서버에 이전 빌드 산출물을 별도 보관하는지도 이 저장소만으로는 확인 불가.

## 6. 배포 전 체크

- [ ] `app/admin/exercises/page.tsx`의 삭제된 모듈 import를 정리했는가(그대로면 빌드 실패, [`12_known_issues`](../12_known_issues/flick-ui-known-issues.md) 1번)
- [ ] `.env.production`의 `NEXT_PUBLIC_API_BASE_URL`이 실제 배포 대상 백엔드 주소와 일치하는지 확인 (workflow의 `NEXT_PUBLIC_API_URL` 값이 아니라 이 파일 값이 실제로 반영됨)
- [ ] `.env.production`의 OAuth URL 경로 패턴(`/oauth/{provider}`)이 백엔드와 실제로 맞는지 확인([`12_known_issues`](../12_known_issues/flick-ui-known-issues.md) 9번)
- [ ] `NEXT_PUBLIC_*`로 새 환경변수를 추가했다면 `.env.production`에도 값이 채워져 있는지 확인 (workflow의 `env:` 블록만으로는 반영되지 않음)
- [ ] 서버의 `pm2 list`에서 `next-app` 프로세스가 배포 후 정상 기동했는지 확인
