export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3000,
  defaultLimit: +process.env.DEFAULT_LIMIT,
  hostApi: process.env.HOST_API,
  jwtSecret: process.env.JWT_SECRET,
  mailHost: process.env.MAIL_HOST,
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  mailFrom: process.env.MAIL_FROM,
  mailTransport: process.env.MAIL_TRANSPORT,
  mailPort: process.env.MAIL_PORT || 465,
});
