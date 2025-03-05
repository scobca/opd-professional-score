<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Подтверждение регистрации</title>
  <style>
      /* Встроенные стили для совместимости */
      body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
      }
      .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border: 1px solid #dddddd;
      }
      .header {
          text-align: center;
          padding: 10px 0;
      }
      .content {
          padding: 20px;
          text-align: center;
      }
      .verification-code {
          display: inline-block;
          padding: 15px 25px;
          margin: 20px 0;
          background-color: #f0f0f0;
          color: #333333;
          font-size: 24px;
          font-weight: bold;
          border-radius: 5px;
          border: 1px solid #dddddd;
      }
      .footer {
          text-align: center;
          padding: 10px;
          font-size: 12px;
          color: #777777;
      }
  </style>
</head>
<body>
<table class="email-container" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td class="header">
      <h1>Подтверждение регистрации</h1>
    </td>
  </tr>
  <tr>
    <td class="content">
      <p>Здравствуйте, [Имя пользователя]!</p>
      <p>Спасибо за регистрацию на нашем сайте. Для завершения регистрации введите следующий код верификации:</p>
      <div class="verification-code">[Код верификации]</div>
      <p>Если вы не регистрировались на нашем сайте, просто проигнорируйте это письмо.</p>
    </td>
  </tr>
  <tr>
    <td class="footer">
      <p>С уважением,<br>Команда Opd Professional Score</p>
      <p>Если у вас возникли вопросы, свяжитесь с нами: <a href="mailto:support@yourwebsite.com">support@yourwebsite.com</a></p>
    </td>
  </tr>
</table>
</body>
</html>