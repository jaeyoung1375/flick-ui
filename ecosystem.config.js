// /web/flick-ui/ecosystem.config.js
// PM2 앱 설정. 처음 한 번은 서버에서 직접 등록:
//   pm2 delete flick-front        (기존에 npm start로 띄운 게 있다면)
//   pm2 start ecosystem.config.js
//   pm2 save
module.exports = {
  apps: [
    {
      name: "flick-ui",
      cwd: "/web/flick-ui",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      exec_mode: "cluster",
      instances: 2,
      max_memory_restart: "800M", // 메모리 폭주 시 자동 재시작 (6GB 서버 보호)
      env: {
        NODE_ENV: "production",
      },
      time: true, // 로그에 시간 표시
    },
  ],
};
